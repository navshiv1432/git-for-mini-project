import React from 'react'

const CartContext = React.createContext({
  cartItems: [],
  isOrderPlaced: false,
  placeOrder: () => {},
  addCartItems: () => {},
  getQuantity: () => {},
  removeCartItem: () => {},
  increaseQuantity: () => {},
  decreaseQuantity: () => {},
})

export default CartContext
