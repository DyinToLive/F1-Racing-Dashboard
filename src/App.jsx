import { useState, useEffect, useContext, createContext } from 'react'
import { createClient } from '@supabase/supabase-js';
import Login from '../components/0Login/Login.jsx';
import RacingBrowser from '../components/1HeaderAndDropdown/RacingBrowser.jsx';
import RacesInSeason from '../components/2Body/RacesInSeason.jsx';
import './App.css'

//connect to supabase POSTGRES
const supabase = createClient(import.meta.env.VITE_supabaseUrl, import.meta.env.VITE_supabaseKey);

function App() {
  //Created state value for logged in, originally set to false. The login is currently
  //a placeholder for an actual validation menu. Currently the user will login if they enter
  //anything into name and password.
  const [isLoggedIn, setLoggedIn] = useState(false);
  //manage state of the favorites passed through to browser for the favorites tab,
  //and racingInSeason for the standings, then modals. The favorites drawer will display
  //constructors, drivers, and circuits favorites in separate lists, so create the object
  //for each.
  const [AddedFavorites, setAddedFavorites] = useState({
    constructors: [],
    drivers: [],
    circuits: [],
  });
  const handleButtonClick = (table) => {
    handleTableChange(table);
  };
  //Add a state variable to manage the selected table to display.
  //The original table will display the results table unless another
  //button is clicked.
  const [selectedCircuitName, setSelectedCircuitName] = useState(''); 

  //Add a state variable to manage the selected table to display.
  //The original table will display the results table unless another
  //button is clicked.
  const [selectedTable, setSelectedTable] = useState('results'); 

  const handleTableChange = (tableType) => {
    setSelectedTable(tableType);
  };
  //Create a season state for the application. Users can select a season and display
  //data accordingly.
  const [seasons, setSeasons] = useState([]);
  //set the selected season passed to the racingBrowser to handle season selection.
  const [selectedSeason, setSelectedSeason] = useState('');
  //season is changed to make the change more visible.
  useEffect( ()=>{
    selectSeasons();
  }, []);

  async function selectSeasons(){
    //console.log("check for infinite");
    const {data, error} = await supabase 
      .from('seasons') 
      .select(`*`)
      .gte('year', 2000)
      .lte('year', 2023)
      .order('year', { ascending: true });
    if (error) {
      //console.error('Error fetching seasons', error);
      return;
    }
    else {
      //console.log(data);
      setSeasons(data);
    }     
  }
  
  const handleSeasons = (selectedSeason) => {
    setSelectedSeason(selectedSeason);
  }

  const addToFavorites = (item, type) => {
  const duplicate = AddedFavorites[type].some(favorite => favorite.id === item.id);
  //Stop the duplicate from being added to the array.
  if (duplicate) {
    // If the item already exists, don't add it again
    alert(`${item.name} is already in favorites.`);
    return;
  }
    // Check the current favorites
    //console.log('Adding to favorites:', item, type);
    setAddedFavorites(prevFavorites => {
      // Check the previous favorites
      //console.log('Previous favorites:', prevFavorites);   
      return {
        ...prevFavorites,
        [type]: [...prevFavorites[type], item]
      };
    });
    alert(`${item.name} Added to favorites.`);
  };

  if (isLoggedIn){
    return (
      <div>
        <RacingBrowser seasons={seasons} 
        handleTableChange={handleTableChange} handleSeasons={handleSeasons} 
        AddedFavorites={AddedFavorites} addToFavorites={addToFavorites}
        setAddedFavorites={setAddedFavorites}
        handleButtonClick={handleButtonClick}/>

        <RacesInSeason selectedTable={selectedTable} 
        setSelectedCircuitName={setSelectedCircuitName}
        handleTableChange={handleTableChange} selectedSeason={selectedSeason} 
        AddedFavorites={AddedFavorites} addToFavorites={addToFavorites}
        handleButtonClick={handleButtonClick}/>
      </div>
    )
  }
  else {
    return (
      <div className="flex justify-center items-center h-screen">
          <Login isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn}/>
      </div>
    )
  }

}

export default App
