import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Home } from './pages/home'
import { Reviews } from './pages/reviews'
import { Web3 } from './components/web3'

const renderComponent = (Component, routeProps, web3Props) => {
    console.log('web3props', web3Props)
    return (
        <Component {...web3Props}
                   {...routeProps} />
    )
}

const web3IsReady = ({web3, accounts, contract}) => {
  return (web3 && accounts && contract)
}

export default () =>
  <Router>
    <Web3 render={web3Props => {
      if (web3IsReady(web3Props)) {
        return (
          <div>
            <Route exact path='/' render={routeProps => renderComponent(Home, routeProps, web3Props)} />
            <Route path='/reviews/:product' render={routeProps => renderComponent(Reviews, routeProps, web3Props)} />
          </div>
        )
      } else {
        return <p>Loading web3, accounts, and contract.</p>
      }
    }} />
  </Router>
