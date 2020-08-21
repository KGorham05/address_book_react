import React, { Component } from 'react';
import API from "../utils/API";
import DataBody from "./DataBody";


class DataTable extends Component {

  state = {
    users: [],
    filteredUsers: [],
    order: "descend"
  };

  headings = [
    {name: "Image"},
    {name: "Name"},
    {name: "Email"},
    {name: "Phone"},
    {name: "DOB"}
  ];
  
  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    API.getUsers().then(usersData => this.setState({users: usersData.data.results}, () => console.log(this.state.users)))
  }
  
  render() {
    return (
      <table>
        <thead>
          <tr>
            {this.headings.map(heading => {
              console.log(heading);
              return <th>{heading.name}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {this.state.users.map(user => {
            return <DataBody 
              name = {user.name}
              image = {user.picture.thumbnail}
              email = {user.email}
              phone = {user.phone}
              dob = {user.dob.date}
            />
          })}
        </tbody>
      </table>
    )
  }

}

export default DataTable;