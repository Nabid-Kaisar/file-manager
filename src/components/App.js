import React, { Component } from "react";
import StateProvider from "./stateProvider/StateProvider";

import TopAppBar from "./topappbar/TopAppBar";
import LeftSideBar from "./leftsidebar/LeftSideBar";
import MainContent from "./mainContent/MainContent";
import FolderView from "./folderview/FolderView";
import CardView from "./cardview/CardView";
// import ContextMenu from "./contextmenu/ContextMenu";
// import Dialog from "./dialog/Dialog";
import Snackbar from "./snackbar/Snackbar";
import Search from "./search/Search";

class App extends Component {
  state = {
    currentFiles: [],
    currentDirId: "root",
    parentId: null,
    folderViewComp: {},
    notificationMsg: "",
    action: "",
    userAction: "",
    selectedItem: {}
  };

  reRenderCurrentFiles = fileArr => {
    this.setState({ currentFiles: fileArr });
  };

  updateSelectedItem = selectedItem => {
    this.setState({ selectedItem });
  };

  updateCurrentAndParentDirId = (id, pid) => {
    this.setState({ currentDirId: id });
    this.setState({ parentId: pid });
  };

  componentDidMount() {
    this.setState({ folderViewComp: this.folderViewComp });
  }

  updateSnackBarProps = (notificationMsg, action, userAction) => {
    this.setState({ notificationMsg, action, userAction });
  };

  render() {
    return (
      <div className="App">
        <StateProvider>
          <TopAppBar
            currentDirId={this.state.currentDirId}
            parentId={this.state.parentId}
            folderViewComp={this.state.folderViewComp}
            updateSnackBarProps={this.updateSnackBarProps}
            searchComp={this.searchComp}
            selectedItem={this.state.selectedItem}
          />
          <LeftSideBar folderViewComp={this.state.folderViewComp} />
          <MainContent>
            <Search
              folderViewComp={this.state.folderViewComp}
              currentDirId={this.state.currentDirId}
              parentId={this.state.parentId}
              ref={search => {
                this.searchComp = search;
              }}
            />
            <FolderView
              ref={fView => {
                this.folderViewComp = fView;
              }}
              reRenderCurrentFiles={this.reRenderCurrentFiles}
              updateCurrentAndParentDirId={this.updateCurrentAndParentDirId}
              updateSnackBarProps={this.updateSnackBarProps}
              updateSelectedItem={this.updateSelectedItem}
            />
            <CardView
              currentFiles={this.state.currentFiles}
              currentDirId={this.state.currentDirId}
              updateSelectedItem={this.updateSelectedItem}
            />
            {/* <ContextMenu
              currentDirId={this.state.currentDirId}
              parentId={this.state.parentId}
              folderViewComp={this.state.folderViewComp}
              updateSnackBarProps={this.updateSnackBarProps}
            /> */}
          </MainContent>
          <Snackbar
            snackBarNotificationMsg={this.state.notificationMsg}
            action={this.state.action}
            userAction={this.state.userAction}
          />
        </StateProvider>
      </div>
    );
  }
}

export default App;
