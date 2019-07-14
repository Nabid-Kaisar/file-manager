import React, { Component } from 'react';

import RightSideBar from '../rightsidebar/RightSideBar';

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div class="mdc-drawer-app-content mdc-top-app-bar--fixed-adjust">
                <main class="main-content float-fix width-100" id="main-content">
                    <div className="main-body-container float-left" id="main-container-id">
                        {this.props.children}
                    </div>
                    <div className="rightside-container float-right b-shadow">
                        <RightSideBar />
                    </div>
                </main>
            </div>
        );
    }
}

export default MainContent;