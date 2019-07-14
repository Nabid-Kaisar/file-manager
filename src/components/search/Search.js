import React, { Component } from "react";
import axios from "axios";

class Search extends Component {
  state = {
    showSearch: false
  };

  toggleShowHideSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  handleChangeName = e => {
    axios
      .post("/search-item", {
        searchStr: e.target.value,
        dirToSearch: this.props.currentDirId,
        parentId: this.props.parentId,
        searchType: "name"
      })
      .then(res => {
        this.props.folderViewComp.openSubFolder(res.data.filteredDirStruc);
      })
      .catch(err => console.log(err));
  };

  handleChangeType = e => {
    axios
      .post("/search-item", {
        searchStr: e.target.value,
        dirToSearch: this.props.currentDirId,
        parentId: this.props.parentId,
        searchType: "type"
      })
      .then(res => {
        this.props.folderViewComp.openSubFolder(res.data.filteredDirStruc);
      })
      .catch(err => console.log(err));
  };

  render() {
    if (this.state.showSearch) {
      return (
        <div className="search-wrapper">
          <div className="search-header float-fix width-100">
            <div className="search-type float-left">
              <ul className="">
                <li>Name</li>
                <li>Type</li>
              </ul>
            </div>
            <div className="search-close float-right">
              <ul className="">
                <li className="search-btn">
                  <i className="material-icons"> search </i>
                  <span>Search</span>
                </li>
                <li onClick={this.toggleShowHideSearch} className="close">
                  &#10006;
                </li>
              </ul>
            </div>
          </div>
          <div className="search-input">
            <div className="input-name width-100">
              <label htmlFor="name">Name: </label>
              <input
                onChange={this.handleChangeName}
                className="mt-10 mb-10"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="input-type">
              <label htmlFor="name">Type: </label>
              <input
                className="mt-10 mb-10"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChangeType}
              />
              <datalist id="browsers">
                <option value="- Any type -" />
                <option value="Audio" />
                <option value="Documents" />
                <option value="Photos" />
                <option value="Video" />
              </datalist>
            </div>
          </div>
        </div>
      );
    } else return null;
  }
}

export default Search;
