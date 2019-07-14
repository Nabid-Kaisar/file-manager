import React, { Component } from 'react';

class Search extends Component {
    state = {}
    render() {
        return (
            <div className="search-wrapper">
                <div className="search-header float-fix width-100">
                    <div className="search-type float-left">
                        <ul className="">
                            <li>Name</li>
                            <li>Type</li>
                        </ul>
                    </div>
                    <div className="search-close float-right">
                        <ul className="">
                            <li className="search-btn">
                                <i class="material-icons"> search </i>
                                <span>Search</span>
                            </li>
                            <li className="close">&#10006;</li>
                        </ul>
                    </div>
                </div>
                <div className="search-input">
                    <div className="input-name width-100">
                        <label htmlFor="name">Name: </label>
                        <input className="mt-10 mb-10" type="text" name="name" id="name"/>
                    </div>
                    <div className="input-type">
                        <label htmlFor="name">Type: </label>
                        <input list="browsers" />
                        <datalist id="browsers">
                            <option value="- Any type -" />
                            <option value="Audio" />
                            <option value="Documents" />
                            <option value="Photos" />
                            <option value="Video" />
                        </datalist> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;