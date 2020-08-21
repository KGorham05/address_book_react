import React from "react";

function DataBody(props) {
    return (
      <tr> 
        <td><img src={props.image}/></td>
        <td>{props.name.first} {props.name.last}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td>{props.dob}</td>
      </tr>
    );
  
};


export default DataBody;