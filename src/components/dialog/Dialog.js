import React, { Component } from "react";
import { MDCDialog } from "@material/dialog";

class Dialog extends Component {
  state = {
    userInp: ""
  };

  dialogShowToggle = () => {
    const dialog = new MDCDialog(
      document.getElementById("mdc-dialog-addFolder")
    );
    dialog.isOpen ? dialog.close() : dialog.open();
  };

  handleUserInp = e => {
    this.setState({ userInp: e.target.value });
  };

  handleYesButtonClick = async () => {
    if (this.state.userInp !== "") {
      await this.props.updateUserInp(this.state.userInp);
      console.log(this.props);
      this.props.yesBtnAction(); //this yesBtnAction will be dynamic via props
    }
  };

  render() {
    return (
      <div className="dialog-wrapper">
        <div
          id="mdc-dialog-addFolder"
          className="mdc-dialog custom-dialog"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="my-dialog-title"
          aria-describedby="my-dialog-content"
        >
          <div className="mdc-dialog__container">
            <div className="mdc-dialog__surface">
              <h2 className="mdc-dialog__title" id="my-dialog-title">
                {this.props.dialogPrompt}
              </h2>
              <div className="mdc-dialog__content" id="my-dialog-content">
                <input
                  className="width-100"
                  type="text"
                  name="folder"
                  id="folder"
                  onChange={this.handleUserInp}
                />
              </div>
              <footer className="mdc-dialog__actions">
                <button
                  type="button"
                  className="mdc-button mdc-dialog__button mdc-button--dense"
                  data-mdc-dialog-action="no"
                >
                  <span className="mdc-button__label">No</span>
                </button>
                <button
                  type="button"
                  className="mdc-button mdc-dialog__button mdc-button--dense"
                  data-mdc-dialog-action="yes"
                  onClick={this.handleYesButtonClick}
                >
                  <span className="mdc-button__label">Yes</span>
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
