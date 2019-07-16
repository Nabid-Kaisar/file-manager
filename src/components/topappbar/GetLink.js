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
        <i
          onClick={this.handleGetLink}
          className="demo-menu material-icons mdc-top-app-bar__navigation-icon mr-5"
        >
          link
        </i>
        <GetLinkDialog
          ref={dia => (this.getLinkDialogComp = dia)}
          fileInfo={this.props}
          updateSnackBarProps={this.props.updateSnackBarProps}
        />
      </React.Fragment>
    );
  }
}
