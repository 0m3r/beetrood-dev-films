import React from "react"
import SignupForm from "./forms/SignupForm"
import api from "./../api"

function SignupPage({history}) {

    const submit = user =>
        api.users.create(user)
            .then(() => history.push('/login'))
  return (
    <div className="ui grid">
      <div className="eight wide column">
        <SignupForm submit={submit}/>
      </div>
    </div>
  )
}

export default SignupPage