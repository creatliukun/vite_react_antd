import React, { useEffect, useRef, useState } from 'react'
import { Badge, TabBar, Button } from 'antd-mobile'
// import { DemoBlock } from 'demos'
import Content from '@/views/Content'
import Romantic from '@/views/Romantic'
import ObjRun from '@/views/ObjRun'
// import Click from '@/views/Click'
import OtherObj from '@/views/OtherObj'
import Panda from '@/views/Panda'
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
        const { children } = props
        const [currentTab, setCurrentTab] = useState("click")

        // 性能优化的话，做的有点早，所以现在就有点难受去尝试
        const tabs = [
            {
                key: 'click',
                title: '时钟',
                icon: <AppOutline />,
                badge: Badge.dot,
            },
            {
                key: 'romantic',
                title: '浪漫',
                icon: <UnorderedListOutline />,
                badge: '5',
            },
            {
                key: 'image',
                title: '图片',
                icon: (active) =>
                    active ? <MessageFill /> : <MessageOutline />,
                badge: '99+',
            },
            {
                key: 'panda',
                title: '熊猫',
                icon: <UserOutline />,
            },
        ]

        const onChangeTab = (e) => {
            // console.log(e)
            // ref.current
            setCurrentTab(e)

        }
        useEffect(() => {
            console.log(currentTab)
        }, [currentTab])

        return (
            <div ref={ref} className='lk-content'>
                {/* {currentTab == "click" ? <Click currentTab={currentTab} /> : ""} */}
                {currentTab == "click" ? <OtherObj currentTab={currentTab} /> : ""}
                {currentTab == "romantic" ? <Romantic currentTab={currentTab} /> : ""}
                {currentTab == "image" ? <ObjRun currentTab={currentTab} /> : ""}
                {currentTab == "panda" ? <Panda currentTab={currentTab} /> : ""}
                <TabBar className='lk-tab-content' onChange={onChangeTab}>
                    {tabs.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        )
    }
export default React.forwardRef(LkTabBar)