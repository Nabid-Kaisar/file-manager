import React, { Component } from 'react';

import { MDCChipSet } from '@material/chips';

class TopAppBar extends Component {
    state = {
        show: false
      };
      
      componentDidMount() {
          //topbar create button toogle menu hide
          let x = document.querySelector(".body-class");
          x.addEventListener("click", this.hideUser,false);

          // setup for top chips
          const chipSetEl = document.querySelector('.mdc-chip-set');
          const chipSet = new MDCChipSet(chipSetEl);
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

    render() {
        let createbuttonToggle = this.state.show === true ? "" : "d-none";
        return (
            <header class="mdc-top-app-bar mdc-top-app-bar--fixed app-bar mdc-elevation--z4 custom-top-app-bar" id="app-bar">
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        {/* <a href="#" class="demo-menu material-icons mdc-top-app-bar__navigation-icon">menu</a> */}
                        <span class="mdc-top-app-bar__title"><img src="https://demo.filerun.co/your-logo-here-top.png" alt="" /></span>
                        <div class="create-file-button-area">

                            <div class="mdc-chip-set">
                                <div id="toggleButton" class="mdc-chip mdc-elevation--z2 custom-top-chips" onClick={this.onClassChange}>
                                    <i class="material-icons mdc-chip__icon mdc-chip__icon--leading">add</i>
                                    <div class="mdc-chip__text">New</div>
                                </div>
                            </div>

                            <div className={"appbar-submenu-area mdc-elevation--z10 " + createbuttonToggle}>
                                <ul>
                                    <li>
                                        <a href="http://">
                                            <span class="material-icons topbar-submenu-icon">cloud_upload</span>
                                            <span>text upload</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="http://">
                                            <span class="material-icons topbar-submenu-icon">folder</span>
                                            <span>text file</span>
                                        </a>
                                    </li>
                                    <li class="mdc-list-divider" role="separator"></li>
                                    <li>
                                        <a href="http://">
                                            <span class="material-icons topbar-submenu-icon">folder</span>
                                            <span>text file</span>
                                        </a>
                                    </li>
                                    <li class="submenu">
                                        <a href="http://">
                                            <span class="material-icons topbar-submenu-icon">folder</span>
                                            <span>text file</span>
                                            <span class="material-icons topbar-submenu-icon submenu-child">chevron_right</span>
                                        </a>
                                        <ul class="mdc-elevation--z10">
                                            <li>
                                                <a href="#">
                                                    <span class="material-icons topbar-submenu-icon">folder</span>
                                                    <span>text file</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="material-icons topbar-submenu-icon">folder</span>
                                                    <span>text file</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <span class="material-icons topbar-submenu-icon">folder</span>
                                                    <span>text file</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>

                        </div>
                        <button class="demo-menu material-icons mdc-top-app-bar__navigation-icon" aria-label="Print this page">search</button>
                    </section>
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end">
                        <button class="demo-menu material-icons mdc-top-app-bar__navigation-icon" aria-label="Print this page">more_vert</button>
                        <button class="demo-menu material-icons mdc-top-app-bar__navigation-icon" aria-label="Print this page">view_module</button>
                        <button class="demo-menu material-icons mdc-top-app-bar__navigation-icon" aria-label="Print this page">info</button>
                        <button class="demo-menu material-icons mdc-top-app-bar__navigation-icon" aria-label="Download">settings</button>
                        <img className="user-img" src="https://demo.filerun.co/a/?uid=1" alt="" />
                    </section>
                </div>
            </header>
        );
    }
}

export default TopAppBar;