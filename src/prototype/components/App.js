import React, { Component } from "react";

import TopAppBar from './topappbar/TopAppBar';
import LeftSideBar from './leftsidebar/LeftSideBar';
import MainContent from './maincontent/MainContent';
import Search from './search/Search';
import NotFound from './notfound/NotFound';
import FolderView from './folderview/FolderView';
import CardView from './cardview/CardView';
import ContextMenu from './contextmenu/ContextMenu';
import Dialog from './dialog/Dialog';
import Snackbar from './snackbar/Snackbar';

class App extends Component {
    render() {
        return (
            <div className="App">
                <TopAppBar />
                <LeftSideBar />
                <MainContent>
                    {/* <Search /> */}
                    {/* <NotFound /> */}
                    <FolderView />
                    <CardView />
                    <ContextMenu />
                </MainContent>
                <Dialog />
                <Snackbar />
            </div>
        );
    }
}

export default App;
