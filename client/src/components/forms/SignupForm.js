import React, {useState} from "react"
import {Link} from "react-router-dom"
import FormMessage from "./FormMessage"
import isEmail from "validator/lib/isEmail"
import setFormObj from './FormUtils';

const initialData = {
  email: "",
  password: "",
  passwordConfirmation: "",
}

const SignupForm = props => {

  const [form, setForm] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = data => {
    const errors = {}
    if (!data.email) errors.email = "Email cannot be blank"
    if (!data.password) errors.password = "Password cannot be blank"
    if (!data.passwordConfirmation)
      errors.passwordConfirmation = "Password confirmation cannot be blank"
    if (!isEmail(data.email)) errors.email = "Wrong format email"

    return errors
  }

  const handleSubmit = e => {
    e.preventDefault()
    const errors = validate(form)
    setErrors(errors)
    if (Object.keys(errors).length === 0) {
      setLoading(true)
      props
        .submit(form)
        .catch(error => {
          setErrors(error.response.data.errors)
          setLoading(false)
        }
        )
    }
  }

    const cls = loading ? "ui form loading" : "ui form"

    return (
      <form className={cls} onSubmit={handleSubmit}>
        <div className={errors.email ? "error field" : "field"}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={form.email}
            onChange={setFormObj(form, setForm)}
          />
          <FormMessage>{errors.email}</FormMessage>
        </div>

        <div className={errors.password ? "error field" : "field"}>
          <label>Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="password"
            value={form.password}
            onChange={setFormObj(form, setForm)}
          />
          <FormMessage>{errors.password}</FormMessage>
        </div>

        <div className={errors.passwordConfirmation ? "error field" : "field"}>
          <label>Password Confirmation</label>
          <input
            type="text"
            name="passwordConfirmation"
            id="passwordConfirmation"
            placeholder="password confirmation"
            value={form.passwordConfirmation}
            onChange={setFormObj(form, setForm)}
          />
          <FormMessage>{errors.passwordConfirmation}</FormMessage>
        </div>

        <div className="ui fluid buttons">
          <button className="ui button primary">Sing Up</button>

          <div className="or" />

          <Link to="/" className="ui button">
            Cancel
          </Link>
        </div>
      </form>
    )
  }

export default SignupForm
