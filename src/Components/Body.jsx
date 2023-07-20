import React from 'react'
import '../Css/Component.style/Body.css'
import SideBar from './SideBar'
import Content from './Content'


const Body = () => {
  return (
    <div className='body_container'>
      <SideBar />
      <Content />
    </div>
  )
}

export default Body