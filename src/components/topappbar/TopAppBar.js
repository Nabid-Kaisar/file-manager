import React, { Component } from "react";
import Dialog from "../dialog/Dialog";

// import { MDCChipSet } from "@material/chips";
import AddNewFolder from "./AddNewFolder";
import AddNewFile from "./AddNewFile";
import Sort from "./Sort";
import Download from "./Download";
import GetLink from "./GetLink";
import Delete from "./Delete";
import Rename from "./Rename";

class TopAppBar extends Component {
  state = {
    show: false,
    newFolderName: ""
  };

  componentDidMount() {
    //topbar create button toogle menu hide
    let x = document.querySelector(".body-class");
    x.addEventListener("click", this.hideUser, false);

    // setup for top chips
    // const chipSetEl = document.querySelector(".mdc-chip-set");
    // const chipSet = new MDCChipSet(chipSetEl);
  }

  onClassChange = () => {
    this.setState({
      show: !this.state.show
    });
  };

  hideUser = () => {
    this.setState({
      show: false
    });
  };

  toggleDialogShow = () => {
    this.dialogComp.dialogShowToggle();
  };

  updateNewFolderName = name => {
    this.setState({ newFolderName: name });
  };

  toogleSearchBar = () => {
    this.props.searchComp.toggleShowHideSearch();
  };

  render() {
    let createbuttonToggle = this.state.show === true ? "" : "d-none";
    let hrefLink = "#";
    return (
      <header
        className="mdc-top-app-bar mdc-top-app-bar--fixed app-bar mdc-elevation--z4 custom-top-app-bar"
        id="app-bar"
      >
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            {/* <a href="#" class="demo-menu material-icons mdc-top-app-bar__navigation-icon">menu</a> */}
            <span className="mdc-top-app-bar__title">
              <img
                src="https://demo.filerun.co/your-logo-here-top.png"
                alt=""
              />
            </span>
            <div className="create-file-button-area">
              <div className="mdc-chip-set">
                <div
                  id="toggleButton"
                  className="mdc-chip mdc-elevation--z2 custom-top-chips"
                  onClick={this.onClassChange}
                >
                  <i className="material-icons mdc-chip__icon mdc-chip__icon--leading">
                    add
                  </i>
                  <div className="mdc-chip__text">New</div>
                </div>
              </div>

              <div
                className={
                  "appbar-submenu-area mdc-elevation--z10 " + createbuttonToggle
                }
              >
                <ul>
                  <li onClick={this.toggleDialogShow}>
                    <a href={hrefLink}>
                      <span className="material-icons topbar-submenu-icon">
                        cloud_upload
                      </span>
                      <span>Folder</span>
                    </a>
                  </li>
                  <li>
                    <a href={hrefLink}>
                      <span className="material-icons topbar-submenu-icon">
                        folder
                      </span>
                      <span>File request</span>
                    </a>
                  </li>
                  <li>
                    <AddNewFile
                      ref={newFile => (this.addNewFileComp = newFile)}
                      currentDirId={this.props.currentDirId}
                      parentId={this.props.parentId}
                      folderViewComp={this.props.folderViewComp}
                      updateSnackBarProps={this.props.updateSnackBarProps}
                    />
                  </li>
                  <li className="mdc-list-divider" role="separator" />
                  <li>
                    <a href={hrefLink}>
                      <span className="material-icons topbar-submenu-icon">
                        folder
                      </span>
                      <span>File upload</span>
                    </a>
                  </li>
                  <li className="submenu">
                    <a href={hrefLink}>
                      <span className="material-icons topbar-submenu-icon">
                        folder
                      </span>
                      <span>text file</span>
                      <span className="material-icons topbar-submenu-icon submenu-child">
                        chevron_right
                      </span>
                    </a>
                    <ul className="mdc-elevation--z10">
                      <li>
                        <a href={hrefLink}>
                          <span className="material-icons topbar-submenu-icon">
                            folder
                          </span>
                          <span>text file</span>
                        </a>
                      </li>
                      <li>
                        <a href={hrefLink}>
                          <span className="material-icons topbar-submenu-icon">
                            folder
                          </span>
                          <span>text file</span>
                        </a>
                      </li>
                      <li>
                        <a href={hrefLink}>
                          <span className="material-icons topbar-submenu-icon">
                            folder
                          </span>
                          <span>text file</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <button
              className="demo-menu material-icons mdc-top-app-bar__navigation-icon"
              aria-label="Print this page"
              onClick={this.toogleSearchBar}
            >
              search
            </button>
            {/* <Search
              currentDirId={this.props.currentDirId}
              parentId={this.props.parentId}
              folderViewComp={this.props.folderViewComp}
            /> */}
            <Sort
              currentDirId={this.props.currentDirId}
              parentId={this.props.parentId}
              folderViewComp={this.props.folderViewComp}
              updateSnackBarProps={this.props.updateSnackBarProps}
            />
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
            <Download
              currentDirId={this.props.currentDirId}
              selectedItem={this.props.selectedItem}
            />
            <Rename 
              currentDirId={this.props.currentDirId}
              selectedItem={this.props.selectedItem}
              folderViewComp={this.props.folderViewComp}
              updateSnackBarProps={this.props.updateSnackBarProps}
            />
            <GetLink
              currentDirId={this.props.currentDirId}
              selectedItem={this.props.selectedItem}
              updateSnackBarProps={this.props.updateSnackBarProps}
            />
            <Delete
              currentDirId={this.props.currentDirId}
              parentId={this.props.parentId}
              selectedItem={this.props.selectedItem}
              folderViewComp={this.props.folderViewComp}
              updateSnackBarProps={this.props.updateSnackBarProps}
            />
            {/* <button
              className="demo-menu material-icons mdc-top-app-bar__navigation-icon"
              aria-label="Print this page"
            >
              more_vert
            </button> */}
            <button
              className="demo-menu material-icons mdc-top-app-bar__navigation-icon"
              aria-label="Print this page"
            >
              view_module
            </button>
            <button
              className="demo-menu material-icons mdc-top-app-bar__navigation-icon"
              aria-label="Print this page"
            >
              info
            </button>
            <button
              className="demo-menu material-icons mdc-top-app-bar__navigation-icon"
              aria-label="Download"
            >
              settings
            </button>
            <img
              className="user-img"
              src="https://demo.filerun.co/a/?uid=1"
              alt=""
            />
          </section>
        </div>
        <AddNewFolder
          ref={newF => (this.addNewFolderComp = newF)}
          currentDirId={this.props.currentDirId}
          parentId={this.props.parentId}
          newFolderName={this.state.newFolderName}
          folderViewComp={this.props.folderViewComp}
          updateSnackBarProps={this.props.updateSnackBarProps}
        />

        <Dialog
          ref={dia => (this.dialogComp = dia)}
          dialogPrompt="Create New Folder"
          updateUserInp={this.updateNewFolderName}
          yesBtnAction={() => this.addNewFolderComp.folderAdd()}
        />
      </header>
    );
  }
}

export default TopAppBar;
