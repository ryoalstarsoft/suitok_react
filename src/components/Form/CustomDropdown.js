import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Dropdown } from 'semantic-ui-react'
import CONST from '../../global/const'
import 'semantic-ui-css/semantic.min.css'
import './CustomDropdown.css'
import MyDropdown from './MyDropdown';

class CustomDropdown extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.querySelector('div[role="combobox"] .search').setAttribute("autocomplete", "off");
        document.querySelector('div[role="combobox"] .search').setAttribute("autocorrect", "off");

        document.querySelector('div[role="combobox"] .message').addEventListener("click", this.noComboClick);
        document.querySelector('div[role="combobox"] div[role="listbox"]').addEventListener("click", this.noComboClick);
    }

    componentWillUnmount() {
        document.querySelector('div[role="combobox"] .message').removeEventListener("click", this.noResultClick);
    }

    noComboClick = (e) => {
        document.querySelector('div[role="combobox"] input').value = e.target.innerText;
        // e.target.setAttribute("style", "display: none");
        // document.querySelector('div[role="combobox"] input').blur();
        // document.querySelector('.form-container').click();
        // document.querySelector('div[role="combobox"]').classList.add('active');
    }

    handleChange = (data) => {
        debugger;
        console.log('handleChange:', data);
        this.props.callbackBlur(data, true);
    }

    handleBlur(event, data) {
        event.preventDefault();
        console.log('handleBlur');
        // document.querySelector('div[role="combobox"] .menu.transition').setAttribute("style", "display: none !important");
        // document.querySelector('div[role="combobox"]').classList.remove('active', 'visible');
        // document.querySelector('div[role="combobox"]').setAttribute("style", "border-bottom: 1px solid #000; z-index: 100 !important");

        let postcode = document.querySelector('div[role="combobox"] input').value;

        if (postcode && postcode !== "" && data.options.length === 0)
            this.props.callbackBlur(document.querySelector('div[role="combobox"] .text').innerText, true);
        else
            this.props.callbackBlur(document.querySelector('div[role="combobox"] .text').innerText, true);
    }

    handleSearchChange(event, data){
        document.querySelector('div[role="combobox"] .menu.transition').setAttribute("style", "display: none !important");
        console.log('handleSearchChange:', data);
        event.target.setAttribute("autocomplete", "off");
        this.props.callbackInputChange(data.searchQuery);
    }

    handleClick(event, data) {
        event.preventDefault();
        event.stopPropagation();

        // document.querySelector('div[role="combobox"]').classList.add('active', 'visible');
        document.querySelector('div[role="combobox"] .menu.transition').setAttribute("style", "display: none !important");

        if (document.querySelector('div[role="combobox"] .text').innerText !== "e.g. TW19 5NW") {
            document.querySelector('div[role="combobox"] input').value = document.querySelector('div[role="combobox"] .text').innerText;
            document.querySelector('div[role="combobox"] .text').innerText = "";
            this.props.callbackInputChange(document.querySelector('div[role="combobox"] input').value);
        }

        // if (!data.options.length)
        //     document.querySelector('div[role="combobox"] .menu.transition').setAttribute("style", "display: none !important");
        // else {
        //     setTimeout(() => {
        //         document.querySelector('div[role="combobox"] .menu.transition').setAttribute("style", "display: block !important");
        //     }, 2000);
        // }

        /*else
            this.props.callbackBlur(document.querySelector('div[role="combobox"] .text').innerText, true);*/
    }

    render() {
        var options = this.props.options;

        return(
            <div className="custom-dropdown-container">
                <Dropdown
                    placeholder='e.g. TW19 5NW'
                    fluid
                    search
                    selection
                    options={options}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    onSearchChange={this.handleSearchChange}
                    onBlur={this.handleBlur}
                    noResultsMessage="0 results found" />
                <MyDropdown
                    options={options}
                    onChange={this.handleChange}
                    onClick={this.handleClick}
                    onSearchChange={this.handleSearchChange}
                    onBlur={this.handleBlur}
                    noResultsMessage="0 results found" />
                {/* <Dropdown
                    placeholder='Select Country'
                    fluid
                    search
                    selection
                    options={options}
                /> */}
            </div>
        );
    }
}

CustomDropdown.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    callbackInputChange: PropTypes.func.isRequired,
    callbackBlur: PropTypes.func.isRequired
}

export default CustomDropdown