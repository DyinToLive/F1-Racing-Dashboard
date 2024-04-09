import React from 'react';
import { Table } from 'antd';

const QualifyingTable = ({ QualifyingData, handleTable }) => {
    const columns = [
        {
            title: 'Position',
            dataIndex: 'position',
            sorter: (a, b) => a.position - b.position,
        },
        {
            title: 'Q1',
            dataIndex: 'q1',
        },
        {
            title: 'Q2',
            dataIndex: 'q2',
        },
        {
            title: 'Q3',
            dataIndex: 'q3',
        },
        {
            title: 'Constructor',
            dataIndex: 'constructorName',
        },
    ];

    const data = QualifyingData.map((item, index) => ({
        key: index,
        position: item.position,
        q1: item.q1,
        q2: item.q2,
        q3: item.q3,
        constructorName: item.constructors.name,
    }));

    return (
        <Table className="rounded-lg shadow-md" columns={columns} dataSource={data} />
    );
};

export default QualifyingTable;
