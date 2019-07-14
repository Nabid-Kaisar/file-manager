import React, { Component } from "react";
import axios from "axios";
import { GlobalState } from "../stateProvider/StateProvider";

export default class AddNewFile extends Component {
  state = {
    selectedFile: null,
    currentDirId: "root",
    parentId: null
  };

  handleFileChange = event => {
    this.setState({ selectedFile: event.target.files[0], loaded: 0 }, () => {
      this.handleUpload();
    });
  };

  handleUpload = () => {
    const data = new FormData();
    //this appending prder is important.otherwise multer will not get req.body
    //appending file related info
    console.log(this.state.selectedFile);
    data.append("fileName", this.state.selectedFile.name);
    data.append("fileType", this.state.selectedFile.type);
    data.append("lastModified", this.state.selectedFile.lastModified);
    data.append("size", this.state.selectedFile.size);
    //the folder dir to add file
    data.append("dirToAdd", this.state.currentDirId);
    data.append("parentId", this.state.parentId);
    //appending actual file
    data.append("file", this.state.selectedFile);

    axios
      .post("/upload", data, {})
      .then(res => {
        //refresh folder view
        this.props.folderViewComp.openSubFolder(res.data.newDirStruc);
        // show snackbar confiramation
        this.props.updateSnackBarProps(
          "New File Created Successfully!",
          "open",
          "close"
        );
        //clearing selected file
        document.getElementById("upload-file").value = "";
      })
      .catch(err => {
        console.log(err);
        this.props.updateSnackBarProps(`Can't create File!`, "open", "retry");
      });
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      if (this.props.currentDirId !== null) {
        this.setState({ currentDirId: this.props.currentDirId });
        this.setState({ parentId: this.props.parentId });
      }
    }
  };

  render() {
    return (
      <div>
        <input
          id="upload-file"
          name="file1"
          type="file"
          onChange={this.handleFileChange}
        />
        {/* <button onClick={this.handleUpload}>Upload</button> */}
      </div>
    );
  }
}

AddNewFile.contextType = GlobalState;
