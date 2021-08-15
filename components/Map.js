import React, { useState } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';
import { LocationMarkerIcon } from '@heroicons/react/solid';

function Map({ searchResults }) {
  const [selectedLocation, setselectedLocation] = useState({});
  const coordinates = searchResults.map((item) => ({
    longitude: item.long,
    latitude: item.lat,
  }));
  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 10,
    width: '100%',
    height: '100vh',
  });

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/moonmoon85/ckscn6b0v41ct18rmz140jwge'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((item) => (
        <div key={item.long}>
          <Marker
            longitude={item.long}
            latitude={item.lat}
            offsetLeft={-20}
            offsetTop={10}
          >
            <p
              onMouseEnter={() => setselectedLocation(item)}
              role='img'
              aria-label='pin'
            >
              <LocationMarkerIcon className='h-6 text-red-400' />
            </p>
          </Marker>
          {selectedLocation.long === item.long ? (
            <Popup
              onClose={() => setselectedLocation({})}
              closeOnClick
              latitude={item.lat}
              longitude={item.long}
            >
              {item.title}
            </Popup>
          ) : null}
        </div>
      ))}
      ;
    </ReactMapGL>
  );
}

export default Map;
