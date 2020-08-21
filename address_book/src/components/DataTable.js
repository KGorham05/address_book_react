import React, { Component } from 'react';
import API from "../utils/API";
// import DataHeaders from "./DataHeaders";
// import DataBody from "./DataBody";


class DataTable extends Component {

  state = {
    users: [],
    filteredUsers: [],
    order: "descend"
  };
  
  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    API.getUsers().then(usersData => this.setState({users: usersData}, () => {
      console.log(this.state.users)
    }))
  }
  
  render() {
    return (
      <>
        {/* Map over User Keys for Table Headtings */}
        {/* <DataBody /> */}
        <h1>Data goes here</h1>
      </>
    )
  }

}

export default DataTable;