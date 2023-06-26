import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
// import ReactPaginate from 'react-paginate'
import Slider from 'react-slick'
import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import Header from '../Header'
import RestaurantItem from '../RestaurantItem'

// import Counter from '../Counter/index'
import Footer from '../Footer'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const limit = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    carouselApiStatus: carouselApiStatusConstants.initial,
    restaurantApiStatus: restaurantsApiStatusConstants.initial,
    carouselData: [],
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    allRestaurants: [],
    searchInput: '',
    totalPages: 4,
    // loadFooter: false,
  }

  // component did Mount method

  componentDidMount() {
    this.getCarouselData()
    this.getAllRestaurantsData()
  }

  // convert snake case to camel case

  convertRestaurantObjects = object => {
    const converted = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      groupByTime: object.group_by_time,
      hasOnlineDelivery: object.has_online_delivery,
      hasTableBooking: object.has_table_booking,
      id: object.id,
      imageUrl: object.image_url,
      isDeliveringNow: object.is_delivering_now,
      location: object.location,
      menuType: object.menu_type,
      name: object.name,
      opensAt: object.opens_at,
      userRating: {
        rating: object.user_rating.rating,
        ratingColor: object.user_rating.rating_color,
        ratingText: object.user_rating.rating_text,
        totalReviews: object.user_rating.total_reviews,
      },
    }
    return converted
  }

  // making api call to get carousel data

  getCarouselData = async () => {
    this.setState({carouselApiStatus: carouselApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    // console.log(jwtToken)
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      this.setState({
        carouselApiStatus: carouselApiStatusConstants.success,
        carouselData: data.offers,
      })
    }
  }

  // fetch the active page using prop function

  /* getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  } */

  // making api call to get all restaurants data

  getAllRestaurantsData = async () => {
    this.setState({
      restaurantApiStatus: restaurantsApiStatusConstants.inProgress,
    })
    const {selectedSortByValue, activePage, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    // console.log(offset)

    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsApiUrl, options)
    // console.log(response.status)

    if (response.ok === true) {
      const data = await response.json()
      // console.log(response)
      const {restaurants} = data
      // console.log(restaurants)
      const convertedRestaurants = restaurants.map(each =>
        this.convertRestaurantObjects(each),
      )
      // console.log(convertedRestaurants)
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.success,
        allRestaurants: convertedRestaurants,
      })
    } else if (response.ok === false) {
      this.setState({
        restaurantApiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  // displaying carousel images using react slick

  displayCarouselImages = () => {
    const {carouselData} = this.state
    //  console.log(carouselData)

    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="cur">
        <Slider {...settings}>
          {carouselData.map(each => (
            <img src={each.image_url} alt="offer" key="carousel-image" />
          ))}
        </Slider>
      </div>
    )
  }

  // carousel loader

  carouselDisplayLoading = () => (
    <div testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // restaurants loader

  restaurantsDisplayLoading = () => (
    <div testid="restaurants-list-loader" className="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // onchange event function for change the sort value in the state

  changeTheSortByOptionValue = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getAllRestaurantsData,
    )
  }

  // on search restaurant results

  onSearchRestaurant = event => {
    this.setState({searchInput: event.target.value}, this.getAllRestaurantsData)
  }

  // rendering the popular restaurant and sort options in html

  popularRestaurantsView = () => {
    const {selectedSortByValue} = this.state
    // console.log(selectedSortValue)
    return (
      <>
        <div className="popular-cont">
          <div className="cont1">
            <h1 className="head">Popular Restaurants</h1>
            <p className="para1">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="input-cont">
            <label htmlFor="searchInput" className="search-head">
              Search The Restaurant
            </label>
            <input
              type="search"
              id="searchInput"
              onChange={this.onSearchRestaurant}
              placeholder="Search Restaurant Here.."
            />
          </div>

          <div className="sort-cont">
            <BsFilterLeft className="filter-icon" />
            <p className="sort-des">Sort By</p>
            <select
              id="sortBy"
              onChange={this.changeTheSortByOptionValue}
              value={selectedSortByValue}
              className="opt"
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id} className="opt1">
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="line1" />
      </>
    )
  }

  // rendering the all restaurants in html view

  renderRestaurantsView = () => {
    const {allRestaurants, showNoRes} = this.state
    // console.log(allRestaurants)
    return (
      <>
        {showNoRes ? (
          <p>No Restaurants Found</p>
        ) : (
          <ul className="rest-cont4">
            {allRestaurants.map(each => (
              <RestaurantItem key={each.id} data={each} />
            ))}
          </ul>
        )}
      </>
    )
  }

  // render on search no restaurants view

  noRestaurantsView = () => (
    <div>
      <p className="not-found">No Restaurants Found!</p>
    </div>
  )

  // rendering the loader and carousel html elements using switch condition based on api status

  onRenderDisplayCarousel = () => {
    const {carouselApiStatus} = this.state

    switch (carouselApiStatus) {
      case carouselApiStatusConstants.success:
        return this.displayCarouselImages()

      case carouselApiStatusConstants.inProgress:
        return this.carouselDisplayLoading()

      default:
        return null
    }
  }

  // rendering the loader and restaurants html elements using switch condition based on api status

  onRenderDisplayRestaurants = () => {
    const {restaurantApiStatus} = this.state

    switch (restaurantApiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.renderRestaurantsView()
      case restaurantsApiStatusConstants.inProgress:
        return this.restaurantsDisplayLoading()
      case restaurantsApiStatusConstants.failure:
        return this.noRestaurantsView()
      default:
        return null
    }
  }

  onDecrementIt = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getAllRestaurantsData,
      )
    }
  }

  onIncrementIt = () => {
    const {activePage} = this.state
    if (activePage < 4) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getAllRestaurantsData,
      )
    }
  }

  // rendering the home route in  render method

  render() {
    const {activePage, totalPages} = this.state
    return (
      <>
        <div className="main-cont">
          <Header />
          <div className="carousel-cont">
            {this.onRenderDisplayCarousel()}
            <div testid="active-page-number" className="dis-cont">
              {this.popularRestaurantsView()}

              {this.onRenderDisplayRestaurants()}
            </div>
            <div className="pagination-cont">
              <button
                type="button"
                className="dec-btn"
                onClick={this.onDecrementIt}
                testid="pagination-left-button"
              >
                <RiArrowDropLeftLine size={20} />
              </button>

              <p testid="active-page-number" className="page-num">
                <p>{activePage}</p>

                <span
                  className="page-num"
                  style={{marginLeft: '5px', marginRight: '5px'}}
                >
                  of
                </span>
                <p className="page-num">{totalPages}</p>
              </p>

              <button
                type="button"
                className="inc-btn"
                onClick={this.onIncrementIt}
                testid="pagination-right-button"
              >
                <RiArrowDropRightLine size={20} />
              </button>
            </div>
          </div>

          <Footer />
        </div>
      </>
    )
  }
}

export default Home
