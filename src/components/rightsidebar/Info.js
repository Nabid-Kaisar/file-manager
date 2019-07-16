import React, { Component } from "react";

import { GlobalState } from "../stateProvider/StateProvider";

class Info extends Component {
  state = {
    finalheight: 0
  };

  componentDidMount() {
    var titlesecheight = document.getElementById("side-headerId").offsetHeight;
    var tagsecheight = document.getElementById("tag-sectionId").offsetHeight;

    var finalheight = 110 + titlesecheight + tagsecheight;

    this.setState({
      finalheight
    });
  }

  convertTimeMilliToDate = timeMilli => {
    if (timeMilli === "") return "";
    let d = new Date(timeMilli).toString();
    return d;
  };

  convertByteSize = size => {
    if (size === "") {
      return "";
    } else if (size < 1000) {
      return size + "Bytes";
    } else if (size > 1000 && size < 1000000) {
      return size / 1000 + " Kb";
    } else if (size > 1000000) {
      return size / 1000000 + " Mb";
    }
  };

  render() {
    let created = this.convertTimeMilliToDate(
      this.context.state.clickedCreated
    );
    let lastModified = this.convertTimeMilliToDate(
      this.context.state.clickedLastModified
    );
    let size = this.convertByteSize(this.context.state.clickedFileSize);
    let hrefLink = '#';
    return (
      <React.Fragment>
        <div className="header-body-container">
          <div id="info-content">
            <div className="side-header" id="side-headerId">
              <div className="title">
                <div className="icon">
                  <i className="material-icons">folder</i>
                </div>
                <div className="filename">
                  {this.context.state.clickedFileName}
                  {/* <span>.{this.context.state.clickedFileFormat}</span> */}
                </div>
              </div>
            </div>
            <div
              className="side-body"
              style={{
                height: "calc(100vh - " + this.state.finalheight + "px)"
              }}
            >
              <div className="file-info">
                <table className="width-100">
                  <caption>
                    <img
                      // src="https://demo.filerun.co/t.php?p=%2FROOT%2FHOME%2Fphoto%2D21%2Ejpeg&s=394781&t=1456164000"
                      alt=""
                    />
                  </caption>
                  <tbody>
                    <tr>
                      <td className="name">Type</td>
                      <td className="value">
                        {this.context.state.clickedFileFormat}
                      </td>
                    </tr>

                    <tr>
                      <td className="name">Size</td>
                      <td className="value">{size}</td>
                    </tr>

                    <tr>
                      <td className="name">Modified</td>
                      <td className="value">{lastModified}</td>
                    </tr>

                    <tr>
                      <td className="name">Uploaded</td>
                      <td className="value">{created}</td>
                    </tr>

                    <tr>
                      <td className="name">Rating</td>
                      <td className="value">
                        <ul>
                          <li className="material-icons">star_rate</li>
                          <li className="material-icons">star_rate</li>
                          <li className="material-icons">star_rate</li>
                          <li className="material-icons">star_rate</li>
                          <li className="material-icons">star_rate</li>
                        </ul>
                      </td>
                    </tr>

                    <tr>
                      <td className="name">Properties</td>
                      <td className="value properties">
                        <a href={hrefLink}>
                          <i className="material-icons"> edit </i>
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td className="name">Width</td>
                      <td className="value">
                        <a href={hrefLink}>{this.context.state.clickedWidth}</a>
                      </td>
                    </tr>

                    <tr>
                      <td className="name">Height</td>
                      <td className="value">
                        <a href={hrefLink}>{this.context.state.clickedHeight}</a>
                      </td>
                    </tr>

                    <tr>
                      <td className="name">Date Uploaded</td>
                      <td className="value">
                        <a href={hrefLink}>{created}</a>
                      </td>
                    </tr>

                    <tr>
                      <td className="name">Copyright</td>
                      <td className="value">
                        <a href={hrefLink}></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tag-section" id="tag-sectionId">
              <div className="tags">
                <ul className="tag-lists">
                  <li>
                    mos<span className="tag-item-close">&#10006;</span>
                  </li>
                  <li>
                    mos<span className="tag-item-close">&#10006;</span>
                  </li>
                  <li>
                    mos<span className="tag-item-close">&#10006;</span>
                  </li>
                  <li>
                    newyork<span className="tag-item-close">&#10006;</span>
                  </li>
                  <li>
                    <input
                      type="text"
                      name="text"
                      id="text"
                      placeholder="Add tags.."
                    />
                  </li>
                </ul>
                <div className="tag-button">
                  <ul>
                    <li className="material-icons">save</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

Info.contextType = GlobalState;
export default Info;
