import React, { Component } from "react";
// import folderStructure from "../folderStructure/folderStructure.json";

import { GlobalState } from "../stateProvider/StateProvider";

export default class AddNewFolder extends Component {
  state = {
    currentDirId: "root",
    parentId: null
  };

  //add new folder to json tree structure
  // calling this method inside dialog component yes button click
  folderAdd = async folderName => {
    if (this.props.newFolderName !== "") {
      this.addNewFolder(
        this.props.newFolderName,
        this.state.currentDirId,
        this.state.parentId
      );
    }
  };

  addNewFolder = (folderName, dirToAdd, parentId) => {
    fetch("/addNewFolder", {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        folderName: folderName,
        dirToAdd: dirToAdd,
        parentId: parentId
      }),
      method: "POST"
    })
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        if (resJson.success) {
          this.props.folderViewComp.openSubFolder(resJson.newDirStruc);
          //open SUBFOLDER with resJson.newDirStruc
          //snackbar success notification here...
          this.props.updateSnackBarProps(
            "New Folder Created Successfully!",
            "open",
            "Close"
          );
        } else {
          this.props.updateSnackBarProps(
            `Can't create Folder!`,
            "open",
            "retry"
          );
        }
      })
      .catch(err => {
        console.log(err);
        this.props.updateSnackBarProps(`Can't create Folder!`, "open", "retry");
      });
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      if (this.props.currentDirId !== null && this.props.newFolderName !== "") {
        this.setState({ currentDirId: this.props.currentDirId });
        this.setState({ parentId: this.props.parentId }, () => {
          // this.folderAdd();
        });
      }
    }
  };

  render() {
    return <React.Fragment />;
  }
}

AddNewFolder.contextType = GlobalState;
