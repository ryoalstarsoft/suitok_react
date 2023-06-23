import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CONST from '../../global/const';
import './MyDropdown.css';


class MyDropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postcode: ''
        }
    }

    postcodeChange = (e) => {
        this.setState({ [e.target.name]: e.target.value }, () => {
            this.props.onChange(e, this.state.postcode);
        });
    }

    render() {
        return (
            <div
                role="combobox"
                aria-expanded="false"
                className="ui active visible fluid search selection dropdown">
                <input
                    aria-autocomplete="list"
                    autocomplete="off"
                    className="search"
                    tabindex="0"
                    type="text"
                    name="postcode"
                    value={this.state.postcode}
                    onChange={this.postcodeChange}
                    autocorrect="off" />
                <div
                    className="default text"
                    role="alert"
                    aria-live="polite">
                </div>
                {/* <div
                    role="listbox"
                    className="visible menu transition">
                    <div className="message">0 results found</div>
                </div> */}
                <div role="listbox"
                    className="menu transition">
                    <div
                        role="option"
                        aria-checked="false"
                        aria-selected="false"
                        className="item"
                        style={{pointerEvents: 'all'}}>
                        <span className="text">A<span style={{fontWeight: 700}}>L1 1AA</span></span>
                    </div>
                </div>
            </div>
        );
    }
}

MyDropdown.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onSearchChange: PropTypes.func,
    onBlur: PropTypes.func,
    noResultsMessage: PropTypes.string
}

export default MyDropdown;