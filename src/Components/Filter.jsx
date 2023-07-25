import React from 'react'

//libraries
import { Button, Offcanvas } from 'react-bootstrap';

//style sheets
import '../Css/Component.style/Filter.css'


const Filter = ({ children, handleCloseFilter, showFilter, setCurrentPage, handleFilterClick, isDisabled }) => {

  return (
    <Offcanvas className="today_filter_canvas" show={showFilter} onHide={handleCloseFilter} scroll={true} backdrop={false} placement="end" >
      <div style={{ marginTop: "3vh" }} >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <div className="filter_icon_item">
              Filter
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
      </div>
      <Offcanvas.Body className="Offcanvas_body" >
        {children}
        <div className="filter_button"  >
          <Button disabled={isDisabled} style={{ background: "#8D8B8B", border: "none", outline: "none" }} onClick={() => { setCurrentPage(1); handleFilterClick() }}>Filter</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  )
}

export default Filter