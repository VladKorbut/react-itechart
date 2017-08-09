import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import GoogleMapReact from 'google-map-react';

import logo from '../assets/logo.png'

const Marker = () => <img src={logo} alt=""/>;

class Home extends Component {
  static defaultProps = {
    center: { lat: 53.888304, lng: 27.5420854 },
    zoom: 13
  };
  componentWillMount() {
    if (!this.props.isLoggedIn) {
      browserHistory.push('/login');
    }
  }
  render() {
    return (
      <div>
        <h1>iTechArt</h1>
        <div className="map">
          <GoogleMapReact
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <Marker
              lat={53.888304}
              lng={27.5420854}
            />
          </GoogleMapReact>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.loginReducer.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(Home)