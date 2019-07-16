import React, { Component } from "react";
import axios from "axios";

export default class Download extends Component {
  handleDelete = () => {
    let { currentDirId, parentId, selectedItem } = this.props;
    let { fileFormat, name, type } = selectedItem;

    axios
      .get(`/delete/${type}/${name}/${fileFormat}/${currentDirId}/${parentId}`)
      .then(res => {
        if (res.data.success === true) {
          this.props.folderViewComp.openSubFolder(res.data.newDirStruc);
          this.props.updateSnackBarProps(
            "Deleted Successfully!",
            "open",
            "Close"
          );
        } else {
          this.props.updateSnackBarProps(
            "Can not delete! Retry..",
            "open",
            "Close"
          );
        }
        //refresh filefolder view & call snackbar
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <i
        className="demo-menu material-icons mdc-top-app-bar__navigation-icon mr-5"
        onClick={this.handleDelete}
      >
        delete
      </i>
    );
  }
}
