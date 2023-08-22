import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Iproducts } from '../../models';
import { ICategories } from '../../models';
import { useFetchProductQuery } from '../../services/product.service';
import { useFetchCategoriesQuery } from '../../services/category.service';

interface IData {
    name: string;
    value: number;
}

interface IProps {
    products: Iproducts[];
    category: ICategories[];
}

const AdminPage = () => {
    const { data: product, isLoading } = useFetchProductQuery()
    const { data: category } = useFetchCategoriesQuery()


    const pro: IData[] = [
        { name: 'Products', value: product?.length || 0 },
        { name: 'Categories', value: category?.length || 0 },
    ];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={pro}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#001529" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default AdminPage;
