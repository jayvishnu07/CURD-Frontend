import React from 'react'
import '../Css/Component.style/AddTask.css'
const AddTask = () => {
  return (
    <div className='main_container'>
        <div className="form_container">
            <div className="form">
                <input type="text" name='task_title' placeholder='Title' />
                <input type="text" name='task_description' placeholder='Description'/>
                <input type="date" name='due'/>
                <input type="text" name='asigned_by' placeholder='Assigned By'/>
                <input type="text" name='assigned_to' placeholder='Assigned to2'/>
            </div>
            <div className="add-task-plus">
                
            </div>
        </div>

    </div>
  )
}

export default AddTask