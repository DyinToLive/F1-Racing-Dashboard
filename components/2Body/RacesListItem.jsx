/* 
RacesListItem.jsx

This component was imported from antD. A simple list item for each of the races to be displayed
with buttons for results and standings. It would have been easy to build from scratch, but I
wanted to practice merging my data with existing components that are available.
Simulated the loadmore function, so if it is clicked on the page, it disappears after timeout
and a message pops up stating that nothing happened.

This component takes in {Races} from RacesInSeason.jsx then renders list items based on the
given season(year).
*/
import React, { useEffect, useState } from 'react';
import { Avatar, Button, List, Skeleton } from 'antd';

const RacesListItem = ({ Races, handleResultsClick, handleStandingsClick, handleCircuitsClick}) => {
  const [loading, setLoading] = useState(false);
  //Simulate loading more data to see the feature of the component on the page. 
  
  const onLoadMore = () => {
    setLoading(true);
    alert("Simulate loading more...");
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  //Did not change styling of the loadMore button.
  const loadMore =
    !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;
  return (
    <div className="float-left w-1/4 text-slate-600">
    <List
      className="demo-loadmore-list"
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={Races}
      renderItem={(dataSource) => (
        <List.Item
          actions={[<a key="list-loadmore-edit" onClick={()=> handleResultsClick(dataSource.raceId)}>Results</a>, 
          <a key="list-loadmore-more" onClick={()=> handleStandingsClick(dataSource.raceId)}>Standings</a>]}
        >
        <List.Item.Meta
            avatar={<Avatar src={"/vite.svg"} />}
            //add bold to make the description stand out whereas it was faded in antD.
            description={<a className="font-bold text-gray-800" onClick={()=> handleCircuitsClick(dataSource.circuitId)}>{dataSource.name} </a>}
            title={<a target="_blank" href={dataSource.url}>Round: {dataSource.round} </a>}
        />
        </List.Item>
      )}
    />
    </div>
  );
};
export default RacesListItem;