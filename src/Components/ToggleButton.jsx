import React from 'react'

//style sheets
import '../Css/Component.style/ToggleButton.css'

const ToggleButton = ({ toggleOption, handleToggleOption, width, option1, option2 }) => {
  return (
    <div className='toggle_button_wrapper' style={{ width: `${width}` }} id="pointer" >
      <div className={toggleOption ? "toggle_button_item" : "disabled_toggle_button_item"} onClick={handleToggleOption} > {option1} </div>
      <div className={toggleOption ? "disabled_toggle_button_item" : "toggle_button_item"} onClick={handleToggleOption} > {option2} </div>
    </div>
  )
}

export default ToggleButton