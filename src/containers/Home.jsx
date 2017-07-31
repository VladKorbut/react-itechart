import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class Home extends Component {
  componentWillMount(){
    if(!this.props.isLoggedIn){
      browserHistory.push('/login');
    }
  }
  render () {
    return (
      <div>
        <h1>HOME</h1>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.loginReducer
  }
}

export default connect(mapStateToProps, null)(Home)