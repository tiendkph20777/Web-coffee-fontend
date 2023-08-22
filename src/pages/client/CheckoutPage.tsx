import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateField, clearForm } from '../reducers/paymentSlice';
import { Input, Button, Form, Row, Col } from 'antd';

const CheckoutPage = () => {
    const paymentData = useSelector((state) => state.payment);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(updateField({ field: name, value }));
    };

    const handleClearForm = () => {
        dispatch(clearForm());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Xử lý logic thanh toán thực tế tại đây với paymentData
        // ...
    };



    return (
        <div style={{ padding: '0 500px' }}>
            <h1 style={{ fontSize: 40 }}>Trang thanh toán</h1>
            <Form layout="vertical" onSubmit={handleSubmit}>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Tên:">
                            <Input
                                id="cardholderName"
                                name="cardholderName"
                                value={paymentData.cardholderName}
                                onChange={handleChange}
                                placeholder="Nhập tên của bạn"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại:">
                            <Input
                                id="cardNumber"
                                name="cardNumber"
                                value={paymentData.cardNumber}
                                onChange={handleChange}
                                placeholder="Nhập số của bạn"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Địa chỉ">
                            <Input
                                id="expirationDate"
                                name="expirationDate"
                                value={paymentData.expirationDate}
                                onChange={handleChange}
                                placeholder="Nhập địa chỉ của bạn"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Tổng tiền">
                            <Input
                                id="cvv"
                                name="cvv"
                                value={paymentData.cvv}
                                onChange={handleChange}
                                placeholder="Tổng tiền"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item>
                    <Button type="default" htmlType="submit">
                        Đặt hàng
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CheckoutPage;
