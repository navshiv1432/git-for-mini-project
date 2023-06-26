import {BiRupee} from 'react-icons/bi'

import CartContext from '../../Context/CartContext'

import './index.css'

const CartItem = props => {
  const {data} = props

  const {id, name, imageUrl, quantity, cost} = data

  const renderCartItem = value => {
    const {increaseQuantity, decreaseQuantity, removeCartItem} = value

    const onIncrement = () => {
      increaseQuantity(id)
    }

    const onDecrement = () => {
      const newQuantity = quantity - 1

      if (newQuantity === 0) {
        removeCartItem(id)
      } else {
        decreaseQuantity(id)
      }
    }

    return (
      <li className="cart-item-li" testid="cartItem">
        <div className="item-details-cont">
          <img src={imageUrl} className="item-img3" alt={name} />

          <h1 className="item-name">{name}</h1>
        </div>

        <div className="item-quantity-cost-cont">
          <button
            className="counter-btn"
            type="button"
            onClick={onDecrement}
            testid="decrement-quantity"
          >
            -
          </button>

          <p className="quantity" testid="item-quantity">
            {quantity}
          </p>

          <button
            className="counter-btn"
            type="button"
            onClick={onIncrement}
            testid="increment-quantity"
          >
            +
          </button>
        </div>

        <div className="item-quantity-cost-cont">
          <BiRupee className="rupee-icon" />

          <p className="item-cost" alt="total-price">
            {cost * quantity}.00
          </p>
        </div>
      </li>
    )
  }

  return (
    <CartContext.Consumer>
      {value => renderCartItem(value)}
    </CartContext.Consumer>
  )
}

export default CartItem
