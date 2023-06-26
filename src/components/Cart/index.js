import {Link} from 'react-router-dom'
import {FaCheckCircle} from 'react-icons/fa'
import {BiRupee} from 'react-icons/bi'

import CartContext from '../../Context/CartContext'

import Header from '../Header'

import Footer from '../Footer'

import CartItem from '../CartItem'

import './index.css'

const Cart = () => {
  const getTotalPrice = cartItems =>
    cartItems.reduce((total, item) => total + item.quantity * item.cost, 0)

  const renderOrderStatusView = noOrders => (
    <div className="cart-Route">
      <Header />

      <div className="main-cont">
        {noOrders ? (
          <img
            src="https://res.cloudinary.com/dppqkea7f/image/upload/v1625831743/cart-no-order_qivsro.png"
            className="empty-cart-img"
            alt="empty cart"
          />
        ) : (
          <FaCheckCircle className="order-placed-image" alt="" />
        )}

        <h1 className="card-order-heading">
          {noOrders ? 'No Order Yet!' : 'Payment Successful'}
        </h1>

        {noOrders ? (
          <p className="cars-order-description">
            Your cart is empty. Add something from the menu.
          </p>
        ) : (
          <p className="cars-order-description">
            Thank you for ordering <br />
            Your Payment is successfully completed.
          </p>
        )}

        <Link to="/">
          {noOrders ? (
            <button className="order-default-button" type="button">
              Order Now
            </button>
          ) : (
            <button className="order-default-button" type="button">
              Go To Home Page
            </button>
          )}
        </Link>
      </div>
    </div>
  )

  const renderCartItemSectionValue = value => {
    const {cartItems, placeOrder} = value

    return (
      <div className="main-cont-cart">
        <Header />

        <div className="cart-section">
          <ul className="cart-items-cont">
            <li className="cart-items-li">
              <p className="li-cart-item-title w-36">Item</p>

              <p className="li-cart-item-title w-32">Quantity</p>

              <p className="li-cart-item-title1 w-32">Price</p>
            </li>

            {cartItems.map(item => (
              <CartItem key={item.id} data={item} />
            ))}
          </ul>

          <hr className="cart-hr" />

          <div className="cart-summary-cont">
            <h1 className="order-total-text">Order Total:</h1>

            <div className="cart-total-cost-cont">
              <BiRupee className="Rupee-icon" />

              <p className="cart-total-cost" testid="total-price">
                {getTotalPrice(cartItems)}.00
              </p>
            </div>
          </div>

          <div className="cart-place-order-cont">
            <button
              className="cart-default-button"
              type="button"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  const renderCartRoute = value => {
    const {cartItems, isOrderPlaced} = value

    if (isOrderPlaced) {
      return renderOrderStatusView(false)
    }

    if (cartItems.length === 0) {
      return renderOrderStatusView(true)
    }

    return renderCartItemSectionValue(value)
  }

  return (
    <CartContext.Consumer>
      {value => renderCartRoute(value)}
    </CartContext.Consumer>
  )
}

export default Cart
