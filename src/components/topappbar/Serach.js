import React, { Component } from "react";
import axios from "axios";

export default class Serach extends Component {
    handleChangeName = (e) => {
        axios.post("/search-item",{
            searchStr: e.target.value,
            dirToSearch: this.props.currentDirId,
            parentId: this.props.parentId,
            searchType: "name"
        }).then(res=> {
            this.props.folderViewComp.openSubFolder(res.data.filteredDirStruc);
        })
        .catch(err=> console.log(err))
    }

    handleChangeType = (e) => {
        axios.post("/search-item",{
            searchStr: e.target.value,
            dirToSearch: this.props.currentDirId,
            parentId: this.props.parentId,
            searchType: "type"
        }).then(res=> {
            this.props.folderViewComp.openSubFolder(res.data.filteredDirStruc);
        })
        .catch(err=> console.log(err))
    }


  render() {
    return (
      <React.Fragment>
        <label>
          name: <input type="text" onChange ={this.handleChangeName} />
        </label>
        <label>
          type:
          <input type="text" onChange ={this.handleChangeType} />
        </label>
      </React.Fragment>
    );
  }
}
