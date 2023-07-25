import React from 'react'

//style sheets
import '../Css/Component.style/Body.css'

//custom components
import Content from './Content'
import SideBar from "./SideBar"


const Body = () => {
  return (
    <div className='body_container'>
      <SideBar />
      <Content />
    </div>
  )
}

export default Body