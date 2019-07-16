import React, { Component } from "react";

import packageJson from "../../../package.json";

export default class Download extends Component {
  handleDownload = () => {
    let proxy = packageJson.proxy;
    let { currentDirId, selectedItem } = this.props;
    let { fileFormat, name, type } = selectedItem;
    window.open(
      `${proxy}/download/${type}/${name}/${fileFormat}/${currentDirId}`
    );
  };

  render() {
    return (
      <i className="demo-menu material-icons mdc-top-app-bar__navigation-icon mr-5" onClick={this.handleDownload} >
        cloud_download
      </i>
    );
  }
}
