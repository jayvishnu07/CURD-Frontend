import React from 'react'

const TableInput = ({ data, editMode, children }) => {
  return (
    <tr>
      <th className='first_child' >
        {children[0]}{children[1]}
      </th>
      <td id='colon' >:</td>
      <td className='third_child' >
        {
          editMode
            ?
            <>
              {children[2]}
            </>
            :
            data
        }
      </td>
    </tr>
  )
}

export default TableInput;