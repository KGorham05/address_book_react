import React, { Component } from "react";
import API from "../utils/API";
import DataBody from "./DataBody";

class DataTable extends Component {
  state = {
    users: [],
    filteredUsers: [],
    order: "asc",
  };

  headings = [
    { name: "Image" },
    { name: "Name" },
    { name: "Email" },
    { name: "Phone" },
    { name: "DOB" },
  ];

  componentDidMount() {
    this.getUserData();
  }

  getUserData = () => {
    API.getUsers().then((usersData) => {

      let arr = usersData.map(user => {
        
      })
      this.setState({ 
        users: usersData.data.results.slice(0, 10), 
        filteredUsers:  usersData.data.results.slice(0, 10)
      })
    });
  };

  filterThisColumn = () => {
    // figure out which column we are filtering the data on
    // create a new array to hold sorted data
    // call .sort() on that value to order the array by that key
    const columnToFilterOn = event.target.innerText;
    let filteredUsers = this.state.filteredUsers;
    filteredUsers.sort(this.dynamicSort("gender"));
    console.log(filteredUsers);
    this.setState({filteredUsers: filteredUsers})
  };

  dynamicSort = (property) => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-12">
            <table>
              <thead>
                <tr>
                  {this.headings.map((heading) => {
                    return (
                      <th key={heading.name} onClick={this.filterThisColumn}>
                        {heading.name}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {this.state.filteredUsers.map((user) => {
                  return (
                    <DataBody
                      name={user.name}
                      image={user.picture.thumbnail}
                      email={user.email}
                      phone={user.phone}
                      dob={user.dob.date}
                      key={user.login.uuid}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default DataTable;
