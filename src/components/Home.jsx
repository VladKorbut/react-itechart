import React from 'react'
import GoogleMapReact from 'google-map-react';
import logo from '../assets/logo.png'

const Marker = () => <img src={logo} alt=""/>;

function Home(props){
  const defaultProps = {
    center: { lat: 53.8882836, lng: 27.5442615 },
    zoom: 13
  };
  return(
    <div>
        <h1>iTechArt</h1>
        <div className="map">
          <GoogleMapReact
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
            />
          </GoogleMapReact>
        </div>
      </div>
  )  
}


export default Home