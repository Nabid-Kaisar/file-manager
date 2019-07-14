import React, { Component } from 'react';

class NotFound extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="not-found-wrapper" style={{ height: 'calc(100vh - ' + '210px)' }}>
                <div className="align-center">
                    <div><i className="material-icons"> search </i></div>
                    <p className="m-0">No file was found matching your search criteria.</p>
                </div>
            </div>
         );
    }
}
 
export default NotFound;