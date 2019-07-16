import React, { Component } from "react";
import axios from "axios";

import photo from "../../images/image-icon.png";
import audio from "../../images/audio-icon.png";
import text from "../../images/text-icon.svg";
import video from "../../images/video-icon.png";
import pdf from "../../images/pdf-icon.svg";
import otherFile from "../../images/other-file.svg";

import { GlobalState } from "../stateProvider/StateProvider";

class CardView extends Component {
  state = {
    fileViewArr: []
  };

  componentDidMount = async () => {
    let folderStructure = await this.context.getFolderStructure();
    this.generateFileStructure(folderStructure);
  };

  getMetaDataReq = (fileName, fileFormat) => {
    axios
      .post("/getFileMetaData", {
        fileName: fileName,
        fileType: fileFormat,
        dirId: this.props.currentDirId
      })
      .then(res => {
        let fileMeta = res.data.fileMeta;
        if (res.data.dim) {
          this.context.updateClickedFileInfo(
            fileName,
            fileFormat,
            fileMeta.size,
            fileMeta.created,
            fileMeta.lastModified,
            res.data.dim.width,
            res.data.dim.height
          );
        } else {
          this.context.updateClickedFileInfo(
            fileName,
            fileFormat,
            fileMeta.size,
            fileMeta.created,
            fileMeta.lastModified
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleSelectItem = (fileName, fileFormat) => {
    let selectedItem = { type: "file", name: fileName, fileFormat: fileFormat };
    this.props.updateSelectedItem(selectedItem);
  };

  handleFileClick = (e, fileName, fileFormat) => {
    this.handleSelectItem(fileName, fileFormat);
    if (e.button === 0) {
      //handle left click options(render rightsidebar)
      this.getMetaDataReq(fileName, fileFormat);
    } else if (e.button === 2) {
      //handle right click options
    }
  };

  handleDoubleClick = (e, fileName, fileFormat) => {
    let fileNameInStorage = `${this.props.currentDirId}:${fileName}`;
    switch (fileFormat.split("/")[0]) {
      case "image":
        this.showImg.src = `/serveImg/${fileNameInStorage}`;
        break;

      case "video":
        this.showVid.src = `/serveVid/${fileNameInStorage}`;
        break;

      case "audio":
        this.showAud.src = `/serveAud/${fileNameInStorage}`;
        break;

      case "application":
        if (fileFormat.split("/")[1] === "pdf") {
          this.showObj.data = `/servePdf/${fileNameInStorage}`;
        }
        break;
      default:
    }
  };

  cardView = (bgimage, fileName, fileFormat, icon, idx) => {
    if (!bgimage) {
      switch (fileFormat.split("/")[0]) {
        case "image":
          bgimage = photo;
          break;
        case "video":
          bgimage = video;
          break;
        case "audio":
          bgimage = audio;
          break;
        case "text":
          bgimage = text;
          break;
        case "application":
          if (fileFormat.split("/")[1] === "pdf") {
            bgimage = pdf;
          } else {
            bgimage = otherFile;
          }
          break;
        default:
          bgimage = otherFile;
      }
    }
    return (
      <div
        className="card-item width-140 float-left mdc-elevation--z3"
        onDoubleClick={e => this.handleDoubleClick(e, fileName, fileFormat)}
        onMouseDown={e => this.handleFileClick(e, fileName, fileFormat)}
        key={idx}
      >
        {/* <div className="top-label">
          <div className="label" style={{ backgroundColor: "green" }}>
            APPROVED
          </div>
        </div> */}
        <div
          className="card-image"
          style={{ backgroundImage: "url(" + bgimage + ")" }}
        />
        <div className="card-title">
          <div className="card-name" data-toggle="tooltip" title={fileName}>
            {fileName}
            <span>{fileFormat}</span>
          </div>
          <div className="card-icon">
            <i className="material-icons ml-10">{icon}</i>
          </div>
        </div>
      </div>
    );
  };

  clearCurrentFiles = () => {
    this.setState({ fileViewArr: [] });
  };

  componentDidUpdate = prevProps => {
    if (this.props.currentFiles !== prevProps.currentFiles) {
      this.generateFileInsideFolderStructure();
    }
  };

  generateFileInsideFolderStructure = async () => {
    await this.clearCurrentFiles();
    // console.log(this.props.currentFiles);
    let currentFiles = this.props.currentFiles;

    for (let i = 0; i < currentFiles.length; i++) {
      let jsx = await this.cardView(
        currentFiles[i][0], //bgimg null for now
        currentFiles[i][1], //name
        currentFiles[i][2], //format
        currentFiles[i][3], //icon null for now
        i
      );

      this.setState({
        fileViewArr: [...this.state.fileViewArr, jsx]
      });
    }
  };

  generateFileStructure = async folderStructure => {
    for (let i = 0; i < folderStructure.files.length; i++) {
      let jsx = await this.cardView(
        null,
        folderStructure.files[i].name,
        folderStructure.files[i].format,
        null,
        i
      );

      this.setState({
        fileViewArr: [...this.state.fileViewArr, jsx]
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        {/* For Image Card */}
        <div className="typeSeparator">Files</div>
        <div className="card-area float-fix">{this.state.fileViewArr}</div>

        <video
          ref={vid => (this.showVid = vid)}
          id="videoPlayer"
          controls
          autoPlay
        />
        <audio
          ref={aud => (this.showAud = aud)}
          id="audioPlayer"
          controls
          autoPlay
        />
        <br />
        <object
          type="application/pdf"
          ref={obj => (this.showObj = obj)}
          width="800"
          height="400"
        >
          PDF..
        </object>
        <br />
        <img
          ref={img => (this.showImg = img)}
          alt="Server response loading.."
        />
      </React.Fragment>
    );
  }
}

//defining contextType will allow to access GlobalState context valuess
CardView.contextType = GlobalState;

export default CardView;
