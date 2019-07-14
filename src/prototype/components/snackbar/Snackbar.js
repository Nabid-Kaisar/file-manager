import React, { Component } from 'react';
import {MDCSnackbar} from '@material/snackbar';


class Snackbar extends Component {
    state = {}

    componentDidMount() {
        const snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));

        snackbar.open();
    }

    render() {
        return (
            <div className="snackbar-wrapper">
                <div class="mdc-snackbar mdc-snackbar--leading">
                    <div class="mdc-snackbar__surface">
                        <div class="mdc-snackbar__label"
                            role="status"
                            aria-live="polite">
                            Can't send photo. Retry in 5 seconds.
                        </div>
                        <div class="mdc-snackbar__actions">
                            <button type="button" class="mdc-button mdc-snackbar__action">Retry</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Snackbar;