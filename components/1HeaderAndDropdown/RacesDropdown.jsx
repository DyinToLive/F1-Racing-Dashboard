import React from 'react';
import { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, message, Space } from 'antd';

//Dropdown component was imported from ant design. The alert is there for mor
//clarification on what year is selected should the user not see the change next 
//to "Selected F1 Season:". 

const RacesDropdown = ( {seasons, handleSeasons } ) => {
  //keep track of the selected year to display in the dropdown menu.
  const [selectedYear, setSelectedYear] = useState('');
  const items = seasons.map((season) => ({
    label: season.year, 
    key: season.year, 
  }));

  const onClick = ({ key }) => {
    handleSeasons(key);
    setSelectedYear(key);
    message.info(`Selected season ${key} for viewing.`);
  };
  return(
    <Dropdown
      menu={{
        items,
        onClick,
      }}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <Space>
        {selectedYear ? `Selected F1 Season: ${selectedYear}` : 'Select F1 Season'}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  )
  

};
export default RacesDropdown;