import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import { ICategories } from '../../../models';
import { useFetchOneCategoryQuery, useUpdateCategoryMutation } from '../../../services/category.service';

interface IProps {
    categories: ICategories[];
    onUpdateCategory: (category: ICategories) => void;
}

const UpdateCategory = () => {
    const { id } = useParams<{ id: string }>(); // Đảm bảo id là một chuỗi (string)
    const { data, error, isLoading } = useFetchOneCategoryQuery(Number(id)); // Đảm bảo id là kiểu số (number)
    const [updateCategory] = useUpdateCategoryMutation();
    const navigate = useNavigate();

    const [category, setCategory] = useState<ICategories>();

    useEffect(() => {
        if (data) {
            setCategory(data); // Đảm bảo cập nhật category sau khi lấy dữ liệu thành công
        }
    }, [data]);

    const [form] = Form.useForm();

    useEffect(() => {
        setFields();
    }, [category]);

    const setFields = () => {
        form.setFieldsValue({
            id: category?.id,
            name: category?.name,
        });
    };

    const onFinish = async (values: any) => {
        try {
            const updatedCategory = await updateCategory(values).unwrap(); // Sử dụng unwrap() để lấy kết quả từ mutation
            navigate('/admin/category');
            notification.success({
                message: 'Update Successful',
                description: `The category ${updatedCategory.name} has been updated.`,
                duration: 2,
            });
        } catch (error) {
            console.error('Error updating category:', error);
            notification.error({
                message: 'Update Failed',
                description: 'An error occurred while updating the category.',
                duration: 2,
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!category) {
        return <div>No category found</div>;
    }

    return (
        <div>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish}
            >
                <Form.Item label="" name="id" style={{ display: 'none' }}>
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[
                        { required: true, message: 'Please input your Name Category!' },
                        { min: 5, message: 'Product Name must be at least 5 characters.' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ color: 'red' }}>
                        Update Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateCategory;
