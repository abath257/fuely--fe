import React from 'react';

const Marker = ({position}) => {
    const [marker, setMarker] = React.useState();

    React.useEffect(() => {
      if (!marker) {
        setMarker(new google.maps.Marker());
      }
  
      // remove marker from map on unmount
      return () => {
        if (marker) {
          marker.setMap(null);
        }
      };
    }, [marker]);
    React.useEffect(() => {
      if (marker) {
        marker.setOptions(options);
      }
    }, [marker, options]);
    return null;
  };

export default Marker;