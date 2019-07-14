import React, { Component } from "react";

//all import for material
import { MDCDrawer } from "@material/drawer";
import { MDCList } from "@material/list";

class Drawer extends Component {
  componentDidMount() {
    const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
    drawer.open = true;

    const list = MDCList.attachTo(document.querySelector(".mdc-list"));
    list.wrapFocus = true;
  }

  render() {
    return (
      <React.Fragment>
        <aside className="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust sidebar-menu">
          <div className="mdc-drawer__content">
            <ul className="mdc-list custom-menu">
              <li
                className="mdc-list-item mdc-list-item--activated"
                href="#"
                aria-selected="true"
              >
                <i
                  className="material-icons mdc-list-item__graphic"
                  aria-hidden="true"
                >
                  inbox
                </i>
                <span className="mdc-list-item__text">Inbox</span>
              </li>
              <li className="mdc-list-item" href="#">
                <i
                  className="material-icons mdc-list-item__graphic"
                  aria-hidden="true"
                >
                  send
                </i>
                <span className="mdc-list-item__text">Outgoing</span>
              </li>
              <li className="mdc-list-item" href="#">
                <i
                  className="material-icons mdc-list-item__graphic"
                  aria-hidden="true"
                >
                  drafts
                </i>
                <span className="mdc-list-item__text">Drafts</span>
              </li>
            </ul>
          </div>
        </aside>
      </React.Fragment>
    );
  }
}

export default Drawer;
