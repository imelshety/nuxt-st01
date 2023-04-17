import React from 'react';

const Carduser = (props) => {
  return (
  <>
  <tr>
        <th>{props.id}</th>
        <td>{props.task}</td>
        <td>{props.completed}</td>
   
      </tr>
  </>
  )
}

export default Carduser