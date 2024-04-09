import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';

const DriverStandings = ({ DriversData, AddedFavorites, addToFavorites}) => {
    //track state of a selected driver name so we can render a modal on click.
    const [selectedDriver, setSelectedDriver] = useState(null);
    const showModal = (record) => {
        setSelectedDriver(record);
    };

    const handleCancel = () => {
        setSelectedDriver(null);
    };

    const favHandler = () => {
        addToFavorites(selectedDriver, 'drivers');
    }; 

    const columns = [
    {
        title: 'Position',
        dataIndex: 'position',
        sorter: (a, b) => a.position - b.position,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => <a onClick={() => showModal(record)}>{text}</a>,
    },
    {
        title: 'Points',
        dataIndex: 'points',
        sorter: (a, b) => a.points - b.points,
    },
    {
        title: 'Wins',
        dataIndex: 'wins',
        sorter: (a, b) => a.wins - b.wins,
    },
    ];

    //map data to the columns
    const data = DriversData.map((item, index) => ({
        key: index,
        position: item.position,
        name: `${item.drivers.forename} ${item.drivers.surname}`,
        points: item.points,
        wins: item.wins,
        image: item.drivers.image || 'https://placehold.co/200x200/png',
        nationality: item.drivers.nationality,
        dob: item.drivers.dob,
        url: item.drivers.url,
      }));

    return (
    <>
        <Table className="rounded-lg shadow-md" columns={columns} dataSource={data} />

        <Modal
            title="Constructor Details"
            visible={!!selectedDriver}
            onCancel={handleCancel}
            footer={[
                <Button key="addToFavorites" type="primary" onClick={favHandler}>
                    Add to Favorites
                </Button>,
            ]}
        >
            {selectedDriver && (
                <>
                    <img src={selectedDriver.image} alt={selectedDriver.name} />
                    <p>Nationality: {selectedDriver.nationality}</p>
                    <p>Name: {selectedDriver.name}</p>
                    <p>DOB: {selectedDriver.dob}</p>
                    <p>URL: {selectedDriver.url}</p>
                </>
            )}
        </Modal>
    </>
    )
};
export default DriverStandings;