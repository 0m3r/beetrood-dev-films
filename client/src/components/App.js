import React, {Component} from "react";
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

export class App extends Component {

  state = {
    user: {
      token: undefined
    },
    message: ''
  }

  setMessage = (message) => this.setState({message: message})

  componentDidMount() {
    if (localStorage.filmsToken) {
      this.setState({

        user: {
          token: localStorage.filmsToken,
          role: jwtDecode(localStorage.filmsToken).user.role
        }
      })
      setAuthorizationHeader(localStorage.filmsToken)
    }
  }

  logout = () => {
    this.setState({user:{ token: null}})
    setAuthorizationHeader()
    delete localStorage.filmsToken
    this.setMessage('Bye bye')
  }

  login = (token) => {
    console.log(jwtDecode(token));
    this.setState({user:{
      token: token,
      role: jwtDecode(token).user.role
    }})
    localStorage.filmsToken = token
    setAuthorizationHeader(token)
    this.setMessage('You are welcome')
  }

  signup = () => {
    this.setMessage('Congratulations on our team')
  }

  render() {
    return (
      <div className="ui container pt-3">
        <FlashMessage>{this.state.message}</FlashMessage>
        <TopNavigation logout={this.logout} isAuth={this.state.user.token} isAdmin={this.state.user.role === 'admin'} />
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/films"  render={
          props => (<FilmsPage {...props} user={this.state.user}/>)
        }/>
        <Route path="/film/:_id" exact component={Film} />
        <Route path="/signup" exact render={
            props => <SignupPage {...props} signup={this.signup} />
        }/>
        <Route path="/login" exact render={
            props => <LoginPage {...props} login={this.login} />
        } />
      </div>
    )
  }
}

export default App
