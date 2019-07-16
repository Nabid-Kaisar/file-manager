import React, { Component } from "react";
import { GlobalState } from "../stateProvider/StateProvider";

export default class Buttons extends Component {
  state = {
    forwardDirs: []
  };

  setRootDirMsg = () => {
    this.props.updateSnackBarProps(
      "Already on the root of the folderStructure",
      "open",
      "close"
    );
  };

  renderDir = async id => {
    let folderStructure = await this.context.getFolderStructure();
    if (id !== null) {
      this.props.updateSnackBarProps("", "close", "close");
      if (id === "root") {
        this.props.openSubFolder(folderStructure); //render root dir
      } else {
        let dirPathArr = id.split("-");
        let dirPath = folderStructure;

        while (dirPathArr.length !== 0) {
          let singleDir = Number(dirPathArr.shift());
          dirPath = dirPath.folders[singleDir].subFolder;
        }
        this.props.openSubFolder(dirPath);
      }
    } else {
      this.setRootDirMsg();
    }
  };

  handleBack = async () => {
    if (this.props.currentDirId !== "root") {
      await this.setState({
        forwardDirs: [...this.state.forwardDirs, this.props.currentDirId]
      });
    }
    // this.props.updateSnackBarProps("", "close", "close");
    this.renderDir(this.props.parentId);
    //parentId contains the path to the parent directory.
  };

  handleForward = () => {
    // this.props.updateSnackBarProps("", "close", "close");
    let forwardDirs = [...this.state.forwardDirs];
    let forwardId = forwardDirs.pop();
    if (forwardId) {
      this.setState({ forwardDirs });
      this.renderDir(forwardId);
    }
  };

  render() {
    return (
      <React.Fragment>
        <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
          <i
            onClick={this.handleBack}
            className="demo-menu material-icons md-18 mdc-top-app-bar__navigation-icon mr-5"
          >
            arrow_back
          </i>
          <i
            onClick={this.handleForward}
            className="demo-menu material-icons mdc-top-app-bar__navigation-icon mr-5"
          >
            arrow_forward
          </i>
        </section>
      </React.Fragment>
    );
  }
}

Buttons.contextType = GlobalState;
