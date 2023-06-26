import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'

import './index.css'

const RestaurantItem = props => {
  const {data} = props

  const {id, name, cuisine, imageUrl, userRating} = data
  const {ratingColor, rating, totalReviews} = userRating

  return (
    <Link to={`/restaurant/${id}`} testid="restaurant-item">
      <li className="rest-list5">
        <img src={imageUrl} alt="restaurant" className="rest-img1" />
        <div className="det-cont1">
          <h1 className="name1">{name}</h1>
          <p className="cuisine1">{cuisine}</p>
          <div className="rat-cont1">
            <FaStar size="13px" color={ratingColor} className="star12" />
            <p className="rat1"> {rating}</p>
            <h1 className="rev1">({`${totalReviews} ratings`})</h1>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantItem
