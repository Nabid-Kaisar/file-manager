import React, { Component } from "react";
import UploadFile from "../upload/UploadFile";

export class Header extends Component {
  render() {
    return (
      <header
        className="mdc-top-app-bar app-bar drawer-top mdc-elevation--z4"
        id="app-bar"
      >
        <div className="mdc-top-app-bar__row">
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
            {/* <a href="#" className="demo-menu material-icons mdc-top-app-bar__navigation-icon">menu</a> */}
            <span className="mdc-top-app-bar__title">
              <img
                src="https://demo.filerun.co/your-logo-here-top.png"
                alt=""
              />
            </span>
            <UploadFile getFile={this.props.getFile}/>
          </section>
          <section className="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
            <button
              className="demo-menu material-icons mdc-top-app-bar__navigation-icon"
              aria-label="Print this page"
            >
              more_vert
            </button>
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
      </header>
    );
  }
}

export default Header;
