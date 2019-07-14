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
    return <button onClick={this.handleDownload}>Download</button>;
  }
}
