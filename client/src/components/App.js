import React, {Component} from "react"
import TopNavigation from "./TopNavigation"
import {Route} from "react-router-dom"
import HomePage from "./HomePage"
import {FilmsPage} from "./FilmsPage"
import Film from "./films/Film"

export class App extends Component {
  render() {
    return (
      <div className="ui container pt-3">
        <TopNavigation />
        <Route exact path="/">
          <HomePage/>
        </Route>
        <Route path="/films" component={FilmsPage} />
        <Route path="/film/:_id" exact component={Film} />
      </div>
    )
  }
}

export default App
