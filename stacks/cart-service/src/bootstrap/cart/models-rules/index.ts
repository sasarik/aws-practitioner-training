import { Cart, CartItem } from "../models";

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Cart): number {
  return cart
    ? cart.items.reduce((acc: number, { product: { price }, count }: CartItem) => {
        return price * count + acc;
      }, 0)
    : 0;
}
