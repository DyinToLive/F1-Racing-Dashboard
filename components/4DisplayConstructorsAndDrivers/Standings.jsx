import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import ConstructorStandings from './ConstructorStandings.jsx'
import DriverStandings from './DriverStandings.jsx'

//connect to supabase POSTGRES
const supabase = createClient(import.meta.env.VITE_supabaseUrl, import.meta.env.VITE_supabaseKey);

//Find the drivers Data for the selected Race. The race is chosen from
//the RacesListItems, each race has a button for standings and results.
//The standings component will deal with the constructor and driver
//results for the specific race ID. The data will then be passed to
//their respective component.
const Standings = ({ selectedRaceID, selectedTable, AddedFavorites, addToFavorites, handleTableChange }) => {
          //hold the drivers data
        const [DriversData, setDriversData] = useState([]);

        const handleDriverClick = (driverId) => {
            handleTableChange("Drivers");
            setSelectedDriver(driverId);
        };

        const handleConstructorClick = (constructorId) => {
            setSelectedConstructor(constructorId);
            handleTableChange("Constructors");
        };

        useEffect(() => {   
          const selectDrivers = async () => {
            console.log("Check for infinite loop in Drivers.");
            const {data, error} = await supabase 
            .from('driverStandings') 
            .select(` 
                raceId, position, points, wins, drivers (forename, surname, dob, nationality, url), races!inner (raceId)
            `) 
            .eq('races.raceId',selectedRaceID) 
            .order('position', { ascending: true }); 
            if (error) {
              console.error('Error fetching Drivers', error);
              return;
            }
            else {
              //console.log(data);
              setDriversData(data);
            }     
          };
          selectDrivers();
        }, [selectedRaceID, supabase]);
        
        //hold the constructor data
        const [ConstructorsData, setConstructorsData] = useState([]);

        useEffect(() => {   
            const selectConstructors = async () => {
              console.log("Check for infinite loop in Constructors.");
              const {data, error} = await supabase 
              .from('constructorStandings') 
              .select(` 
                  raceId, position, points, wins, constructors (name, url, nationality), races!inner (raceId)
              `) 
              .eq('races.raceId',selectedRaceID)
              .order('position', { ascending: true }); 
              if (error) {
                console.error('Error fetching Constructors', error);
                return;
              }
              else {
                console.log(data);
                setConstructorsData(data);
              }     
            };
            selectConstructors();
          }, [selectedRaceID, supabase]);


        return (
            <div>
                <div className="float-right p-1 w-1/3">
                    <h1> Drivers </h1>
                    <DriverStandings DriversData={DriversData} 
                    onDriverClick={handleDriverClick}
                    AddedFavorites={AddedFavorites} addToFavorites={addToFavorites} handleTableChange={handleTableChange}/>
                </div>
                <div className="float-right p-1 w-1/3">
                    <h1> Constructors </h1>
                    <ConstructorStandings ConstructorsData={ConstructorsData} 
                    onConstructorClick={handleConstructorClick}
                    AddedFavorites={AddedFavorites} addToFavorites={addToFavorites} handleTableChange={handleTableChange}/> 
                </div>     
            </div>
        );
}

export default Standings;
