import React from 'react';
import { Table } from 'antd';

const ResultsTable = ({ ResultsData }) => {
    const columns = [
        {
            title: 'Position',
            dataIndex: 'position',
            sorter: (a, b) => a.position - b.position,
        },
        {
            title: 'Driver',
            dataIndex: 'driver',
        },
        {
            title: 'Constructor',
            dataIndex: 'constructor',
        },
        {
            title: 'Laps',
            dataIndex: 'laps',
        },
        {
            title: 'Points',
            dataIndex: 'points',
        },
    ];
    
    // Map data to the columns
    const data = ResultsData.map((item, index) => ({
        key: index,
        position: item.position,
        driver: `${item.drivers.forename} ${item.drivers.surname}`,
        constructor: item.constructors.name,
        laps: item.laps,
        points: item.points,
    }));
    

    return (
        <Table className="rounded-lg shadow-md" columns={columns} dataSource={data} />
    );
};

export default ResultsTable;
