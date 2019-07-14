import React, { Component } from "react";

import userImage from "../../images/user.png";
import userImage2 from "../../images/3.jpg";

class Comment extends Component {
  state = {};
  render() {
    return (
      <div id="comment-content" className="height-100">
        <div className="comments-body">
          <div className="comment-wrapper">
            {/* <div class="commentsEmpty">No comments available for this file.</div> */}

            {/* own user comment */}
            <div className="comment own">
              <div className="time" title="2019 at 10:00 AM">
                34 minutes ago
              </div>
              <div className="name">Super User</div>
              <div className="float-fix" />
              <div
                className="avatar"
                title="Super User"
                style={{ backgroundImage: "url(" + userImage + ")" }}
              />
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
              <div className="time float-left" title="2019 at 10:00 AM" />
              <div className="name float-right" />
              <div className="float-fix" />
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
              <div className="name float-left">User</div>
              <div className="time float-right" title="2019 at 10:00 AM">
                22 minutes ago
              </div>
              <div className="float-fix" />
              <div
                className="avatar"
                title="Super User"
                style={{ backgroundImage: "url(" + userImage2 + ")" }}
              />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="time" title="2019 at 10:00 AM">
                4 minutes ago
              </div>
              <div className="name">Super User</div>
              <div className="float-fix" />
              <div
                className="avatar"
                title="Super User"
                style={{ backgroundImage: "url(" + userImage + ")" }}
              />
              <div className="text">
                <div className="inner">
                  <p>
                    How about going to see a movie? Star is showing Enchanted.
                  </p>
                  <div className="removebtn">
                    <span>&#10006;</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="comment others">
              <div className="name float-left">User</div>
              <div className="time float-right" title="2019 at 10:00 AM">
                just now
              </div>
              <div className="float-fix" />
              <div
                className="avatar"
                title="Super User"
                style={{ backgroundImage: "url(" + userImage2 + ")" }}
              />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
              <div className="name float-left" />
              <div className="time float-right" title="2019 at 10:00 AM" />
              <div className="float-fix" />
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
            <i className="material-icons mdc-elevation--z10">print</i>
          </div>
          <div className="comment-input">
            <textarea
              className=""
              name="comment"
              id="comment"
              placeholder="Write a comment..."
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Comment;
