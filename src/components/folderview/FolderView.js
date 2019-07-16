import React, { Component } from "react";
import Buttons from "./Buttons";
import axios from "axios";

import { GlobalState } from "../stateProvider/StateProvider";

class FolderView extends Component {
  state = {
    folderViewArr: [],
    currentDirId: "root",
    parentId: null
  };

  componentDidMount = () => {
    this.refreshFolderStructure();
  };

  refreshFolderStructure = async () => {
    let folderStructure = await this.context.getFolderStructure();
    this.generateFolderStructure(folderStructure);
  };

  clearFolderView = () => {
    this.setState({ folderViewArr: [] });
  };

  getFolderMetaData = folderName => {
    let { currentDirId, parentId } = this.state;
    axios
      .post("/getFolderMetaData", {
        currentDirId,
        parentId,
        name: folderName
      })
      .then(res => {
        let { totalFolderSize, created, lastModified } = res.data;
        this.context.updateClickedFileInfo(
          folderName,
          "Folder",
          totalFolderSize,
          created,
          lastModified
        );
      })
      .catch(err => console.error(err));
  };

  openSubFolder = async subFolderObj => {
    await this.clearFolderView();
    this.props.updateSnackBarProps("", "close", "close");

    this.setState({ currentDirId: subFolderObj.id });
    this.setState({ parentId: subFolderObj.parentId });
    this.props.updateCurrentAndParentDirId(
      subFolderObj.id,
      subFolderObj.parentId
    );
    this.generateSubFolderStructure(subFolderObj);
  };

  handleSelectItem = folderName => {
    let selectedItem = { type: "folder", name: folderName };
    this.props.updateSelectedItem(selectedItem);
  };

  clickTimeout = null;

  handleClicks = (subFolderObj, foldername) => {
    this.handleSelectItem(foldername);
    if (this.clickTimeout !== null) {
      //double click functions here..
      this.openSubFolder(subFolderObj);
      clearTimeout(this.clickTimeout);
      this.clickTimeout = null;
    } else {
      //single click functions here..
      this.clickTimeout = setTimeout(() => {
        this.getFolderMetaData(foldername);
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
      }, 500);
    }
  };

  folderShow = (foldername, subFolderObj, idx) => {
    return (
      <div
        className="folder-item width-140 float-left mdc-elevation--z4"
        onClick={() => this.handleClicks(subFolderObj, foldername)}
        key={idx}
      >
        {/* <div className="top-label">
          <div className="label" style={{ backgroundColor: "green" }}>
            APPROVED
          </div>
        </div> */}
        <table>
          <tbody>
            <tr>
              <td className="icon">
                <i className="material-icons">folder</i>
              </td>
              <td className="filename">
                <div
                  className="name-wrapper"
                  data-toggle="tooltip"
                  title={foldername}
                >
                  <span>{foldername}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  generateFolderView = async folderStrucArr => {
    for (let i = 0; i < folderStrucArr.folders.length; i++) {
      let jsx;
      jsx = await this.folderShow(
        folderStrucArr.folders[i].name,
        folderStrucArr.folders[i].subFolder,
        i
      );

      this.setState({
        folderViewArr: [...this.state.folderViewArr, jsx]
      });
    }
  };

  generateFileView = folderStrucArr => {
    let fileArr = [];
    if (folderStrucArr.length !== 0) {
      //checking if not empty folder
      for (let i = 0; i < folderStrucArr.files.length; i++) {
        fileArr.push([
          null,
          folderStrucArr.files[i].name,
          folderStrucArr.files[i].format,
          null
        ]);
      }
    }
    this.props.reRenderCurrentFiles(fileArr);
  };

  generateSubFolderStructure = async folderStrucArr => {
    await this.generateFolderView(folderStrucArr);
    await this.generateFileView(folderStrucArr);
  };

  generateFolderStructure = async folderStructure => {
    // console.log(folderStructure);
    for (let i = 0; i < folderStructure.folders.length; i++) {
      let folders = folderStructure.folders;
      let jsx = await this.folderShow(folders[i].name, folders[i].subFolder, i);

      this.setState({
        folderViewArr: [...this.state.folderViewArr, jsx]
      });
    }
  };

  render() {
    return (
      <div className="pl-5 pr-5">
        <Buttons
          ref={navB => (this.navButtons = navB)}
          currentDirId={this.state.currentDirId}
          parentId={this.state.parentId}
          openSubFolder={this.openSubFolder}
          generateSubFolderStructure={this.generateSubFolderStructure}
          updateSnackBarProps={this.props.updateSnackBarProps}
        />

        <div className="typeSeparator">Folders</div>
        <div className="folder-area float-fix">{this.state.folderViewArr}</div>
      </div>
    );
  }
}

FolderView.contextType = GlobalState;

export default FolderView;
