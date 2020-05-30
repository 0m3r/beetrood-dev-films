import React, {useEffect, useState} from "react"
import ReactImageFallback from "react-image-fallback"
import FormMessage from "./FormMessage"
import {Link} from "react-router-dom";
import setFormObj from "./FormUtils";

const initData = {
  _id: null,
  title: "",
  img: "",
  director: "",
  description: "",
  duration: "",
  price: "",
  featured: false,
}

const FilmForm = (props) => {

  const [data, setData] = useState(initData)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (props.film._id && data._id !== props.film._id) {
      setData(props.film)
    } else {
      setData(initData)
    }
  }, [props.film])

  const validate = data => {
    const errors = {}
    if (!data.title) errors.title = "title cannot be blank"
    if (!data.description) errors.description = "Description cannot be blank"
    if (!data.director) errors.director = "Director cannot be blank"
    if (!data.img) errors.img = "Image cannot be blank"
    if (!data.duration) errors.duration = "Duration cannot be blank"
    if (!data.price) errors.price = "Price cannot be blank"

    if (parseInt(data.duration) < 1) {
      errors.duration = "Duration cannot be negative value"
    }

    if (parseFloat(data.price) <= 0) {
      errors.price = "Price cannot be negative value"
    }
    return errors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errors = validate(data)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      setLoading(true)
      props.submit(data).catch(err => {
        setErrors(err.response.data.errors)
        setLoading(false)
        // return true
      })
    }
  }

  const classForm = loading ? "ui form loading" : "ui form";

  return (
    <form onSubmit={handleSubmit} className={classForm}>

      {/* ui grid START */}
      <div className="ui  grid">
        <div className="twelve wide column">
          {/* Title START  */}
          <div className={errors.title ? "field error" : "field"}>
            <label>Film title</label>
            <input
              value={data.title}
              onChange={setFormObj(data, setData)}
              type="text"
              name="title"
              id="name"
              placeholder="film title"
            />
            <FormMessage>{errors.title}</FormMessage>
          </div>
          {/* Title END  */}

          {/* Description START  */}
          <div className={errors.description ? "field error" : "field"}>
            <label>Film description</label>
            <textarea
              value={data.description}
              onChange={setFormObj(data, setData)}
              name="description"
              id="description"
              placeholder="film description"
            ></textarea>
            <FormMessage>{errors.description}</FormMessage>
          </div>
          {/* Description END  */}
        </div>

        {/* Image START
          "http://via.placeholder.com/250x250"
          */}
        <div className="four wide column">
          <ReactImageFallback
            src={data.img}
            fallbackImage="http://via.placeholder.com/250x250"
            alt={data.title}
            className="ui image"
          />
        </div>

        <div className="twelve wide column">
          <div className={errors.img ? "field error" : "field"}>
            <label>Image</label>
            <input
              value={data.img}
              onChange={setFormObj(data, setData)}
              type="text"
              name="img"
              id="img"
              placeholder="img"
            />
            <FormMessage>{errors.img}</FormMessage>
          </div>
        </div>
        {/* Image END   */}

        {/* Director START  */}
        <div className="six wide column">
          <div className={errors.director ? "field error" : "field"}>
            <label>Director</label>
            <input
              value={data.director}
              onChange={setFormObj(data, setData)}
              type="text"
              name="director"
              id="director"
              placeholder="film director"
            />
            <FormMessage>{errors.director}</FormMessage>
          </div>
        </div>
        {/* Director END   */}

        {/* Duration START  */}
        <div className="six wide column">
          <div className={errors.duration ? "field error" : "field"}>
            <label>Duration</label>
            <input
              value={data.duration}
              onChange={setFormObj(data, setData)}
              type="number"
              name="duration"
              id="duration"
              placeholder="Duration"
              min={0}
            />
            <FormMessage>{errors.duration}</FormMessage>
          </div>
        </div>
        {/*  Duration END   */}

        {/* Price START  */}
        <div className="six wide column">
          <div className={errors.price ? "field error" : "field"}>
            <label>Price</label>
            <input
              value={data.price}
              onChange={setFormObj(data, setData)}
              type="number"
              name="price"
              id="price"
              placeholder="price"
            />
            <FormMessage>{errors.price}</FormMessage>
          </div>
        </div>
        {/*  Price END   */}

        {/* Featured START  */}
        <div className="six wide column inline field">
          <label htmlFor="featured">Featured</label>
          <input
            onChange={setFormObj(data, setData)}
            value={data.featured}
            type="checkbox"
            name="featured"
            id="featured"
            checked={data.featured}
          />
        </div>
        {/*  Featured END   */}
      </div>
      {/* ui grid END */}

      {/*  Buttons START */}

      <div className="ui fluid buttons px-3">
        <button className="ui button primary" type="submit">
          Save
        </button>

        <div className="or"></div>

        <Link to="/films" className="ui button">
          Hide form
        </Link>
      </div>
      {/*  Buttons END */}
    </form>
  )
}

export default FilmForm