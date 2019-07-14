import React, { Component } from "react";

//all sidebar include
import Info from "./Info";
// import Comment from './Comment';
// import AddToCard from './AddToCard';

class RightSideBar extends Component {
  
  render() {
    let hrefLink = '#';
    return (
      <React.Fragment>
        <Info />
        {/* <Comment /> */}
        {/* <AddToCard /> */}

        <div className="side-footer">
          <div className="tab-area">
            <ul>
              <li className="active">
                <a href={hrefLink}>
                  <i className="material-icons">info</i>
                </a>
              </li>
              <li>
                <a href={hrefLink}>
                  <i className="material-icons">chat_bubble_outline</i>
                </a>
                <div className="badge">
                  <span>2</span>
                </div>
              </li>
              <li>
                <a href={hrefLink}>
                  <i className="material-icons">add_shopping_cart</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default RightSideBar;
