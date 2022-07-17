import { useState, useRef, useEffect,Provider } from 'react'
import './App.css'
import TabBar from './layouts/Layout'
import Content from './views/Content'
import Layouts from './layouts/Layout'



// 组件渲染
function App() {
  // 父组件管理状态
  let tabRef = useRef(null)
  useEffect(() => {
    console.log(tabRef?.current?.children[1], 'tabRef')
  }, [])
  return (
    <div className="App">
      <Layouts ref={tabRef}>
        {/* <Content /> */}
      </Layouts>
    </div>
  )
}

export default App
