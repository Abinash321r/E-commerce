import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
function Map() {
    //AIzaSyDtTcVqWV9GuCNIvF6Yw46kQOvsqbJMpeg

    const mapContainerStyle = {
        width: '100%',
        height: '400px',
      };
      const center = {
        lat: 27.6931,
        lng: 85.2807,
      };
  return (
    <LoadScript googleMapsApiKey="AIzaSyDtTcVqWV9GuCNIvF6Yw46kQOvsqbJMpeg">
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={center}
    >
      <Marker position={center} />
    </GoogleMap>
  </LoadScript>
  )
}

export default Map