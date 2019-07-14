import React, { Component } from "react";
import folderStructure from "../folderStructure/folderStructure.json";

class FolderView extends Component {
  state = {
    folderViewArr: []
  };

  componentDidMount = () => {
    this.generateFolderStructure();
  };

  clearFolderView = () => {
     this.setState({ folderViewArr: [] });
  };

  openSubFolder = async subFolderArr => {
    await this.clearFolderView();
    this.generateSubFolderStructure(subFolderArr);
  };

  folderShow = (foldername, subFolderArr) => {
    return (
      <div
        class="folder-item width-140 float-left mdc-elevation--z4"
        onClick={() => this.openSubFolder(subFolderArr)}
      >
        <div class="top-label">
          <div class="label" style={{ backgroundColor: "green" }}>
            APPROVED
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="icon">
                <i class="material-icons">folder</i>
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

  generateSubFolderStructure = async folderStrucArr => {
    let fileArr = [];
    for (let i = 0; i < folderStrucArr.length; i++) {
      let jsx;
      if (folderStrucArr[i].type === "file") {
        //create fileStructureArr and send to CardView for rendering
        fileArr.push([null, folderStrucArr[i].name,  folderStrucArr[i].format, null]);
      } else if (folderStrucArr[i].type === "folder") {
        if (folderStrucArr[i].hasChild) {
          jsx = await this.folderShow(
            folderStrucArr[i].name,
            folderStrucArr[i].subFolder
          );
        } else {
          jsx = await this.folderShow(folderStrucArr[i].name, []);
        }
      }

      this.setState({
        folderViewArr: [...this.state.folderViewArr, jsx]
      });
    }
    
    this.props.reRenderCurrentFiles(fileArr);
  };

  generateFolderStructure = async () => {
    for (let i = 0; i < folderStructure.folders.length; i++) {
      let folders = folderStructure.folders;
      let jsx;
      if (folders[i].hasChild) {
        jsx = await this.folderShow(folders[i].name, folders[i].subFolder);
      } else {
        jsx = await this.folderShow(folders[i].name, []);
      }

      this.setState({
        folderViewArr: [...this.state.folderViewArr, jsx]
      });
    }
  };

  render() {
    return (
      <div className="pl-5 pr-5">
        {/* For folder */}
        <div class="typeSeparator">Folders</div>
        <div class="folder-area float-fix">
          {/* {this.folderShow('Phototgraphy')}
                    {this.folderShow('Video')}
                    {this.folderShow('PDF Docs')}
                    {this.folderShow('My Folder')}
                    {this.folderShow('My Folder')}
                    {this.folderShow('My Folder')}
                    {this.folderShow('My Folder')}
                    {this.folderShow('My Folder')} */}
          {this.state.folderViewArr}
        </div>
      </div>
    );
  }
}

export default FolderView;
