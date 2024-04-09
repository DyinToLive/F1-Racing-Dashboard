import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';

const CircuitStandings = ({ CircuitsData, addToFavorites, AddedFavorites }) => {
    //track state of a selected constructor name so we can render a modal on click.
    const [selectedCircuit, setSelectedCircuit] = useState(null);

    const showModal = (record) => {
        setSelectedCircuit(record);
    };

    const handleCancel = () => {
        setSelectedCircuit(null);
    };

    const favHandler = () => {
        addToFavorites(selectedCircuit, 'circuits');
      };      

    const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        render: (text, record) => <a onClick={() => showModal(record)}>{text}</a>,
    },
    {
        title: 'Location',
        dataIndex: 'location',
    },
    {
        title: 'Country',
        dataIndex: 'country',
    },
    {
        title: 'URL',
        dataIndex: 'url',
    },
    ];
    //map data to the columns
    const data = CircuitsData.map((item, index) => ({
        key: index,
        name: `${item.name}`,
        location: item.location,
        country: item.country,
        lat: item.lat,
        lng: item.lng,
        url: item.url,
        image: item.image || 'https://placehold.co/200x200/png',
      }));
  return (
        <>
            <Table className="rounded-lg shadow-md" columns={columns} dataSource={data} />

            <Modal
                title="Circuit Details"
                visible={!!selectedCircuit}
                onCancel={handleCancel}
                footer={[
                    <Button key="addToFavorites" type="primary" onClick={favHandler}>
                        Add to Favorites
                    </Button>,
                ]}
            >
                {selectedCircuit && (
                    <>
                        <img src={selectedCircuit.image} alt={selectedCircuit.name} />
                        <p>Name: {selectedCircuit.name}</p>
                        <p>Location: {selectedCircuit.location}</p>
                        <p>Country: {selectedCircuit.country}</p>
                        <p>lat: {selectedCircuit.lat}</p>
                        <p>lng: {selectedCircuit.lng}</p>
                        <p>URL: {selectedCircuit.url}</p>
                    </>
                )}
            </Modal>
        </>
  )
};
export default CircuitStandings;