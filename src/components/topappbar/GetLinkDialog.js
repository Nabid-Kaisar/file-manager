import React, { Component } from "react";
import { MDCDialog } from "@material/dialog";
import packageJson from "../../../package.json";

class Dialog extends Component {
  state = {
    link: ""
  };

  dialogShowToggle = () => {
    const dialog = new MDCDialog(document.getElementById("mdc-dialog-getLink"));
    dialog.isOpen ? dialog.close() : dialog.open();
  };

  generateLink = () => {
    let proxy = packageJson.proxy;
    let { currentDirId, selectedItem } = this.props.fileInfo;
    let { fileFormat, name, type } = selectedItem;
    return `${proxy}/download/${type}/${name}/${fileFormat}/${currentDirId}`;
  };

  handleCopy = () => {
    let getLinkInpElem = document.getElementById("get-link-inp");
    getLinkInpElem.select();
    document.execCommand("copy");
    this.props.updateSnackBarProps(
      "The link has been copied to clipboard.",
      "open",
      "Close"
    );
  };

  handleOpen = () => {
    if (this.state.link !== "") {
      window.open(this.state.link);
    }
  };

  handleShareFb = e => {
    var facebookWindow = window.open(
      "https://www.facebook.com/sharer/sharer.php?u=" + this.state.link,
      "facebook-popup",
      "height=350,width=600"
    );
    if (facebookWindow.focus) {
      facebookWindow.focus();
    }
  };

  handleShareTwitter = e => {
    e.preventDefault();
    var twitterWindow = window.open(
      "https://twitter.com/share?url=" + this.state.link,
      "twitter-popup",
      "height=350,width=600"
    );
    if (twitterWindow.focus) {
      twitterWindow.focus();
    }
  };

  handleShareGmail = e => {
    e.preventDefault();
    var gmailWindow = window.open(
      `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to&su=Your+Subject+here&body=${
        this.state.link
      }&ui=2&tf=1`,
      "gmail-popup",
      "height=350,width=600"
    );
    if (gmailWindow.focus) {
      gmailWindow.focus();
    }
  };

  componentDidUpdate = prevProps => {
    if (prevProps.fileInfo !== this.props.fileInfo) {
      if (
        !(
          Object.entries(this.props.fileInfo.selectedItem).length === 0 &&
          this.props.fileInfo.selectedItem.constructor === Object
        )
      ) {
        let link = this.generateLink();
        this.setState({ link });
      }
    }
  };

  render() {
    let { name } = this.props.fileInfo.selectedItem;
    return (
      <div className="dialog-wrapper">
        <div
          id="mdc-dialog-getLink"
          className="mdc-dialog custom-dialog"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="my-dialog-title"
          aria-describedby="my-dialog-content"
        >
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface">
              <h2 className="mdc-dialog__title" id="my-dialog-title">
                {name}
                <button
                  style={{ position: "relative", left: "66px" }}
                  data-mdc-dialog-action="no"
                >
                  &#10539;
                </button>
              </h2>

              <div className="mdc-dialog__content" id="my-dialog-content">
                <input
                  id="get-link-inp"
                  className="width-100"
                  type="text"
                  value={this.state.link}
                  readOnly
                />
              </div>
              <footer className="mdc-dialog__actions">
                <button onClick={this.handleCopy}>
                  <span className="mdc-button__label">Copy</span>
                </button>
                <button onClick={this.handleOpen}>
                  <span className="mdc-button__label">Open</span>
                </button>
              </footer>

              <footer className="mdc-dialog__actions">
                <button
                  type="button"
                  className="mdc-button mdc-dialog__button mdc-button--dense"
                  data-mdc-dialog-action="no"
                >
                  <span className="mdc-button__label">Done</span>
                </button>
                <button
                  type="button"
                  className="mdc-button mdc-dialog__button mdc-button--dense"
                >
                  <span className="mdc-button__label">Share Link</span>
                </button>
              </footer>

              <footer className="mdc-dialog__actions">
                <button onClick={this.handleShareFb}>
                  <span className="mdc-button__label">Facebook</span>
                </button>
                <button onClick={this.handleShareTwitter}>
                  <span className="mdc-button__label">Twitter</span>
                </button>
                <button onClick={this.handleShareGmail}>
                  <span className="mdc-button__label">Gmail</span>
                </button>
              </footer>
            </div>
          </div>
          <div className="mdc-dialog__scrim" />
        </div>
      </div>
    );
  }
}

export default Dialog;
