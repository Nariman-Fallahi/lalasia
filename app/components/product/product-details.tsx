import type { User } from "@supabase/supabase-js";
import { CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useOutletContext } from "react-router";
import type { CartItemWithProduct, Color, Product } from "~/types";
import { createClient } from "~/utils/supabase/client";
import * as CartUtils from "~/utils/cart-utils";

interface ProductDetailsProps {
  product: Product;
  colors: Color[];
}

export default function ProductDetails({
  product,
  colors,
}: ProductDetailsProps) {
  const { isLogin, user } = useOutletContext<{
    isLogin: boolean;
    user: User;
  }>();
  const [selectedIdColor, setSelectedIdColor] = useState<number>(colors[0]?.id);
  const [isReadMore, setIsReadMore] = useState<boolean>(false);
  const [shouldShowButton, setShouldShowButton] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);

  const textRef = useRef<HTMLParagraphElement>(null);
  const supabase = createClient();

  useEffect(() => {
    if (!isLogin) {
      setCartItems(CartUtils.getLocalCart());
    }
  }, [isLogin]);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const fullHeight = element.scrollHeight;
      const lineHeight = parseFloat(
        getComputedStyle(element).lineHeight || "20",
      );
      if (fullHeight / lineHeight > 4) {
        setShouldShowButton(true);
      }
    }
  }, []);

  const isInCart = cartItems.some(
    (item) =>
      item.product_id === product.id &&
      item.color_id === selectedIdColor,
  );

  const handleCartAction = async () => {
    let updatedCart: CartItemWithProduct[];

    if (isInCart) {
      updatedCart = CartUtils.calculateRemovedItem(
        cartItems,
        product.id,
        selectedIdColor,
      );

      if (isLogin) {
        await supabase.from("cart_items").delete().match({
          user_id: user.id,
          product_id: product.id,
          color_id: selectedIdColor,
        });
      }
    } else {
      const selectedColorData = colors.find((c) => c.id === selectedIdColor);
      const newItem: CartItemWithProduct = {
        id: Math.floor(Math.random() * 1000000),
        created_at: new Date().toISOString(),
        user_id: user?.id || "",
        product_id: product.id,
        color_id: selectedIdColor || 0,
        quantity: 1,
        product: product,
        color: {
          id: selectedIdColor || 0,
          hex: selectedColorData?.hex || "",
        },
      };
      updatedCart = [...cartItems, newItem];

      if (isLogin) {
        const addToDb = async () => {
          const { error } = await supabase.from("cart_items").insert([
            {
              user_id: user.id,
              product_id: product.id,
              quantity: 1,
              color_id: selectedIdColor,
            },
          ]);
          if (error) throw error;
        };

        toast.promise(addToDb(), {
          loading: "Adding to cart...",
          success: "Item added!",
          error: "Failed to add item.",
        });
      }
    }

    setCartItems(updatedCart);
    if (!isLogin) CartUtils.setLocalCart(updatedCart);
  };

  return (
    <div className="w-full flex flex-col mt-6 gap-3 md:flex-row md:gap-6 lg:gap-10">
      <img
        src={product.image}
        alt={product.title}
        className="h-80 object-contain md:h-100 md:object-cover md:object-center rounded lg:w-[40%]"
      />
      <div className="flex flex-col gap-3">
        <h1 className="text-2xl mt-6 md:mt-0 lg:text-[44px]">
          {product.title}
        </h1>
        <h2 className="text-sm text-paragraphColor font-medium lg:text-lg">
          {product.short_description}
        </h2>

        <b className="mt-2 lg:text-lg">Color</b>
        <div className="flex gap-2">
          {colors.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedIdColor(item.id)}
              className={`size-8 lg:size-12.5 cursor-pointer flex justify-center items-center rounded-full border-2 ${
                selectedIdColor === item.id
                  ? "border-main"
                  : "border-transparent"
              }`}
              style={{ backgroundColor: item.hex }}
            >
              {selectedIdColor === item.id && (
                <CheckCheck className="text-white mix-blend-difference size-4 lg:size-6" />
              )}
            </div>
          ))}
        </div>

        <p
          ref={textRef}
          className={`text-sm font-medium text-paragraphColor mt-2 lg:text-lg ${
            !isReadMore && "line-clamp-4"
          }`}
        >
          {product.long_description}
        </p>
        {shouldShowButton && (
          <button
            onClick={() => setIsReadMore((prev) => !prev)}
            className="text-sm font-medium text-main w-fit cursor-pointer lg:text-base"
          >
            {isReadMore ? "Show less" : "Read More"}
          </button>
        )}

        <b className="text-2xl mt-3 lg:text-[44px]">${product.price}</b>

        <div className="w-full flex flex-col items-center gap-3 mt-3 text-[15px] font-bold lg:flex-row lg:text-lg lg:mt-6">
          <button className="w-full text-white bg-main rounded p-2 cursor-pointer hover:bg-[#406d6b] transition-all duration-300">
            Buy Now
          </button>
          <button
            onClick={handleCartAction}
            className={`w-full rounded p-2 cursor-pointer transition-all duration-300 ${
              isInCart
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "bg-lineColor text-black hover:bg-[#e0e0e0]"
            }`}
          >
            {isInCart ? "Remove from Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
