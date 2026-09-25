import type {CartItemWithProduct} from "~/types";

export const GUEST_CART_KEY = "guest_cart";

export const getLocalCart = (): CartItemWithProduct[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(GUEST_CART_KEY);
    try {
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
};

export const setLocalCart = (cart: CartItemWithProduct[]) => {
    localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart));
};

export const calculateUpdatedQuantity = (
    cart: CartItemWithProduct[],
    productId: number,
    colorId: number,
    newQty: number,
) => {
    if (newQty < 1) return cart;
    return cart.map((item) =>
        Number(item.product_id) === productId && item.color_id === colorId
            ? {...item, quantity: newQty}
            : item,
    );
};

export const calculateRemovedItem = (
    cart: CartItemWithProduct[],
    productId: number,
    colorId: number,
) => {
    return cart.filter(
        (item) =>
            !(Number(item.product_id) === productId && item.color_id === colorId),
    );
};

export const getCartTotals = (cart: CartItemWithProduct[]) => {
    const subTotal = cart.reduce(
        (total, item) => total + parseFloat(item.product.price) * item.quantity,
        0,
    );
    const shipping = cart.length > 0 ? 20 : 0;
    return {subTotal, shipping, total: subTotal + shipping};
};