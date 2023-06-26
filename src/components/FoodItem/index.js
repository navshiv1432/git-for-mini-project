import {AiFillStar} from 'react-icons/ai'

import {BiRupee} from 'react-icons/bi'

import CartContext from '../../Context/CartContext'

import Counter from '../Counter'
import './index.css'

const FoodItem = props => {
  let addCartItems = null

  const {data} = props

  const {id, name, cost, rating, imageUrl} = data

  const onAddButtonClicked = () => {
    addCartItems({id, name, cost, quantity: 1, imageUrl})
  }

  return (
    <CartContext.Consumer>
      {value => {
        addCartItems = value.addCartItems

        const quantity = value.getQuantity(id)

        return (
          <li className="food-item-li" testid="foodItem">
            <img src={imageUrl} className="food-image" alt={name} />

            <div className="food-content-cont">
              <h1 className="food-name">{name}</h1>

              <div className="price-rating-cont">
                <BiRupee className="price-icon" />

                <p className="price">{cost}</p>
              </div>

              <div className="price-rating-cont">
                <AiFillStar className="star-icon" />

                <p className="food-rating">{rating}</p>
              </div>

              {quantity === 0 ? (
                <button
                  className="add-btn"
                  type="button"
                  onClick={onAddButtonClicked}
                >
                  Add
                </button>
              ) : (
                <Counter id={id} quantity={quantity} />
              )}
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FoodItem
