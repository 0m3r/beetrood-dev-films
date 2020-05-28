import React, {Component} from "react"
import TopNavigation from "./TopNavigation"
import {Route} from "react-router-dom"
// import HomePage from "./HomePage"
// import {FilmsPage} from "./FilmsPage"
// import SignupPage from "./SignupPage"
import Film from "./films/Film"
import {Async, lazyImport} from "./async"
import {setAuthorizationHeader} from "../utils"

const HomePage = Async(lazyImport("./HomePage"))
const FilmsPage = Async(lazyImport("./FilmsPage"))
const SignupPage = Async(lazyImport("./SignupPage"))
const LoginPage = Async(lazyImport("./LoginPage"))

export class App extends Component {

  state = {
    user: {
      token: undefined
    }
  }

  componentDidMount() {
    if (localStorage.filmsToken) {
      this.setState({user: {token: localStorage.filmsToken}})
      setAuthorizationHeader(localStorage.filmsToken)
    }
  }

  logout = () => {
    this.setState({user:{ token: null}})
    setAuthorizationHeader()
    delete localStorage.filmsToken
  }

  login = (token) => {
    this.setState({user:{ token: token}})
    localStorage.filmsToken = token
    setAuthorizationHeader(token)
  }

  render() {
    return (
      <div className="ui container pt-3">
        <TopNavigation logout={this.logout} isAuth={this.state.user.token}/>
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/films" component={FilmsPage} />
        <Route path="/film/:_id" exact component={Film} />
        <Route path="/signup" exact component={SignupPage} />
        <Route path="/login" exact render={
            props => <LoginPage {...props} login={this.login} />
        } />
      </div>
    )
  }
}

export default App
