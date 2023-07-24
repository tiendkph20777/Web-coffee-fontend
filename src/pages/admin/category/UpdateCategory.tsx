import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form, Input, notification } from 'antd';
import { ICategories } from '../../types/categories';
interface IProps {
    categories: ICategories[],
    onUpdateCategory: (category: ICategories) => void
}

const UpdateCategory = (props: IProps) => {
    const { id } = useParams()
    console.log(id);
    const navigate = useNavigate()

    const [category, setCategory] = useState<ICategories>()
    useEffect(() => {
        const currentCategory = props.categories.find((product: ICategories) => product.id == Number(id))
        setCategory(currentCategory)
    }, [props])
    useEffect(() => {
        setFields()
    }, [category])
    const [form] = Form.useForm();

    const setFields = () => {
        form.setFieldsValue({
            id: category?.id,
            name: category?.name
        })
    }
    const onFinish = (values: any) => {
        props.onUpdateCategory(values);
        navigate('/admin/category');
        notification.success({
            message: 'Update Successful',
            description: `The category ${values.name} has been updated.`,
            duration: 2
        });
    };

    return (
        <div>
            <Form form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish} >
                <Form.Item
                    label=""
                    name="id"
                    style={{ display: 'none' }}
                >
                    <Input />
                </Form.Item>


                <Form.Item
                    label="Category Name"
                    name="name"
                    rules={[{ required: true, message: 'Please input your Name Category!' }, { min: 5, message: 'Product Name must be at least 5 characters.' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Update Category
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default UpdateCategory