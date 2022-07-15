import { useState, useRef, useEffect } from 'react'
import './App.css'
import TabBar from './component/TabBar'
import Content from './views/Content'


// 组件渲染
function App() {
  let tabRef = useRef(null)
  console.log(tabRef,'tabRef')
  // 性能优化的话，做的有点早，所以现在就有点难受去尝试
  useEffect(()=>{
    // console.log()
    // console.log(tabRef,'tabRef')
  })
  return (
    <div className="App">
      <Content refs={tabRef} />
      <TabBar ref={tabRef} />
    </div>
  )
}

export default App
