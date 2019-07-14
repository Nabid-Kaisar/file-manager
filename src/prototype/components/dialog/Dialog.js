import React, { Component } from 'react';
import { MDCDialog } from '@material/dialog';

class Dialog extends Component {
    state = {}

    componentDidMount() {
        
        const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

        dialog.open();
    }

    render() {
        return (
            <div className="dialog-wrapper">
                <div class="mdc-dialog custom-dialog"
                    role="alertdialog"
                    aria-modal="true"
                    aria-labelledby="my-dialog-title"
                    aria-describedby="my-dialog-content">
                    <div class="mdc-dialog__container">
                        <div class="mdc-dialog__surface">

                            <h2 class="mdc-dialog__title" id="my-dialog-title">Create New folder</h2>
                            <div class="mdc-dialog__content" id="my-dialog-content">
                                <input className="width-100" type="text" name="folder" id="folder"/>
                            </div>
                            <footer class="mdc-dialog__actions">
                                <button type="button" class="mdc-button mdc-dialog__button mdc-button--dense" data-mdc-dialog-action="no">
                                    <span class="mdc-button__label">No</span>
                                </button>
                                <button type="button" class="mdc-button mdc-dialog__button mdc-button--dense" data-mdc-dialog-action="yes">
                                    <span class="mdc-button__label">Yes</span>
                                </button>
                            </footer>
                        </div>
                    </div>
                    <div class="mdc-dialog__scrim"></div>
                </div>
            </div>
        );
    }
}

export default Dialog;