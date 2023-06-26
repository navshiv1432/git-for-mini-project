import {Component} from 'react'

import {Route, Switch, Redirect} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'

import RestaurantDetails from './components/RestaurantDetails'

import Cart from './components/Cart'

import NotFound from './components/NotFound'

import CartContext from './Context/CartContext'

import './App.css'

const initializeCartItems = () => {
  const cartItems = localStorage.getItem('cartData')

  if (cartItems === null) {
    return []
  }

  return JSON.parse(cartItems)
}

class App extends Component {
  state = {
    isOrderPlaced: false,

    cartItems: initializeCartItems(),
  }

  addCartItems = item => {
    this.setState(
      preState => ({
        isOrderPlaced: false,

        cartItems: [...preState.cartItems, item],
      }),

      this.updateLocalStorage,
    )
  }

  getQuantity = id => {
    const {cartItems} = this.state

    const currentItem = cartItems.find(item => item.id === id)

    return currentItem === undefined ? 0 : currentItem.quantity
  }

  removeCartItem = id => {
    this.setState(
      preState => ({
        cartItems: preState.cartItems.filter(item => item.id !== id),
      }),

      this.updateLocalStorage,
    )
  }

  increaseQuantity = id => {
    this.setState(
      preState => ({
        cartItems: preState.cartItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          }

          return item
        }),
      }),

      this.updateLocalStorage,
    )
  }

  decreaseQuantity = id => {
    this.setState(
      preState => ({
        cartItems: preState.cartItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }

          return item
        }),
      }),

      this.updateLocalStorage,
    )
  }

  placeOrder = () => {
    this.setState(
      {
        cartItems: [],

        isOrderPlaced: true,
      },

      this.updateLocalStorage,
    )
  }

  updateLocalStorage = () => {
    const {cartItems} = this.state

    localStorage.setItem('cartData', JSON.stringify(cartItems))
  }

  render() {
    const {isOrderPlaced, cartItems} = this.state

    const cartContextValue = {
      cartItems,

      isOrderPlaced,

      placeOrder: this.placeOrder,

      addCartItems: this.addCartItems,

      getQuantity: this.getQuantity,

      removeCartItem: this.removeCartItem,

      increaseQuantity: this.increaseQuantity,

      decreaseQuantity: this.decreaseQuantity,
    }

    return (
      <CartContext.Provider value={cartContextValue}>
        <Switch>
          <Route exact path="/login" component={Login} />

          <ProtectedRoute exact path="/" component={Home} />

          <ProtectedRoute exact path="/cart" component={Cart} />

          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />

          <ProtectedRoute exact path="/bad-path" component={NotFound} />

          <Redirect to="/bad-path" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
