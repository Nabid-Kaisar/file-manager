import React, { Component } from 'react';

//all import for Leftsidebar
import { MDCDrawer } from "@material/drawer";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCList } from "@material/list";

class LeftSideBar extends Component {

    componentDidMount() {

        const drawer = MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));
        drawer.open = true;
        const topAppBarElement = document.querySelector('.mdc-top-app-bar');

        const list = MDCList.attachTo(document.querySelector('.mdc-list'));
        list.wrapFocus = true;

        const topAppBar = MDCTopAppBar.attachTo(document.getElementById('app-bar'));
        topAppBar.setScrollTarget(document.getElementById('main-content'));
        // topAppBar.listen('MDCTopAppBar:nav', () => {
        //     drawer.open = !drawer.open;
        // });
    }

    submenuActive = (event) => {
        const e = event.currentTarget.parentNode.querySelector('.submenu');
        e.classList.toggle("submenu--show");
        console.log(e);
    }

    render() {
        return (
            <aside class="mdc-drawer mdc-drawer--dismissible mdc-top-app-bar--fixed-adjust sidebar-menu p-fixed">
                <div class="mdc-drawer__content">
                    <ul class="mdc-list custom-menu">
                        <div className="menu-tree-wrapper">
                            {/* first menu start */}
                            <li>
                                <div className="menu-content " onClick={this.submenuActive}>
                                    <i class="material-icons submenu-flug"> arrow_right </i>
                                    <i class="material-icons folder-icon"> folder </i>
                                    <a href="#">My Files</a>
                                    <div className="extra-flug">
                                        <i class="material-icons"> more_vert </i>
                                    </div>
                                </div>

                                {/* submenu */}
                                <ul className="submenu submenu--hide ">
                                    <li>
                                        <div className="menu-content " onClick={this.submenuActive}>
                                            <i class="material-icons submenu-flug"> arrow_right </i>
                                            <i class="material-icons folder-icon"> folder </i>
                                            <a href="#">My Files</a>
                                            <div className="extra-flug">
                                                <i class="material-icons"> more_vert </i>
                                            </div>
                                        </div>

                                        {/* submenu */}
                                        <ul className="submenu submenu--hide ">
                                            <li>
                                                <div className="menu-content ">
                                                    <i class="material-icons submenu-flug"> arrow_right </i>
                                                    <i class="material-icons folder-icon"> folder </i>
                                                    <a href="#">My Files</a>
                                                    <div className="extra-flug">
                                                        <i class="material-icons"> more_vert </i>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="menu-content ">
                                                    <i class="material-icons submenu-flug"> arrow_right </i>
                                                    <i class="material-icons folder-icon"> folder </i>
                                                    <a href="#">My Files</a>
                                                    <div className="extra-flug">
                                                        <i class="material-icons"> more_vert </i>
                                                    </div>
                                                </div>
                                            </li>

                                            <li>
                                                <div className="menu-content ">
                                                    <i class="material-icons submenu-flug"> arrow_right </i>
                                                    <i class="material-icons folder-icon"> folder </i>
                                                    <a href="#">My Files</a>
                                                    <div className="extra-flug">
                                                        <i class="material-icons"> more_vert </i>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>

                                    </li>

                                    <li>
                                        <div className="menu-content ">
                                            <i class="material-icons submenu-flug"> arrow_right </i>
                                            <i class="material-icons folder-icon"> folder </i>
                                            <a href="#">My Files</a>
                                            <div className="extra-flug">
                                                <i class="material-icons"> more_vert </i>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="menu-content ">
                                            <i class="material-icons submenu-flug"> arrow_right </i>
                                            <i class="material-icons folder-icon"> folder </i>
                                            <a href="#">My Files</a>
                                            <div className="extra-flug">
                                                <i class="material-icons"> more_vert </i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </li> {/* first menu close */}

                            {/* second menu start */}
                            <li>
                                <div className="menu-content selected" onClick={this.submenuActive}>
                                    <i class="material-icons submenu-flug"> arrow_right </i>
                                    <i class="material-icons folder-icon"> folder </i>
                                    <a href="#">My Files</a>
                                    <div className="extra-flug">
                                        <i class="material-icons"> more_vert </i>
                                    </div>
                                </div>

                                {/* submenu */}
                                <ul className="submenu submenu--hide ">
                                    <li>
                                        <div className="menu-content ">
                                            <i class="material-icons submenu-flug"> arrow_right </i>
                                            <i class="material-icons folder-icon"> folder </i>
                                            <a href="#">My Files</a>
                                            <div className="extra-flug">
                                                <i class="material-icons"> more_vert </i>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="menu-content ">
                                            <i class="material-icons submenu-flug"> arrow_right </i>
                                            <i class="material-icons folder-icon"> folder </i>
                                            <a href="#">My Files</a>
                                            <div className="extra-flug">
                                                <i class="material-icons"> more_vert </i>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="menu-content ">
                                            <i class="material-icons submenu-flug"> arrow_right </i>
                                            <i class="material-icons folder-icon"> folder </i>
                                            <a href="#">My Files</a>
                                            <div className="extra-flug">
                                                <i class="material-icons"> more_vert </i>
                                            </div>
                                        </div>
                                    </li>
                                </ul>

                            </li> {/* second menu close */}

                        </div>
                    </ul>
                </div>
            </aside>
        );
    }
}

export default LeftSideBar;