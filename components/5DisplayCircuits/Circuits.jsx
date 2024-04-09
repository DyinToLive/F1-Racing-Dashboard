import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import CircuitStandings from './CircuitStandings.jsx';

//connect to supabase POSTGRES
const supabase = createClient(import.meta.env.VITE_supabaseUrl, import.meta.env.VITE_supabaseKey);

//Find the drivers Data for the selected Race. The race is chosen from
//the RacesListItems, each race has a button for standings and results.
//The standings component will deal with the constructor and driver
//results for the specific race ID. The data will then be passed to
//their respective component.
const Circuits = ({ selectedCircuitID, selectedTable, AddedFavorites, addToFavorites, handleTableChange }) => {
//hold the drivers data
  const [CircuitsData, setCircuitsData] = useState([]);
  const handleCircuitsClick = (selectedCircuitID) => {
    setSelectedConstructor(selectedCircuitID);
    handleTableChange("circuits");
  }; 
  useEffect(() => {   
    const selectCircuits = async () => {
      console.log("Check for infinite loop in circuits.");
      const {data, error} = await supabase 
      .from('circuits') 
      .select(` 
          name, location, country, lat, lng, url
      `) 
      .eq('circuitId',selectedCircuitID) 
      .order('name', { ascending: true }); 
      if (error) {
        console.error('Error fetching circuits', error);
        return;
      }
      else {
        console.log(data);
        setCircuitsData(data);
      }     
    };
    selectCircuits();
  }, [selectedCircuitID, supabase]);

return (
    <div>
        {selectedCircuitID && selectedTable === 'circuits' && (
        <div className="float-right p-1 w-2/3">
            <h1> Circuits </h1>
            <CircuitStandings CircuitsData={CircuitsData} 
            onCircuitsClick={handleCircuitsClick}
            AddedFavorites={AddedFavorites} addToFavorites={addToFavorites} handleTableChange={handleTableChange}/>
        </div>
        )}
    </div>
);
}

export default Circuits;