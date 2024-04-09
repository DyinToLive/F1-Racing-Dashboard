import RacesDropdown from './RacesDropdown.jsx'
import FavoritesBar from './FavoritesBar.jsx';
import AboutMenu from './AboutMenu.jsx';
import { Button } from 'antd';

const RacingBrowser = ({handleButtonClick, seasons, handleSeasons, handleTableChange, setAddedFavorites, AddedFavorites, addToFavorites}) => { 

  return (
    <header className="rounded-lg flex justify-between px-4 py-6 bg-gray-600 text-white"> 
        <div className="flex items-center">
              <RacesDropdown handleTableChange={handleTableChange} seasons={seasons} 
              handleSeasons={handleSeasons}
              AddedFavorites={AddedFavorites} addToFavorites={addToFavorites}/>
              <h1 className='text-2x1 px-20 font-bold'> F1 Racing Dashboard Project </h1>
            <div className="flex items-center space-x-4" >
              
              <Button key="results" type="primary" 
              onClick={()=> handleButtonClick('results')}>
                Results
              </Button>
              <Button key="qualifying" type="primary" 
              onClick={()=> handleButtonClick('qualifying')}>
                  Qualifying
              </Button>
              <Button key="standings" type="primary" 
              onClick={()=> handleButtonClick('standings')}>
                  Standings
              </Button>
              <Button key="circuits" type="primary" 
              onClick={()=> handleButtonClick('circuits')}>
                  Circuits
              </Button>
  
              <FavoritesBar AddedFavorites={AddedFavorites} setAddedFavorites={setAddedFavorites} />  
              <AboutMenu />
            </div>
        </div>    
    </header>
    
  );
}

export default RacingBrowser;
