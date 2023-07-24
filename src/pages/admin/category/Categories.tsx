import React, { useEffect, useState } from 'react';
// import { Iproducts } from '../types/products';
import { Link } from 'react-router-dom';
import { Table, Button, Breadcrumb, Input, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ICategories } from '../../types/categories';
// import { IUser } from '../types/users';

interface DataType {
    key: React.Key;
    name: string;
}

interface IProps {
    category: ICategories[];
    onRemoveCategory: (id: number) => void;
}

const Categories = (props: IProps) => {
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        const data = props.category.map((item) => {
            return {
                key: item._id,
                name: item.name
            };
        });
        console.log(data);
        setFilteredData(data);
    }, [props.category]);

    const removeCategories = (id: number) => {
        props.onRemoveCategory(id);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();

        const filtered = props.category.map((item) => {
            return {
                key: item._id,
                name: item.name
            };
        }).filter((item) => {
            return (
                item.name.toLowerCase().includes(value)
            );
        });

        setSearchText(value);
        setFilteredData(value ? filtered : props.category.map((item) => {
            return {
                key: item._id,
                name: item.name
            };
        }));
    };




    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) =>
                <span>
                    <Popconfirm
                        title="Are you sure to remove this item?"
                        onConfirm={() => {
                            removeCategories(record.key); notification.success({
                                message: 'Remove',
                                description: (
                                    <span>
                                        Product <b>{record.name}</b> remove successfully!
                                    </span>

                                )
                            });
                        }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: 'red', margin: '4px', minWidth: '8em' }}>
                            <CloseOutlined /> Remove
                        </Button>
                    </Popconfirm>
                    <Button type="primary" style={{ backgroundColor: 'green', margin: '4px', minWidth: '8em' }}><Link to={record.key + '/update'}><EditOutlined /> Update</Link></Button>
                </span>
        },
    ];

    return (
        <div>
            <Button type="primary" style={{ backgroundColor: 'green', margin: '10px' }}><Link to={'/admin/category/add'}><EditOutlined />Add Category</Link></Button>

            <Input.Search
                placeholder="Search by name"
                allowClear
                value={searchText}
                onChange={handleSearch}
                style={{ marginBottom: 16 }}
            />
            <Table
                columns={columns}
                expandable={{
                    rowExpandable: (record) => record.name !== 'Not Expandable',
                }}
                dataSource={filteredData}
                pagination={{ pageSize: 4, showQuickJumper: true }}
            />
        </div>
    );
};

export default Categories;
