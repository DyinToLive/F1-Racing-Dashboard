import React, { useState } from 'react';
import { Table, Modal, Button } from 'antd';

const ConstructorStandings = ({ ConstructorsData, addToFavorites, AddedFavorites }) => {
    //track state of a selected constructor name so we can render a modal on click.
    const [selectedConstructor, setSelectedConstructor] = useState(null);

    const showModal = (record) => {
        setSelectedConstructor(record);
    };

    const handleCancel = () => {
        setSelectedConstructor(null);
    };

    const favHandler = () => {
        addToFavorites(selectedConstructor, 'constructors');
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
    const data = ConstructorsData.map((item, index) => ({
        key: index,
        position: item.position,
        name: `${item.constructors.name}`,
        points: item.points,
        wins: item.wins,
        url: item.constructors.url,
        nationality: item.constructors.nationality,
        image: item.constructors.image || 'https://placehold.co/200x200/png',
      }));
      //console.log(selectedConstructor);
  return (
        <>
            <Table className="rounded-lg shadow-md" columns={columns} dataSource={data} />

            <Modal
                title="Constructor Details"
                visible={!!selectedConstructor}
                onCancel={handleCancel}
                footer={[
                    <Button key="addToFavorites" type="primary" onClick={favHandler}>
                        Add to Favorites
                    </Button>,
                ]}
            >
                {selectedConstructor && (
                    <>
                        <img src={selectedConstructor.image} alt={selectedConstructor.name} />
                        <p>Name: {selectedConstructor.name}</p>
                        <p>Nationality: {selectedConstructor.nationality}</p>
                        <p>Wins: {selectedConstructor.wins}</p>
                        <p>URL: {selectedConstructor.url}</p>
                    </>
                )}
            </Modal>
        </>
  )
};
export default ConstructorStandings;