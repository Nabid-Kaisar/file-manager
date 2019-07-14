import React, { Component } from "react";
import axios from "axios";

class Sort extends Component {
  buttonAction = {
    sortByNameAscend: () =>
      this.sortRequest("sortByNameAscend", "Name (Ascending order)"),
    sortByNameDescend: () =>
      this.sortRequest("sortByNameDescend", "Name (Descending order)"),
    sortBySizeAscend: () =>
      this.sortRequest("sortBySizeAscend", "Size (Ascending order)"),
    sortBySizeDescend: () =>
      this.sortRequest("sortBySizeDescend", "Size (Descending order)"),
    sortByDateAscend: () =>
      this.sortRequest("sortByDateAscend", "Date Modified (Ascending order)"),
    sortByDateDescend: () =>
      this.sortRequest("sortByDateDescend", "Date Modified (Descending order)")
  };

  sort = e => {
    this.buttonAction[e.target.name]();
  };

  sortRequest = (sortType, snackBarNotification) => {
    axios
      .post("/sort-dir", {
        sortType: sortType,
        dirToSort: this.props.currentDirId,
        parentId: this.props.parentId
      })
      .then(res => {
        //open subFolder with server response as arg
        this.props.folderViewComp.openSubFolder(res.data.sortedDirStruc);
        
        this.props.updateSnackBarProps(
          `Sorted by ${snackBarNotification}`,
          "open",
          "close"
        );
      })
      .catch(err => console.log(err));
  };

  sortButton = (buttonName, sortOrder) => {
    return (
      <button name={buttonName} onClick={this.sort}>
        {sortOrder === "ascend" ? (
          <React.Fragment>&#8593;</React.Fragment>
        ) : (
          <React.Fragment>&#8595;</React.Fragment>
        )}
      </button>
    );
  };

  render() {
    return (
      <React.Fragment>
        <span> &nbsp;Sort by- </span>

        <span>Name:</span>
        {this.sortButton("sortByNameAscend", "ascend")}
        {this.sortButton("sortByNameDescend", "descend")}

        <span>Size:</span>
        {this.sortButton("sortBySizeAscend", "ascend")}
        {this.sortButton("sortBySizeDescend", "descend")}

        <span>Modified:</span>
        {this.sortButton("sortByDateAscend", "ascend")}
        {this.sortButton("sortByDateDescend", "descend")}
      </React.Fragment>
    );
  }
}

export default Sort;
