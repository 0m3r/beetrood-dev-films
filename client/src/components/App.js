import React, {Component, useState, useEffect} from "react";
import TopNavigation from "./TopNavigation";
import {Route} from "react-router-dom";
import jwtDecode from "jwt-decode";


// import HomePage from "./HomePage"
// import {FilmsPage} from "./FilmsPage"
// import SignupPage from "./SignupPage"
import Film from "./films/Film";
import {Async, lazyImport} from "./async";
import {setAuthorizationHeader} from "../utils";
import FlashMessage from "./FlashMessage"


const HomePage = Async(lazyImport("./HomePage"))
const FilmsPage = Async(lazyImport("./FilmsPage"))
const SignupPage = Async(lazyImport("./SignupPage"))
const LoginPage = Async(lazyImport("./LoginPage"))

const initialUser = {
  token: undefined,
  role: 'user'
}
const App = props => {

  const [user, setUser] = useState(initialUser);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (localStorage.filmsToken) {
      setUser({
          token: localStorage.filmsToken,
          role: jwtDecode(localStorage.filmsToken).user.role
      })
      setAuthorizationHeader(localStorage.filmsToken)
    }
  }, [])

  const logout = () => {
    setUser({token: null})
    setAuthorizationHeader()
    delete localStorage.filmsToken
    setMessage('Bye bye')
  }

  const login = (token) => {
    console.log(jwtDecode(token));
    setUser({
      token: token,
      role: jwtDecode(token).user.role
    })
    localStorage.filmsToken = token
    setAuthorizationHeader(token)
    setMessage('You are welcome')
  }

  const signup = () => {
    setMessage('Congratulations on our team')
  }

    return (
      <div className="ui container pt-3">
        <FlashMessage>{message}</FlashMessage>
        <TopNavigation logout={logout} isAuth={user.token} isAdmin={user.role === 'admin'} />
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/films"  render={
          props => (<FilmsPage {...props} user={user}/>)
        }/>
        <Route path="/film/:_id" exact component={Film} />
        <Route path="/signup" exact render={
            props => <SignupPage {...props} signup={signup} />
        }/>
        <Route path="/login" exact render={
            props => <LoginPage {...props} login={login} />
        } />
      </div>
    )
  }

export default App
