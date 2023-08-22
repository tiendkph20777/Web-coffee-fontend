import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Iproducts } from '../../../models';
import { Button, Form, Input, notification, Select } from 'antd';
import { useUpdateProductMutation, useFetchOneProductQuery } from '../../../services/product.service';
import { useFetchCategoriesQuery } from '../../../services/category.service';

const { Option } = Select;

interface RouteParams {
    productId: string;
}

const UpdateProduct: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    // console.log(id);
    // const { productId } = useParams<RouteParams>();
    const [updateProduct] = useUpdateProductMutation();
    const { data: product } = useFetchOneProductQuery(id);
    const { data: categories } = useFetchCategoriesQuery();
    // console.log(product);
    useEffect(() => {
        if (product) {
            form.setFieldsValue({
                name: product.name,
                price: product.price,
                images: product.images,
                details: product.details,
                categoryId: product.categoryId,
            });
        }
    }, [product]);

    const [form] = Form.useForm();

    const onFinish = async (updatedProduct: Iproducts) => {
        try {
            await updateProduct(updateProduct);
            // console.log(updateProduct);

            navigate('/admin/products');
            // notification.success({
            //     message: 'Success',
            //     description: 'Product updated successfully!',
            // });
        } catch (error) {
            console.error('Error updating product:', error);
            notification.error({
                message: 'Error',
                description: 'An error occurred while updating the product.',
            });
        }
    };

    return (
        <div>
            {product ? (
                <Form
                    form={form}
                    name="updateProduct"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 500, margin: '0 auto' }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input the Product Name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                        rules={[
                            { required: true, message: 'Please input the Price!' },
                            {
                                validator: (_, value) => {
                                    if (!value || !isNaN(Number(value))) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Price must be a number.');
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image"
                        name="images"
                        rules={[
                            { required: true, message: 'Please input the image URL!' },
                            {
                                validator: (_, value) => {
                                    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
                                    if (urlRegex.test(value)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Image must be a valid URL.');
                                },
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="details"
                        rules={[{ required: true, message: 'Please input the description!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="categoryId"
                        rules={[{ required: true, message: 'Please select a category!' }]}
                    >
                        <Select placeholder="Select a category">
                            {categories?.map((category) => (
                                <Option key={category.id} value={category.id}>
                                    {category.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="default" htmlType="submit">
                            Update Product
                        </Button>
                    </Form.Item>
                </Form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateProduct;
