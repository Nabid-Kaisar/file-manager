import React, { Component } from 'react';

import userImage from '../../../images/user.png';
import userImage2 from '../../../images/3.jpg';

class Comment extends Component {
    state = {}
    render() {
        return (
            <div id="comment-content" className="height-100">
                <div className="comments-body">
                    <div className="comment-wrapper">
                        {/* <div class="commentsEmpty">No comments available for this file.</div> */}

                        {/* own user comment */}
                        <div className="comment own">
                            <div class="time" title="2019 at 10:00 AM">34 minutes ago</div>
                            <div class="name">Super User</div>
                            <div class="float-fix"></div>
                            <div class="avatar" title="Super User" style={{ backgroundImage: 'url(' + userImage + ')' }}></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Hey</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment own followup">
                            <div class="time float-left" title="2019 at 10:00 AM"></div>
                            <div class="name float-right"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>What are your plans for this weekend?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* others user comment */}
                        <div className="comment others">
                            <div class="name float-left">User</div>
                            <div class="time float-right" title="2019 at 10:00 AM">22 minutes ago</div>
                            <div class="float-fix"></div>
                            <div class="avatar" title="Super User" style={{ backgroundImage: 'url(' + userImage2 + ')' }}></div>
                            <div className="text">
                                <div className="inner">
                                    <p>I don’t know</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment own">
                            <div class="time" title="2019 at 10:00 AM">4 minutes ago</div>
                            <div class="name">Super User</div>
                            <div class="float-fix"></div>
                            <div class="avatar" title="Super User" style={{ backgroundImage: 'url(' + userImage + ')' }}></div>
                            <div className="text">
                                <div className="inner">
                                    <p>How about going to see a movie? Star is showing Enchanted.</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others">
                            <div class="name float-left">User</div>
                            <div class="time float-right" title="2019 at 10:00 AM">just now</div>
                            <div class="float-fix"></div>
                            <div class="avatar" title="Super User" style={{ backgroundImage: 'url(' + userImage2 + ')' }}></div>
                            <div className="text">
                                <div className="inner">
                                    <p>That sounds like a good idea.</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="comment others followup">
                            <div class="name float-left"></div>
                            <div class="time float-right" title="2019 at 10:00 AM"></div>
                            <div class="float-fix"></div>
                            <div className="text">
                                <div className="inner">
                                    <p>Do you want to get together or something?</p>
                                    <div className="removebtn">
                                        <span>&#10006;</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="comments-footer">
                    <div className="comment-print align-right">
                        <i class="material-icons mdc-elevation--z10">print</i>
                    </div>
                    <div className="comment-input">
                        <textarea className="" name="comment" id="comment" placeholder="Write a comment..."></textarea>
                    </div>
                </div>
            </div>

        );
    }
}

export default Comment;