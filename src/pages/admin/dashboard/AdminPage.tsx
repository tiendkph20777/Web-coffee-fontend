import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Iproducts } from '../../types/products';
import { ICategories } from '../../types/categories';

interface IData {
    name: string;
    value: number;
}

interface IProps {
    products: Iproducts[];
    category: ICategories[];
}

const AdminPage: React.FC<IProps> = ({ products, category }) => {
    const data: IData[] = [
        { name: 'Products', value: products.length },
        { name: 'Categories', value: category.length },
    ];

    return (
        <div>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
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
