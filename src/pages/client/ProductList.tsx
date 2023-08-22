import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Button, Table, Pagination } from 'antd';
import { Breadcrumb } from 'antd';
import Banner from '../components/Banner';
import { useFetchProductQuery } from '../../services/product.service';
import { useAddCartMutation } from '../../services/cart.service';
import { Iproducts } from '../../models';
const style: React.CSSProperties = { textAlign: 'center', margin: '10px 21px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px', padding: '8px', borderRadius: '8px' };
const image_style: React.CSSProperties = { borderRadius: '8px' };

const ProductList = () => {
    const { data, isLoading } = useFetchProductQuery();
    const [addCartMutation, { isLoading: isAddingToCart }] = useAddCartMutation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const productsPerPage = 8;
    const handleAddToCart = (item: Iproducts) => {
        const products = { ...item, quantity: 1 } // Log the product details
        addCartMutation({ products });
    };
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

    const [search, setData] = useState<Iproducts[]>([])

    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchKeyword(event.target.value);
    };

    const handleSearch = () => {
        if (searchKeyword) {
            const filteredProducts = search.filter((product) =>
                product.name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            setData(filteredProducts);
        } else {
            setData(data);
            return (
                <div>
                    <p>Sản phẩm không tồn tại (●'◡'●)</p>
                </div>
            )
        }
    };

    return (
        <div>
            {/* <Banner /> */}

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
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search for products"
                        value={searchKeyword}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                    <Button style={{ backgroundColor: 'black', margin: '6px', color: '#fff' }} onClick={handleSearch}>Search</Button>
                </div>

                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {currentProducts?.map((item: Iproducts) => {
                        return (
                            <Col style={style} className="gutter-row" span={5} key={item.id}>
                                <Link to={'/products/' + item.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div>
                                        <img style={{ width: '100%', borderRadius: '10px' }} src={item.images} alt="" />
                                        <h2 style={{ minHeight: '3em', fontSize: '20px' }}>{item.name}</h2>
                                        <p style={{ minHeight: '1em', fontSize: '20px' }}>{item.price} VNĐ</p>
                                    </div>
                                </Link>
                                <Button
                                    onClick={() => handleAddToCart(item)}
                                    loading={isAddingToCart}
                                    disabled={isAddingToCart}
                                >
                                    Add to Cart
                                </Button>
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

export default ProductList;
