import React from 'react';
import GoogleMapReact from 'google-map-react';
import logo from '../assets/logo.png';

const Marker = () => <img src={logo} alt="" />;

function Home() {
  const mapSettings = {
    center: { lat: 53.8882836, lng: 27.5442615 },
    zoom: 13,
  };
  return (
    <div>
      <h1>iTechArt</h1>
      <div className="map">
        <GoogleMapReact
          defaultCenter={mapSettings.center}
          defaultZoom={mapSettings.zoom}
        >
          <Marker
            lat={mapSettings.center.lat}
            lng={mapSettings.center.lng}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}


export default Home;
