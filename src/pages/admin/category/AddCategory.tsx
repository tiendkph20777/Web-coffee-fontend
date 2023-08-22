// import React from 'react'
import { useNavigate } from 'react-router-dom';
// import { useForm, SubmitHandler } from 'react-hook-form'
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { ICategories } from '../../../models';
import { useAddCategoryMutation } from '../../../services/category.service';
interface IProps {
    categories: ICategories[],
    onAddCategory: (product: ICategories) => void
}
const AddCategory = () => {
    const [createCate, { isSuccess }] = useAddCategoryMutation()

    const navigate = useNavigate()
    const onFinish = (values: any) => {
        createCate(values)
        navigate('/admin/category')
    };
    return (
        <div>
            <Form
                name="basic"
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
                    rules={[{ required: true, message: 'Please input your Name Product!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit" style={{ color: "red" }}>
                        Add New Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddCategory
