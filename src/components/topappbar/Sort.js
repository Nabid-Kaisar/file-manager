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
    console.log(e.target.id);
    this.buttonAction[e.target.id]();
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
      <React.Fragment>
        {sortOrder === "ascend" ? (
          <i
            id={buttonName}
            onClick={this.sort}
            className="demo-menu material-icons md-13 mr-5"
          >
            arrow_upward
          </i>
        ) : (
          <i
            id={buttonName}
            onClick={this.sort}
            className="demo-menu material-icons md-13 mr-5"
          >
            arrow_downward
          </i>
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <i className="material-icons mr-5">sort</i>
        <span className="mr-5">
          <span className="sort-criteria">name: </span>
          {this.sortButton("sortByNameAscend", "ascend")}
          {this.sortButton("sortByNameDescend", "descend")}
        </span>

        <span className="mr-5">
          <span className="sort-criteria">size: </span>
          {this.sortButton("sortBySizeAscend", "ascend")}
          {this.sortButton("sortBySizeDescend", "descend")}
        </span>

        <span className="mr-5">
          <span className="sort-criteria">modified: </span>
          {this.sortButton("sortByDateAscend", "ascend")}
          {this.sortButton("sortByDateDescend", "descend")}
        </span>
      </React.Fragment>
    );
  }
}

export default Sort;
