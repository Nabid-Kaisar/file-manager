import React, { Component } from "react";

//all import for Leftsidebar
import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCList } from "@material/list";

import { GlobalState } from "../stateProvider/StateProvider";
// import folderStructure from "../folderStructure/folderStructure.json";

class LeftSideBar extends Component {
  state = {
    menuStructureArr: [],
    lefMenu: null,
    tree: {}
  };

  componentDidMount() {
    const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
    drawer.open = true;
    // const topAppBarElement = document.querySelector(".mdc-top-app-bar");
    const list = MDCList.attachTo(document.querySelector(".mdc-list"));
    list.wrapFocus = true;
    const topAppBar = MDCTopAppBar.attachTo(document.getElementById("app-bar"));
    topAppBar.setScrollTarget(document.getElementById("main-content"));
    this.generateLeftMenu();
  }

  handleClick = async (event, subFolder) => {
    this.handleSubMenuShowToggle(event);
    if (subFolder) {
      this.handleSubFolderOpen(subFolder);
    } else {
      //no subFolder means render the full tree
      let folderStructure = await this.context.getFolderStructure();
      this.handleSubFolderOpen(folderStructure);
    }
  };

  handleSubMenuShowToggle = event => {
    const e = event.currentTarget.parentNode.querySelector(".submenu");
    e.classList.toggle("submenu--show");
  };

  handleSubFolderOpen = subFolder => {
    this.props.folderViewComp.openSubFolder(subFolder);
  };

  renderListFromObject = (value, idx) => {
    const { name, subFolder } = value;
    let hrefLink = "#";
    return (
      <li key={idx}>
        <div
          className="menu-content "
          onClick={() => this.handleSubFolderOpen(subFolder)}
        >
          <i className="material-icons submenu-flug"> arrow_right </i>
          <i className="material-icons folder-icon"> folder </i>
          <a href={hrefLink}>{name}</a>
          <div className="extra-flug">
            <i className="material-icons"> more_vert </i>
          </div>
        </div>
      </li>
    );
  };

  renderSubmenu = (value, idx) => {
    const { name, subFolder } = value;
    let hrefLink = "#";
    return (
      <li key={idx}>
        <div
          className="menu-content "
          onClick={e => this.handleClick(e, subFolder)}
        >
          <i className="material-icons submenu-flug"> arrow_right </i>
          <i className="material-icons folder-icon"> folder </i>
          <a href={hrefLink}>{name}</a>
          <div className="extra-flug">
            <i className="material-icons"> more_vert </i>
          </div>
        </div>
        <ul className="submenu submenu--hide ">{this.renderMenu(subFolder)}</ul>
      </li>
    );
  };

  renderMenu = tree => {
    if (!(Object.entries(tree).length === 0 && tree.constructor === Object)) {
      return tree.folders.map((value, index) => {
        return value.hasChild
          ? this.renderSubmenu(value, index)
          : this.renderListFromObject(value, index);
      });
    }
  };

  generateLeftMenu = async () => {
    let folderStructure = await this.context.getFolderStructure();
    this.setState({ tree: folderStructure });
  };

  render() {
    let menu = this.renderMenu(this.state.tree);
    let hrefLink = "#";
    return (
      <aside className="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust sidebar-menu p-fixed">
        <div className="mdc-drawer__content">
          <ul className="mdc-list custom-menu">
            <div className="menu-tree-wrapper">
              <li>
                <div
                  className="menu-content "
                  onClick={e => this.handleClick(e)}
                >
                  <i className="material-icons submenu-flug"> arrow_right </i>
                  <i className="material-icons folder-icon"> folder </i>
                  <a href={hrefLink}>My Files</a>
                  <div className="extra-flug">
                    <i className="material-icons"> more_vert </i>
                  </div>
                </div>
                <ul className="submenu submenu--show ">{menu}</ul>
              </li>
            </div>
          </ul>
        </div>
      </aside>
    );
  }
}

LeftSideBar.contextType = GlobalState;

export default LeftSideBar;
