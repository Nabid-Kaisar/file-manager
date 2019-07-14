import React, { Component } from 'react';

import Image from '../../../images/1.jpg';

class AddToCard extends Component {
    state = {}
    render() {
        return (
            <div id="addtocardId" className="addtocard-content">
                <div className="addtocard-header float-fix">
                    {/* <div class="commentsEmpty">Drag here the files and folders you wish to download.</div> */}
                    <ul>
                        <li><a href="#"><i class="material-icons"> cloud_download </i>download all</a></li>
                        <li><a href="#"><i class="material-icons"> email </i>e-mail</a></li>
                    </ul>
                </div>
                <div className="addtocard-body" style={{ height: 'calc(100vh - ' + '223px' }}>
                    <dl>
                        <dt>
                            <div className="card-content">
                                <div className="card-image">
                                    <img src={Image} alt="" />
                                </div>
                                <div className="card-text">
                                    <p>photo-6.png</p>
                                    <span>1.9 MB</span>
                                </div>

                            </div>
                        </dt>
                    </dl>

                    <dl>
                        <dt>
                            <div className="card-content">
                                <div className="card-image">
                                    <img src='https://demo.filerun.co/images/fico/folder-gray.png' alt="" />
                                </div>
                                <div className="card-text">
                                    <p>photo-6.png</p>
                                    <span>folder</span>
                                </div>

                            </div>
                        </dt>
                    </dl>


                </div>
                <div className="addtocard-footer width-100 float-fix ptb-5">
                    <div className="total-file-size float-left ml-10">18 bytes</div>
                    <div className="clear-file-list float-right mr-10">Clear list</div>
                </div>
            </div>
        );
    }
}

export default AddToCard;