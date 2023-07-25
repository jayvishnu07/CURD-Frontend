import React from 'react'

//style sheets
import '../Css/Component.style/Model.css'

const Model = ({ selctedTask, setShowModel, handleModel, title, description, buttonLable }) => {
  return (
    <div className="confirmation_modal">
      <div className="confirmation_content">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="confirmation_buttons">
          <button className="delete_button" onClick={event => {
            event.preventDefault();
            event.stopPropagation();
            handleModel(selctedTask);
          }}>{buttonLable}</button>
          <button className="cancel_button" onClick={() => setShowModel(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Model
