import CartContext from '../../Context/CartContext'

import './index.css'

const Counter = props => {
  let increaseQuantity = null

  let decreaseQuantity = null

  let removeCartItem = null

  const {id, quantity} = props

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
    <CartContext.Consumer>
      {value => {
        increaseQuantity = value.increaseQuantity

        decreaseQuantity = value.decreaseQuantity

        removeCartItem = value.decreaseQuantity

        return (
          <div className="counter-cont">
            <button
              className="counter-btn"
              type="button"
              onClick={onDecrement}
              data-testid="decrement-count"
            >
              -
            </button>

            <p className="quantity" data-testid="active-count">
              {quantity}
            </p>

            <button
              className="counter-btn"
              type="button"
              onClick={onIncrement}
              data-testid="increment-count"
            >
              +
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default Counter
