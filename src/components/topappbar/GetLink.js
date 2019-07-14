import React, { Component } from "react";
import GetLinkDialog from "./GetLinkDialog";

export default class GetLink extends Component {
  handleGetLink = () => {
    //open the dialog box
    this.getLinkDialogComp.dialogShowToggle();
  };

  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleGetLink}>Get Link</button>
        <GetLinkDialog
          ref={dia => (this.getLinkDialogComp = dia)}
          fileInfo={this.props}
          updateSnackBarProps={this.props.updateSnackBarProps}
        />
      </React.Fragment>
    );
  }
}
