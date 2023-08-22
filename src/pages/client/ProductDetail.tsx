import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Breadcrumb, Card, Row, Col, Pagination } from 'antd';
import { Iproducts } from '../../models';
import { useFetchOneProductQuery, useFetchProductQuery } from '../../services/product.service';

const { Meta } = Card;

const ProductDetail = () => {
    const { id } = useParams();

    // Sử dụng query hook để lấy thông tin của một sản phẩm
    const { data: currentProduct, isLoading, error } = useFetchOneProductQuery(id);

    console.log('object :>> ', currentProduct);
    // Sử dụng query hook để lấy tất cả các sản phẩm
    const { data: allProducts } = useFetchProductQuery();

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3; // số lượng sản phẩm hiển thị trên mỗi trang
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Nếu dữ liệu đang tải hoặc có lỗi, trả về null để không render giao diện
    if (isLoading || error) {
        return <div>Loading...</div>;
    }

    const otherProducts = allProducts?.filter((item: any) => item.id !== id).slice(startIndex, endIndex);
    const totalProducts = allProducts?.filter((item: any) => item.id !== id).length;
    const totalPages = Math.ceil(totalProducts / pageSize);

    const handlePageChange = (page: any) => {
        setCurrentPage(page);
    }

    return (
        <div className="product-detail-container">
            <Breadcrumb
                items={[
                    {
                        title: <a><Link to={'/'}>Home</Link></a>,
                    },
                    {
                        title: <a><Link to={'/products'}>Products</Link></a>,
                    },
                    {
                        title: <a>{id}</a>,
                    }
                ]}
            />
            <div className="product-detail-content">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={8}>
                        <img src={currentProduct?.images} style={{ width: "100%" }} />
                    </Col>
                    <Col xs={24} sm={12} md={16}>
                        <div className="product-detail-info" style={{ fontSize: "150%", lineHeight: "200%" }}>
                            <h3>Name: {currentProduct?.name}</h3>
                            <p>Price: {currentProduct?.price} VNĐ</p>
                            <p>Mô tả: {currentProduct?.details}</p>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="other-products-container">
                <h1>Other products:</h1>
                <Row gutter={[16, 16]}>
                    {otherProducts?.map((product: Iproducts) => (
                        <Col key={product.id} xs={24} sm={12} md={8}>
                            <Card className="other-product">
                                <Link to={`/products/${product.id}`}>
                                    <img src={product.images} style={{ width: '100%' }} />
                                    <p style={{ color: "black", fontSize: "150%" }}>{product.name}</p>
                                    <p style={{ color: "black", fontSize: "120%" }}>{product.price} VNĐ   </p>
                                    {/* <Meta title={product.name} description={product.price} /> */}
                                </Link>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination
                    current={currentPage}
                    total={totalProducts}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    showQuickJumper={false}
                    // showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} products`}
                    pageSizeOptions={['3']}
                />
            </div>
        </div>
    );
}

export default ProductDetail;
