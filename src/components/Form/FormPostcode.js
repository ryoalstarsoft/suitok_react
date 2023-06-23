import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CONST from '../../global/const'
import FormSelect from './FormSelect'
import CustomDropdown from './CustomDropdown'
import $ from 'jquery'

class FormPostcode extends Component {
    constructor(props){
        super(props);

        this.state = {
            postcodes: [],
            dvalue:{
                // value: this.props.value,
                // label: this.props.value
                value: this.props.placeholder,
                label: this.props.placeholder
            },
            field_error: this.props.fieldError,
            isStartSearch: false
        }

        this.callbackInputChange = this.callbackInputChange.bind(this);
        this.callbackBlur = this.callbackBlur.bind(this);
    }

    componentDidMount(){
    }

    callbackBlur(value, state) {
        if (value === '') {
            this.setState({
                field_error: CONST.FIELD_ERR.EMPTY
            })
        }
        else {
            this.setState({
                field_error: CONST.FIELD_ERR.NONE
            })
        }

        this.props.callback(value, state);
    }

    callbackInputChange(value){
        if (value == '') {
            // document.querySelector('div[role="combobox"] .menu.transition').setAttribute("style", "display: block !important");
            this.setState({
                postcodes: []
            })

            return;
        }
        // var postcodes = this.state.postcodes;
        // postcodes.push({
        //     key: value,
        //     text: value,
        //     value: value
        // })

        // this.setState({
        //     postcodes: postcodes
        // });
        // return;
        var instance = this;
        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.POSTCODE_SUGGEST,
            method: 'GET',
            type: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': CONST.API.KEY
            },
            data: {
                'q': value
            },
            dataType:"json",
            success: function(response){
                // document.querySelector('div[role="combobox"]').setAttribute("style", "border-bottom: 1px solid #F36A22 !important; z-index: 100 !important");
                if(response.status_text == CONST.API.RESP.SUCCESS.status_text){
                    var suggestions = response.suggestions;
                    var postcodes = [];
                    if (typeof suggestions !== "string") {
                        for (var sindex = 0; sindex < suggestions.length; sindex++) {
                            postcodes.push({
                                key: suggestions[sindex],
                                text: suggestions[sindex],
                                value: suggestions[sindex]
                            })
                        }

                        instance.setState({
                            postcodes: postcodes
                        }, () => {
                            let options = document.querySelectorAll('div[role="listbox"] div[role="option"]');

                            if (options != null) {
                                options.forEach(option => {
                                    let html = option.innerText;
                                    let pos = html.indexOf(value);
                                    if (pos !== -1) {
                                        let substr = html.substr(pos + value.length);
                                        let newHtml = '<span class="text">' + html.substr(0, pos + value.length) + '<span style="font-weight: 700">' +
                                            substr + '</span></span>';
                                        option.innerHTML = newHtml;
                                    }
                                });
                            }
                            document.querySelector('div[role="combobox"] .menu.transition').setAttribute("style", "display: block !important");
                        })
                    } else {
                        instance.setState({
                            postcodes: postcodes,
                        });
                    }
                }
                else{
                    instance.setState({
                        postcodes: [{
                            key: 0,
                            text: '',
                            value: 0
                        }]
                    })
                }

                console.log('postcodes', instance.postcodes);
            }
        })
    }

    render() {

        var wrap_class = "form-field-wrap";

        if (this.state.field_error === CONST.FIELD_ERR.EMPTY || this.props.fieldError === CONST.FIELD_ERR.EMPTY) {
            wrap_class = wrap_class + ' error--empty';
        }

        if(this.props.msgDesc && this.props.msgDesc !== ''){
            wrap_class = wrap_class + ' has--description';
        }

        var input_wrap_class="form-field__input-wrap";

        if(this.props.type === CONST.FORM_INPUT.PASSWORD){
            input_wrap_class = input_wrap_class + ' input--has-title';
        }

        return(
            <div className={wrap_class}>
                <label className="form-field__title">{this.props.label}</label>
                <div className="hide--arrow">
                    {/* <FormSelect
                        isSearchable={true}
                        options={this.state.postcodes}
                        defaultValue={this.state.dvalue}
                        callbackInput={this.callbackInputChange}
                        callback={this.props.callback}
                        noOptionsMessage={(input) => "0 results found"}
                    /> */}
                    <CustomDropdown
                        options={this.state.postcodes}
                        value={this.props.value}
                        callbackInputChange={this.callbackInputChange}
                        callbackBlur={this.callbackBlur}
                    />
                </div>
                {/* <label className="form-field__desc">{this.props.msgDesc}</label>
                <label className="form-field__error">{this.props.msgError}</label> */}
                <label className="form-field__error">
                    <div className="msg-error--empty">{this.props.msgError}</div>
                    <div className="msg-error--check">{this.props.msgErrorCheck}</div>
                </label>
            </div>
        );

    }
}

FormPostcode.propTypes = {
    value: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    fieldError: PropTypes.string.isRequired
}

export default FormPostcode