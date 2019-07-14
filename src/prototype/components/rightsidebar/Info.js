import React, { Component } from 'react';

class Info extends Component {

    state = {
        finalheight: 0
    }

    componentDidMount() {
        var titlesecheight = document.getElementById('side-headerId').offsetHeight;
        var tagsecheight = document.getElementById('tag-sectionId').offsetHeight;

        var finalheight = 110 + titlesecheight + tagsecheight;

        this.setState({
            finalheight
        });
    }

    render() {
        return (
            <React.Fragment>
                <div id="info-content">
                    <div className="side-header" id="side-headerId">
                        <div className="title">
                            <div className="icon">
                                <i class="material-icons">folder</i>
                            </div>
                            <div className="filename">Office Excel 2007<span>.xlsx</span></div>
                        </div>
                    </div>
                    <div className="side-body" style={{ height: 'calc(100vh - ' + this.state.finalheight + 'px)' }}>
                        <div className="file-info">
                            <table class="width-100">
                                <caption><img src="https://demo.filerun.co/t.php?p=%2FROOT%2FHOME%2Fphoto%2D21%2Ejpeg&s=394781&t=1456164000" alt="" /></caption>
                                <tbody>
                                    <tr>
                                        <td class="name">Type</td>
                                        <td class="value">MS Word Document</td>
                                    </tr>

                                    <tr>
                                        <td class="name">Size</td>
                                        <td class="value">4.2 MB</td>
                                    </tr>

                                    <tr>
                                        <td class="name">Modified</td>
                                        <td class="value">Feb 23, 2016</td>
                                    </tr>

                                    <tr>
                                        <td class="name">Created</td>
                                        <td class="value">09:00</td>
                                    </tr>

                                    <tr>
                                        <td class="name">Rating</td>
                                        <td class="value">
                                            <ul>
                                                <li class="material-icons">star_rate</li>
                                                <li class="material-icons">star_rate</li>
                                                <li class="material-icons">star_rate</li>
                                                <li class="material-icons">star_rate</li>
                                                <li class="material-icons">star_rate</li>
                                            </ul>
                                        </td>
                                    </tr>
                                    
                                    <tr>
                                        <td class="name">Image properties</td>
                                        <td class="value properties"><a href="#"><i class="material-icons"> edit </i></a></td>
                                    </tr>

                                    <tr>
                                        <td class="name">Width</td>
                                        <td class="value"><a href="#">1920</a></td>
                                    </tr>

                                    <tr>
                                        <td class="name">Height</td>
                                        <td class="value"><a href="#">1280</a></td>
                                    </tr>

                                    <tr>
                                        <td class="name">Date taken</td>
                                        <td class="value"><a href="#">2016-11-01 00:00:00</a></td>
                                    </tr>

                                    <tr>
                                        <td class="name">Copyright</td>
                                        <td class="value"><a href="#">Creative Commons Zero</a></td>
                                    </tr>

                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div className="tag-section" id="tag-sectionId">
                        <div className="tags">
                            <ul class="tag-lists">
                                <li>mos<span className="tag-item-close">&#10006;</span></li>
                                <li>mos<span className="tag-item-close">&#10006;</span></li>
                                <li>mos<span className="tag-item-close">&#10006;</span></li>
                                <li>newyork<span className="tag-item-close">&#10006;</span></li>
                                <li><input type="text" name="text" id="text" placeholder="Add tags.." /></li>
                            </ul>
                            <div className="tag-button">
                                <ul>
                                    <li class="material-icons">save</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Info;