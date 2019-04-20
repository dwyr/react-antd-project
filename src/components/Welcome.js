import React from 'react';
import {observer} from 'mobx-react';
import { Link } from 'react-route'

import { Layout, Menu, Icon , Dropdown} from 'antd';

const { Header, Sider, Content } = Layout;

const { SubMenu } = Menu;

@observer
class Welcome extends React.Component {
    state = {
        collapsed: false,
        username: 'dangwei'
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">修改密码</a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">注销</a>
                </Menu.Item>
            </Menu>
        );
        return (
            <Layout className="containAll">
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >
                    <a href="https://github.com/MuYunyun/react-antd-demo" target='_blank' rel='noopener noreferrer'><Icon type="github" className="github white" /></a>
                    <span className="author white">新临建</span>
                    <Menu theme="dark" className="menu" mode="inline" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span>nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera" />
                            <span>nav 2</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload" />
                            <span>nav 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger icon-trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Dropdown className="logOut" placement="bottomRight" overlay={menu}>
                            <a href="">
                                <Icon type="solution" />管理员
                            </a>
                        </Dropdown>
                    </Header>
                    <Content style={{
                        margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
                    }}
                    >
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Welcome;
