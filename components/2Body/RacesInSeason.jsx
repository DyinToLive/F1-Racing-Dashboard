import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import RacesListItem from './RacesListItem.jsx'
import Standings from '../4DisplayConstructorsAndDrivers/Standings.jsx'
import Results from '../3DisplayResultsOrQualifying/Results.jsx'
import Circuits from '../5DisplayCircuits/Circuits.jsx';
//connect to supabase POSTGRES
const supabase = createClient(import.meta.env.VITE_supabaseUrl, import.meta.env.VITE_supabaseKey);

const RacesInSeason = ({ setSelectedCircuitName, selectedSeason, selectedTable, AddedFavorites, addToFavorites, handleTableChange }) => {

    const [Races, setRaces] = useState([]);
    const [selectedRaceID, setSelectedRaceID] = useState(null);
    const [selectedCircuitID, setSelectedCircuitID] = useState(null);
   
    //Change the selected table so we can render the table conditionally depending
    //on which table is selected.  
    const handleStandingsClick = (raceID) => {
        setSelectedRaceID(raceID);
        selectedTable="standings";
        handleTableChange(selectedTable);
    };
    const handleCircuitsClick = (circuitID) => {
        setSelectedCircuitID(circuitID);
        selectedTable="circuits";
        handleTableChange(selectedTable);
    };
    const handleResultsClick = (raceID) => {
        setSelectedRaceID(raceID);
        selectedTable="results";
        handleTableChange(selectedTable);
    };
    //Fetch for races for the dropdown menu
    useEffect(() => { 
        if(selectedSeason){
            const selectRaces = async () => {
                const { data, error } = await supabase 
                    .from('races') 
                    .select(`name, round, raceId, circuitId`) 
                    .eq('year', selectedSeason)
                    .order('round', { ascending: true }); 
                if (error) {
                    console.error('Error fetching Races', error);
                    return;
                }
                setRaces(data);
            };
            selectRaces();
        }
        }, [selectedSeason, supabase]);
        
        
    // Always return the list items so a user can choose between F1 circuits.
    // Conditionally render circuits, and results(qualifying or results), 
    // standings(constructors and drivers).
    return (
        <body>
        <RacesListItem 
            Races={Races} 
            handleStandingsClick={handleStandingsClick} 
            handleResultsClick={handleResultsClick}
            handleCircuitsClick={handleCircuitsClick}
            setSelectedCircuitName={setSelectedCircuitName}
            handleTableChange={handleTableChange}
            selectedTable={selectedTable}
        />
        {selectedRaceID && selectedTable === 'standings' && (
            <Standings
                handleTableChange={handleTableChange}
                selectedRaceID={selectedRaceID}
                AddedFavorites={AddedFavorites}
                addToFavorites={addToFavorites}
                selectedTable={selectedTable}
            />
        )}
        {selectedCircuitID && selectedTable === 'circuits' && (
            <Circuits
                selectedCircuitID={selectedCircuitID}
                handleTableChange={handleTableChange}
                selectedTable={selectedTable}
                AddedFavorites={AddedFavorites}
                addToFavorites={addToFavorites}
            />
        )}
        {selectedRaceID && selectedTable === 'results' && (
            <Results
                handleTableChange={handleTableChange}
                selectedRaceID={selectedRaceID}
                selectedTable={selectedTable}
            />
        )}
        {(selectedRaceID && selectedTable === 'results') || 
        (selectedRaceID && selectedTable === 'qualifying') && (
            <Results
                handleTableChange={handleTableChange}
                selectedRaceID={selectedRaceID}
                selectedTable={selectedTable}
            />
        )}
    </body>
    )
};

export default RacesInSeason;
