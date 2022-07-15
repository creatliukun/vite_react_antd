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
export default function
    (props) {
    const { refs } = props
    console.log(refs, 'viewindex')
    const clickGet = () => {
        // console.log(tabRef, 'tabRef')
    }
    useEffect(() => {
        console.log(refs?.current, 'tabRef')
    })
    return (
        <div className='lk-con-content'>
            <Button color='success' onClick={clickGet}>测试</Button>
        </div>
    )
}
