
import React, { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserSwitchOutlined, HomeOutlined, InboxOutlined, UserOutlined, SettingOutlined, UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { MenuProps, Layout, Row, Col, Button, notification } from 'antd';
const { Header } = Layout;
import { Menu } from 'antd';
import logo from '../../../images/logo/th (1).jpg';
const Ilogo: React.CSSProperties = {
    borderRadius: '8px',
    width: '5em',
};

const HeaderHome = () => {
    const [current, setCurrent] = useState('mail');
    const [user, setUser] = useState({});
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const items: MenuProps['items'] = [
        {
            label: (
                <a><Link to={'/'} />Home</a>
            ),
            key: 'mail',
            icon: <HomeOutlined />
        },
        {
            label: (
                <a><Link to={'/products'} />Products</a>
            ),
            icon: <InboxOutlined />,
            key: 'alipay',
        },
        {
            label: (
                <a><Link to={'/'} />SingUp</a>
            ),
            icon: <UsergroupAddOutlined />,
            key: 'singup',
        },
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
    )
}

export default HeaderHome