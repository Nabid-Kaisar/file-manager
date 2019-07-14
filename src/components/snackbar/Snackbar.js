import React, { Component } from "react";
import { MDCSnackbar } from "@material/snackbar";

class Snackbar extends Component {
  componentDidMount() {
    this.snackBarOpenClose("close");
  }

  snackBarOpenClose = action => {
    const snackbar = new MDCSnackbar(document.querySelector(".mdc-snackbar"));
    if(action === "open" && this.props.snackBarNotificationMsg !== ""){
      snackbar.open();
    }else{
      snackbar.close();
    }
    // action === "open" &&  ? snackbar.open() : snackbar.close();
  };

  componentDidUpdate(prevProps) {
    // this.snackBarOpenClose("close");
    // console.log("prev", prevProps.action);
    // console.log("this props", this.props.action);
    // console.log("---");
    if (prevProps.action !== this.props.action) {
      this.snackBarOpenClose(this.props.action);
    }
  }

  render() {
    return (
      <div className="snackbar-wrapper">
        <div className="mdc-snackbar mdc-snackbar--leading">
          <div className="mdc-snackbar__surface">
            <div className="mdc-snackbar__label" role="status" aria-live="polite">
              {this.props.snackBarNotificationMsg}
            </div>
            <div className="mdc-snackbar__actions">
              <button type="button" className="mdc-button mdc-snackbar__action">
                {this.props.userAction}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Snackbar;
