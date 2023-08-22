import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { UserSwitchOutlined, HomeOutlined, InboxOutlined, UserOutlined, SettingOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { MenuProps, Layout, Row, Col, Button, notification } from 'antd';
const { Header } = Layout;
import { Menu } from 'antd';
import logo from '../images/logo/th (1).jpg';
const Ilogo: React.CSSProperties = {
    borderRadius: '8px',
    width: '3em',
};

const HeaderHome = () => {
    const [current, setCurrent] = useState('mail');
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/signin');
    };

    const isLoggedIn = localStorage.getItem('user');

    const isAdmin = isLoggedIn ? JSON.parse(isLoggedIn).role === 'admin' : false;

    const items: MenuProps['items'] = [
        {
            label: <a><Link to={'/'} />Home</a>,
            key: 'mail',
            icon: <HomeOutlined />,
        },
        {
            label: <a><Link to={'/products'} />Products</a>,
            icon: <InboxOutlined />,
            key: 'alipay',
        },
        {
            label: <a><Link to={'/cart'} />Cart</a>,
            icon: <InboxOutlined />,
            key: 'cart',
        },
        isLoggedIn ? (
            {
                label: (
                    <>
                        {isAdmin && (
                            // Nếu người dùng có quyền admin, hiển thị liên kết dẫn sang trang admin
                            <a><Link to={'/admin'} />Admin</a>
                        )}
                        <Button onClick={handleLogout} className='ml-5'>Logout</Button>
                    </>
                ),
                key: 'logout',
                icon: <UsergroupAddOutlined />,
            }
        ) : (
            {
                label: <a><Link to={'/signin'} />SignUp</a>,
                icon: <UsergroupAddOutlined />,
                key: 'signup',
            }
        ),
    ];

    return (
        <div>
            <Header style={{ backgroundColor: '#fff' }}>
                <Row justify="space-between" align="middle">
                    <Col >
                        <div className='box_logo'>
                            <img src={logo} style={Ilogo} alt="Logo" />
                        </div>
                    </Col>
                    <Col>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                    </Col>
                </Row>
            </Header>
        </div>
    );
};

export default HeaderHome;
