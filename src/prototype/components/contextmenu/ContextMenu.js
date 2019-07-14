import React, { Component } from 'react';

class ContextMenu extends Component {
    state = {
        visible: false,
    };
    
    componentDidMount() {
        document.getElementById('main-container-id').addEventListener('contextmenu', this._handleContextMenu);
        document.addEventListener('click', this._handleClick);
        document.addEventListener('scroll', this._handleScroll);
    };

    componentWillUnmount() {
      document.removeEventListener('contextmenu', this._handleContextMenu);
      document.removeEventListener('click', this._handleClick);
      document.removeEventListener('scroll', this._handleScroll);
    }
    
    _handleContextMenu = (event) => {
        event.preventDefault();
        
        this.setState({ visible: true });
        
        const maincontainer = document.getElementById('main-container-id');
        console.log("container width= " + maincontainer.offsetWidth);

        const clickX = event.clientX;
        const clickY = event.clientY;
        console.log(`clicked position width= ${clickX} and height= ${clickY}`);

        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = this.root.offsetWidth;
        const rootH = this.root.offsetHeight;

        console.log(`context menu width = ${rootW} and height= ${rootH}`);
        
        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;
        
        if (right) {
            this.root.style.left = `${clickX + 5}px`;
        }
        
        if (left) {
            this.root.style.left = `${clickX - rootW - 5}px`;
        }
        
        if (top) {
            this.root.style.top = `${clickY + 5}px`;
            this.root.style.bottom = null;
        }
        
        if (bottom) {
            const finalposition = window.innerWidth;
            this.root.style.bottom = `0px`;
            this.root.style.top = null;

        }
    };

    _handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
        
        if (wasOutside && visible) this.setState({ visible: false, });
    };

    _handleScroll = () => {
        const { visible } = this.state;
        
        if (visible) this.setState({ visible: false, });
    };
    
    render() {
        const { visible } = this.state;
        
        return(visible || null) && 
            <div ref={ref => {this.root = ref}} className="contextMenu">
                <div className="contextMenu--option">Share this</div>
                <div className="contextMenu--option">New window</div>
                <div className="contextMenu--option">Visit official site</div>
                <div className="contextMenu--option contextMenu--option__disabled">View full version</div>
                <div className="contextMenu--option">Settings</div>
                <div className="contextMenu--separator" />
                <div className="contextMenu--option">About this app</div>
            </div>
    };
}

export default ContextMenu;