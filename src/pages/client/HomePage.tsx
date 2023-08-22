import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Table, Pagination } from 'antd';
import { Breadcrumb } from 'antd';
import Banner from '../components/Banner';
import { useFetchProductQuery } from '../../services/product.service';

const style: React.CSSProperties = { textAlign: 'center', margin: '10px 21px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', padding: '8px', borderRadius: '8px' };
const image_style: React.CSSProperties = { borderRadius: '8px' };

const HomePage = () => {
    const { data, isLoading } = useFetchProductQuery();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 8;

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = data?.slice(indexOfFirstProduct, indexOfLastProduct);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: any, record: any) => <Link to={'/products/' + record.id}>{text}</Link>
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Categories',
            dataIndex: 'categories',
            key: 'categories',
        },
    ];

    return (
        <div>
            <Banner />

            <Breadcrumb
                items={[
                    {
                        title: <a><Link to={'/'}>Home</Link></a>,
                    },
                    {
                        title: <a><Link to={'/products'}>Products</Link></a>,
                    },
                ]}
            />
            <div className="category-buttons">
                {/* Buttons for categories */}
            </div>

            <div className='products_main'>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {currentProducts?.map((item) => {
                        return (
                            <Col style={style} className="gutter-row" span={5}>
                                <Link to={'/products/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div key={item.id}>
                                        <img style={{ width: '100%', borderRadius: '10px' }} src={item.images} alt="" />
                                        <h2 style={{ minHeight: '3em', fontSize: '20px' }}>{item.name}</h2>
                                        <p style={{ minHeight: '1em', fontSize: "20px" }}>{item.price} VNĐ</p>
                                        {/* <Button disabled>{item.categoryId}</Button> */}
                                        {/* <p style={{ minHeight: '4em' }}>{item.details}</p> */}
                                    </div>
                                </Link>
                            </Col>
                        );
                    })}
                </Row>
                <Pagination
                    current={currentPage}
                    pageSize={productsPerPage}
                    total={data?.length}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default HomePage;
