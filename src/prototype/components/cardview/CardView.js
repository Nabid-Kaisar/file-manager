import React, { Component } from "react";

//image import 
import first from '../../../images/1.jpg';
import second from '../../../images/2.png';
import third from '../../../images/3.jpg';
import doc from '../../../images/doc.png';
import xls from '../../../images/xls.png';

class CardView extends Component {
    cardView = (bgimage, filename, fileformat, icon) => {
        return (
            <div className="card-item width-140 float-left mdc-elevation--z3">
                <div className="top-label">
                    <div className="label" style={{ backgroundColor: "green" }}>APPROVED</div>
                </div>
                <div className="card-image" style={{ backgroundImage: 'url(' + bgimage + ')' }}></div>
                <div className="card-title">
                    <div className="card-name" data-toggle="tooltip" title={filename}>
                        {filename}
                        <span>{fileformat}</span>
                    </div>
                    <div className="card-icon">
                        <i className="material-icons ml-10">{icon}</i>
                    </div>
                </div>
            </div>
        )
    }


  render() {
    return (
      <React.Fragment>
        {/* For Image Card */}
        <div class="typeSeparator">Files</div>
        <div class="card-area float-fix">
          {this.cardView(first, 'photo-16', 'JPEG', 'chat_bubble_outline')}
                    {this.cardView(second, 'photo-17', 'JPG', 'insert_link')}
                    {this.cardView(doc, 'Office Word', 'DOC', null)}
                    {this.cardView(third, 'photo-16', 'JPEG', 'chat_bubble_outline')}
                    {this.cardView(xls, 'Office Excel 07', 'XLS', null)}
        </div>
      </React.Fragment>
    );
  }
}

export default CardView;
