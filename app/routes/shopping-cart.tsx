import type { Route } from "./+types/shopping-cart";
import PageTitle from "~/ui/page-title";
import { EmptyCart } from "~/components/shopping-cart/empty-cart";
import { CartItemRow } from "~/components/shopping-cart/cart-item-row";
import { OrderSummary } from "~/components/shopping-cart/order-summary";
import { createClient as createServerClient } from "~/utils/supabase/server";
import { createClient as createBrowserClient } from "~/utils/supabase/client";
import type { PostgrestError } from "@supabase/supabase-js";
import type { CartItemWithProduct } from "~/types";
import { useEffect, useState } from "react";
import * as CartUtils from "~/utils/cart-utils";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Shopping Cart" },
    { name: "description", content: "Lalasia Shopping Cart Page" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const { supabase } = createServerClient(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { cartItems: [], isLogin: false };
  }

  const {
    data,
    error,
  }: { data: CartItemWithProduct[] | null; error: PostgrestError | null } =
    await supabase
      .from("cart_items")
      .select(
        `
      *,
      product:products (*),
      color:colors (*)
    `,
      )
      .eq("user_id", user.id);

  if (error || !data) {
    console.error("Error fetching cart:", error);
    return { cartItems: [], isLogin: true };
  }

  return { cartItems: data, isLogin: true, user: user };
}

export default function ShoppingCart({ loaderData }: Route.ComponentProps) {
  const { isLogin, user } = loaderData;
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>(
    loaderData.cartItems || [],
  );

  const supabase = createBrowserClient();

  useEffect(() => {
    const syncCart = async () => {
      const localCart = CartUtils.getLocalCart();
      if (!isLogin) {
        setCartItems(localCart);
      } else if (localCart.length > 0) {
        if (user) {
          const itemsToUpload = localCart.map((item) => ({
            user_id: user.id,
            product_id: parseInt(item.product_id as any),
            quantity: item.quantity,
            color_id: item.color_id,
          }));

          const { error } = await supabase
            .from("cart_items")
            .insert(itemsToUpload);
          if (!error) {
            localStorage.removeItem(CartUtils.GUEST_CART_KEY);
            setCartItems(loaderData.cartItems);
          }
        }
      } else {
        setCartItems(loaderData.cartItems);
      }
    };
    syncCart();
  }, [isLogin, loaderData.cartItems]);

  const { subTotal, shipping, total } = CartUtils.getCartTotals(cartItems);

  const updateQuantity = async (
    productId: number,
    colorId: number,
    newQty: number,
  ) => {
    const updated = CartUtils.calculateUpdatedQuantity(
      cartItems,
      productId,
      colorId,
      newQty,
    );
    setCartItems(updated);

    if (!isLogin) {
      CartUtils.setLocalCart(updated);
    } else {
      await supabase
        .from("cart_items")
        .update({ quantity: newQty })
        .match({ product_id: productId, color_id: colorId });
    }
  };

  const removeItem = async (productId: number, colorId: number) => {
    const updated = CartUtils.calculateRemovedItem(
      cartItems,
      productId,
      colorId,
    );
    setCartItems(updated);

    if (!isLogin) {
      CartUtils.setLocalCart(updated);
    } else {
      await supabase
        .from("cart_items")
        .delete()
        .match({ product_id: productId, color_id: colorId });
    }
  };

  return (
    <div className="w-full px-3 md:px-6 lg:px-8">
      <PageTitle
        title="Shopping Cart"
        description="Review your selected products and proceed to checkout when you're ready."
      />

      {cartItems.length === 0 ? (
        <div className="w-full mt-12 flex flex-col items-center justify-center ">
          <EmptyCart />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 lg:mt-12 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <OrderSummary subTotal={subTotal} shipping={shipping} total={total} />
        </div>
      )}
    </div>
  );
}
