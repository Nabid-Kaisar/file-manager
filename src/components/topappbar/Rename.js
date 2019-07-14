import React, { Component } from "react";
import axios from "axios";
import RenameDialog from "./RenameDialog";

export default class Download extends Component {
  handleRename = renamedItem => {
    this.dialogComp.dialogShowToggle();
  };

  sendRenameReq = renamedItem => {
    let { currentDirId, selectedItem } = this.props;
    axios
      .post("/renameItem", {
        currentDirId,
        selectedItem,
        renamedItem
      })
      .then(res => {
        if (res.data.success === true) {
          this.props.folderViewComp.openSubFolder(res.data.newDirStruc);
          this.props.updateSnackBarProps(
            "Renamed Successfully!",
            "open",
            "Close"
          );
        } else {
          this.props.updateSnackBarProps(
            "Can not Rename! Retry..",
            "open",
            "Close"
          );
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleRename}>Rename</button>
        <RenameDialog
          ref={dia => (this.dialogComp = dia)}
          selectedItem={this.props.selectedItem}
          updateUserInp={this.renameItemViaDialog}
          yesBtnAction={renamedItem => this.sendRenameReq(renamedItem)}
        />
      </React.Fragment>
    );
  }
}
