import React, { Component } from "react";
import API from "../utils/API";
import DataBody from "./DataBody";

// TO DO -> when sorting, check this.state.order. If "asc" do nothing, if "desc" add "-" to property we are filtering on

class DataTable extends Component {
  state = {
    users: [],
    filteredUsers: [],
    filterText: '',
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
      usersData.data.results.slice(0, 10).map(userObj => {
        console.log(userObj);
        userObj.lastName = userObj.name.last;
        userObj.age = userObj.dob.age.toString();
      })
      this.setState({
        users: usersData.data.results.slice(0, 10),
        filteredUsers: usersData.data.results.slice(0, 10),
      });
    });
  };

  dynamicSort = (property) => {
    var sortOrder = 1;

    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }

    return function (a, b) {
      console.log(a)
      console.log(b)
      if (sortOrder == -1) {
        return b[property].localeCompare(a[property]);
      } else {
        return a[property].localeCompare(b[property]);
      }
    };
  };

  filterThisColumn = e => {
    // figure out which column we are filtering the data on
    // create a new array to hold sorted data
    // call .sort() on that value to order the array by that key
    const columnToFilterOn = e.target.innerText;
    let filteredUsers = this.state.filteredUsers;
    let sortOrder = this.state.order;
    let keyBeingFilteredOn = ""

    switch (columnToFilterOn) {
      case "Name":
        if (this.state.order = "desc") {
          keyBeingFilteredOn = "-" + keyBeingFilteredOn;
          filteredUsers.sort(this.dynamicSort("lastName"))
          this.setState({order: "asc"})
        } else {
          filteredUsers.sort(this.dynamicSort("-lastName"))
          this.setState({order: "desc"})
        }
        break;
      case "Email":
        filteredUsers.sort(this.dynamicSort("email"));
        break;
      case "Phone":
        filteredUsers.sort(this.dynamicSort("phone"));
        break;
      case "DOB":
        filteredUsers.sort(this.dynamicSort("age"));
        break;
      case "Image":
        filteredUsers.sort(this.dynamicSort("gender"));
        break;
    }

    this.setState({ filteredUsers: filteredUsers });
  };

  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText
    });
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
