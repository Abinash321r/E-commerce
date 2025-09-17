import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
function Map() {
    const mapContainerStyle = {
        width: '100%',
        height: '400px',
      };
      const center = {
        lat: 27.6931,
        lng: 85.2807,
      };
  return (
    <LoadScript >
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