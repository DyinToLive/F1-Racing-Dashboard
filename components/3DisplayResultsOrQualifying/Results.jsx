import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js';
import ResultsTable from './ResultsTable.jsx';
import QualifyingTable from './QualifyingTable.jsx';

//Find the results data for the selected Race. The race is chosen from
//the RacesListItems, each race has a button for standings and results.
//The Results component will deal with the results of the race for the specified
//RaceID.

//connect to supabase POSTGRES
const supabase = createClient(import.meta.env.VITE_supabaseUrl, import.meta.env.VITE_supabaseKey);

const Results = ({ selectedCircuitName,selectedRaceID,selectedTable, handleTableChange }) => {
        //Keep the state of the selected race to display results data table.
        const [ResultsData, setResultsData] = useState([]);

        useEffect(() => {   
          const selectRaceResults = async () => {
            console.log("Check for infinite loop in Results.");
            const {data, error} = await supabase 
            .from('results') 
            .select(` 
                position, points, laps, drivers (forename, surname), races!inner (raceId),
                constructors (name)
            `) 
            .eq('raceId',selectedRaceID)
            .order('position', {ascending: true}) 
            if (error) {
              console.error('Error fetching Race Results', error);
              return;
            }
            else {
              console.log(data);
              setResultsData(data);
            }     
          };
          selectRaceResults();
        }, [selectedRaceID, supabase]);

        //hold the constructor data
        const [QualifyingData, setQualifyingData] = useState([]);

        useEffect(() => {   
            const selectQualifying = async () => {
              console.log("Check for infinite loop in Qualifying.");
              const {data, error} = await supabase 
              .from('qualifying') 
              .select(` 
                  raceId, position, q1, q2, q3, constructors (name), races!inner (raceId)
              `) 
              .eq('raceId',selectedRaceID)
              .order('position', { ascending: true }); 
              if (error) {
                console.error('Error fetching Qualifying', error);
                return;
              }
              else {
                console.log(data);
                setQualifyingData(data);
              }     
            };
            selectQualifying();
          }, [selectedRaceID, supabase]);

          console.log(selectedTable);
        
          return (
            <div>
                {selectedRaceID && selectedTable === 'results' && (
                <div className="p-1 float-right w-2/3">
                    <h1> Results  for {selectedCircuitName}</h1>
                    <ResultsTable ResultsData={ResultsData} />
                </div>
                )}
                {selectedRaceID && selectedTable === 'qualifying' && (
                <div className="float-right p-1 w-2/3">
                    <h1> Qualifying </h1>
                    <QualifyingTable QualifyingData={QualifyingData} /> 
                </div>    
                )} 
            </div>
        );
}

export default Results;
