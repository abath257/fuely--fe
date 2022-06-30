import { useState, useEffect} from "react";
import Filter from "./Filter";
import Map from "./Map";
import List from "./List";
import fetchLocation from "../utils/fetchLocation";
import {getAllStations} from "../utils/api";



const Home = () => {
  
  const user = {user: "guest"}

  const [displayType, setDisplayType] = useState("map");
  const [allStations, setAllStations] = useState([]);


    //state for user location coordinates
    //change to not have a default, set loading behavaiour
    const [coords, setCoords] = useState({lat: 59.9139, lng:10.7522})

    //this updates the location with users coords on iniital render if user allows location
    useEffect(() => {
      fetchLocation(setCoords)
    }, [])



    // Sends API request for all stations array when coords changes, like if theyre set by geolocate.
    useEffect(() => {
      getAllStations(coords, user)
      .then(data => {
        setAllStations(data.allStations)
      }
      )
    }, [coords])





  return (
    <div>
     
      <Filter setDisplayType={setDisplayType} displayType={displayType} />
      {displayType === "map" ? (
        <Map allStations={allStations} coords={coords} />
      ) : (
        <List allStations={allStations} />
      )}
    </div>
  );
};

export default Home;



// {'name': 'ESSO TESCO OLTON EXPRESS', 'station_id': 'ChIJ7_8A2iS6cEgR-FhkV2HcyoA', 'address': '11 Warwick Rd, Olton, Solihull, Birmingham B92 7HS',
//  'coordinates': {'lat': 52.4426908, 'lng': -1.8116267}, 'price': 0, 'votes': 0}