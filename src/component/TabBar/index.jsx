import React, { useEffect } from 'react'
import { Badge, TabBar, Button } from 'antd-mobile'
// import { DemoBlock } from 'demos'
import './index.css'
import {
    AppOutline,
    MessageOutline,
    MessageFill,
    UnorderedListOutline,
    UserOutline,
} from 'antd-mobile-icons'
const LkTabBar =
    (props, ref) => {
        const tabs = [
            {
                key: 'home',
                title: '首页',
                icon: <AppOutline />,
                badge: Badge.dot,
            },
            {
                key: 'todo',
                title: '我的待办',
                icon: <UnorderedListOutline />,
                badge: '5',
            },
            {
                key: 'message',
                title: '我的消息',
                icon: (active) =>
                    active ? <MessageFill /> : <MessageOutline />,
                badge: '99+',
            },
            {
                key: 'personalCenter',
                title: '个人中心',
                icon: <UserOutline />,
            },
        ]

        const onChangeTab = (e) => {
            console.log(e)
        }

        return (
            <div ref={ref} className='lk-tab-content'>
                <TabBar  onChange={onChangeTab}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        )
    }
export default React.forwardRef(LkTabBar)