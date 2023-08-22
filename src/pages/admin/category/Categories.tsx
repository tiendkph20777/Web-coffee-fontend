import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Input, Popconfirm, notification } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import { ICategories } from '../../../models';
import { useFetchCategoriesQuery, useRemoveCategoryMutation } from '../../../services/category.service';

interface DataType {
    key: React.Key;
    name: string;
}

const Categories = () => {
    const { data: categories, isLoading } = useFetchCategoriesQuery();
    const [removeCategory] = useRemoveCategoryMutation();

    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        if (!isLoading) {
            const data = categories?.map((item) => {
                return {
                    key: item.id,
                    name: item.name,
                };
            }) || [];
            console.log(data);
            setFilteredData(data);
        }
    }, [categories, isLoading]);


    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();

        const filtered = categories?.map((item) => {
            return {
                key: item.id,
                name: item.name,
            };
        })?.filter((item) => {
            return item.name.toLowerCase().includes(value);
        }) || [];

        setSearchText(value);
        setFilteredData(value ? filtered : categories?.map((item) => ({ key: item.id, name: item.name })) || []);
    };

    const onRemoveCategory = async (id: number) => {
        try {
            await removeCategory(id);
            notification.success({
                message: 'Remove',
                description: (
                    <span>
                        Category removed successfully!
                    </span>
                ),
            });
        } catch (error) {
            console.error('Failed to remove category', error);
            notification.error({
                message: 'Remove Error',
                description: (
                    <span>
                        Failed to remove category.
                    </span>
                ),
            });
        }
    };

    const columns: ColumnsType<DataType> = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record) => (
                <span>
                    <Popconfirm
                        style={{ color: "red" }}
                        title="Are you sure to remove this item?"
                        onConfirm={() => onRemoveCategory(record.key)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="primary" style={{ backgroundColor: 'red', margin: '4px', minWidth: '8em' }}>
                            <CloseOutlined /> Remove
                        </Button>
                    </Popconfirm>
                    <Button type="primary" style={{ backgroundColor: 'green', margin: '4px', minWidth: '8em' }}>
                        <Link to={record.key + '/update'}>
                            <EditOutlined /> Update
                        </Link>
                    </Button>
                </span>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" style={{ backgroundColor: 'green', margin: '10px' }}>
                <Link to={'/admin/category/add'}>
                    <EditOutlined />Add Category
                </Link>
            </Button>

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
