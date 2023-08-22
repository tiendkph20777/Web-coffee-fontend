import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Breadcrumb, Popconfirm, notification } from 'antd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
import Search from 'antd/es/transfer/search';
import { ICategories } from '../../../models';
import { useFetchProductQuery, useRemoveProductMutation } from '../../../services/product.service';

interface DataType {
    key: React.Key;
    name: string;
    price: number;
    image: string;
    description: string
    categoryId: number;
}

const ListProducts = () => {
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState<DataType[]>([]);
    const { data: products, isFetching } = useFetchProductQuery(); // Fetch products using the API hook
    const [removeProductMutation] = useRemoveProductMutation(); // Hook to remove a product using the API

    useEffect(() => {
        if (!isFetching) {
            // Data is fetched and available
            const data = products?.map((item) => ({
                key: item.id,
                name: item.name,
                price: item.price,
                image: item.images,
                description: item.details,
                categoryId: item.categoryId,
            }));
            setSearchResult(data || []);
        }
    }, [products, isFetching]);

    const onSearch = (value: string) => {
        const filteredData = products?.filter((item) =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResult(filteredData || []);
        setSearchText(value);
    };

    const removeProduct = async (id: number) => {
        console.log(id);
        try {
            await removeProductMutation(id);
            notification.success({
                message: 'Remove',
                description: (
                    <span>
                        Product <b>{products?.find((item) => item.id === id)?.name}</b> removed successfully!
                    </span>
                ),
            });
        } catch (error) {
            console.error('Failed to remove product', error);
            notification.error({
                message: 'Remove',
                description: 'Failed to remove product. Please try again later.',
            });
        }
    };

    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Price', dataIndex: 'price', key: 'price' },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image: string) => <img src={image} alt="Product image" width={100} />,
        },
        { title: 'Category', dataIndex: 'categoryId', key: 'categoryId' },

        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (record: DataType) => (
                <span>
                    <Popconfirm
                        title="Are you sure to remove this item?"
                        onConfirm={() => {
                            removeProduct(record.key);
                        }}
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
            <Search placeholder="Search product" value={searchText} onChange={(e) => onSearch(e.target.value)} enterButton />
            <Button type="primary" style={{ backgroundColor: 'green', margin: '10px' }}>
                <Link to={'/admin/products/add'}>
                    <EditOutlined />Add Product
                </Link>
            </Button>
            <Table
                columns={columns}
                expandable={{
                    expandedRowRender: (record: DataType) => <p style={{ margin: 0 }}>{record.description}</p>,
                    rowExpandable: (record: DataType) => record.name !== 'Not Expandable',
                }}
                dataSource={searchResult.length > 0 ? searchResult : []}
                pagination={{ pageSize: 5, showQuickJumper: true }}
            />
        </div>
    );
};

export default ListProducts;
