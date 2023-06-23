import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CONST from '../../global/const'

import ic_ok from '../../assets/images/ic_ok.png'
import ic_delete from '../../assets/images/ic_delete.png'

class FormInput extends Component {
    constructor(props) {
        super(props);

        var input_type = 'text';
        if (this.props.type === CONST.FORM_INPUT.PASSWORD) {
            input_type = 'password';
        }

        this.state = {
            value: this.props.value,
            field_error: this.props.fieldError,
            input_type: input_type
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.switchType = this.switchType.bind(this);
    }

    componentDidMount() {

    }

    switchType(event) {
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            input_type: this.state.input_type === 'input' ? 'password' : 'input'
        })
    }

    handleChange(event) {
        if (event.target.value === '') {
            this.setState({
                'value': event.target.value,
                'field_error': CONST.FIELD_ERR.EMPTY
            })
        }
        else {
            this.setState({
                'value': event.target.value,
                'field_error': CONST.FIELD_ERR.NONE
            })
        }
    }

    handleBlur(event) {
        if (event.target.value === '') {
            this.setState({
                'value': event.target.value,
                field_error: CONST.FIELD_ERR.EMPTY
            })
        }
        else {
            this.setState({
                'value': event.target.value,
                field_error: CONST.FIELD_ERR.NONE
            })
        }
        this.props.callback(event.target.value);
    }

    render() {

        var wrap_class = "form-field-wrap";

        var ic_form_field = ic_ok;

        if (this.state.field_error === CONST.FIELD_ERR.EMPTY
            || this.props.fieldError === CONST.FIELD_ERR.EMPTY) {
            wrap_class = wrap_class + ' error--empty';
        }
        else if (this.props.fieldError === CONST.FIELD_ERR.CHECK_ERROR) {
            wrap_class = wrap_class + ' error--empty check--error';
            ic_form_field = ic_delete;
        }
        else if (this.props.fieldError === CONST.FIELD_ERR.CHECK_OK) {
            wrap_class = wrap_class + ' check--ok';
            ic_form_field = ic_ok;
        }

        if (this.props.msgDesc && this.props.msgDesc !== '') {
            wrap_class = wrap_class + ' has--description';
        }
        else {
            wrap_class = wrap_class + ' has--no-description';
        }

        var input_wrap_class = "form-field__input-wrap";

        if (this.props.type === CONST.FORM_INPUT.PASSWORD) {
            if (typeof this.props.hasTitle == 'undefined' || this.props.hasTitle) {
                input_wrap_class = input_wrap_class + ' input--has-title';
            }

            wrap_class = wrap_class + ' field--password';
        }

        if (this.props.fieldError === CONST.FIELD_ERR.CHECK_ERROR || this.props.fieldError === CONST.FIELD_ERR.CHECK_OK) {
            input_wrap_class = input_wrap_class + ' input--has-icon';
        }

        console.log(this.props.maxLength);

        return (
            <div className={wrap_class}>
                <label className="form-field__title">{this.props.label}</label>
                <div className={input_wrap_class}>
                    {this.props.maxLength == undefined ?
                        <input type={this.state.input_type} className="" value={this.state.value}
                            name={this.props.label}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur} />
                            :
                        <input type={this.state.input_type} className="" value={this.state.value}
                            name={this.props.label}
                            onChange={this.handleChange}
                            onBlur={this.handleBlur}
                            maxLength={this.props.maxLength} />
                    }
                    <label className="form-field__input-title" onClick={this.switchType}>{this.state.input_type === 'password' ? 'show' : 'hide'}</label>
                    <img className="form-field__icon" src={ic_form_field}></img>
                </div>
                <label className="form-field__error">
                    <div className="msg-error--empty">{this.props.msgError}</div>
                    {/* <div className="msg-error--check">{this.props.msgErrorCheck}</div> */}
                </label>
                <label className="form-field__desc">{this.props.msgDesc}</label>
            </div>
        );
    }
}

FormInput.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    fieldError: PropTypes.string.isRequired,
    msgError: PropTypes.string.isRequired,
    msgErrorCheck: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    maxLength: PropTypes.number
}

export default FormInput
