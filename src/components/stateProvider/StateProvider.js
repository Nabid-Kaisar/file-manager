//This files serves the purpose of global states, functions, variables
import React, { Component } from "react";

export const GlobalState = React.createContext();

export default class StateProvider extends Component {
  //this state can act like a global state
  //any component importing "GlobalState" context can access all states
  state = {
    clickedFileName: "",
    clickedFileFormat: "",
    clickedFileSize: "",
    clickedCreated: "",
    clickedLastModified: "",
    clickedWidth: "",
    clickedHeight: ""
  };

  updateClickedFileInfo = (
    clickedFileName,
    clickedFileFormat,
    clickedFileSize,
    clickedCreated,
    clickedLastModified,
    clickedWidth,
    clickedHeight
  ) => {
    this.setState({ clickedFileName });
    this.setState({ clickedFileFormat });
    this.setState({ clickedFileSize });
    this.setState({ clickedCreated });
    this.setState({ clickedLastModified });
    this.setState({ clickedWidth });
    this.setState({ clickedHeight });
  };

  //this works like an util function which-
  //will be served throughout the app by context api
  getFolderStructure = () => {
    return fetch("/getFolderStructure")
      .then(res => {
        return res.json();
      })
      .then(resJson => {
        return resJson;
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <GlobalState.Provider
        value={{
          getFolderStructure: this.getFolderStructure,
          updateClickedFileInfo: this.updateClickedFileInfo,
          state: this.state
        }}
      >
        {this.props.children}
      </GlobalState.Provider>
    );
  }
}
