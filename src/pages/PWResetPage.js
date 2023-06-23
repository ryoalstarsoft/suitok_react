import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';

import ic_flag from '../assets/images/ic_flag.png'
import ic_logo from '../assets/images/ic_logo.png'
import ic_arrow_right from '../assets/images/ic_arrow_right.png'
import ic_arrow_left from '../assets/images/ic_arrow_left.png'

import ic_ok from '../assets/images/ic_ok.png'
import ic_warning from '../assets/images/ic_warning.png'

import FormInput from '../components/Form/FormInput'
import CONST from '../global/const'

import $ from 'jquery';
import Parser from 'html-react-parser'

class PWResetPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);

        if(typeof this.props.cookies.get(CONST.COOKIE.RESET_PW_PAGE.TOKEN) == 'undefined'){
            window.location.href = CONST.PAGE.RESET_PASS_REQUEST;
            return;
        }

        var reset_pw_token = this.props.cookies.get(CONST.COOKIE.RESET_PW_PAGE.TOKEN);

        this.state = {
            password: '',
            confirmpassword: '',
            reset_pw_token: reset_pw_token,

            fieldError: {
                password: CONST.FIELD_ERR.NONE,
                confirmpassword: CONST.FIELD_ERR.NONE,
            },

            resetResp: {
                status_text: '',
                message: ''
            }
        }

        this.callbackPassword = this.callbackPassword.bind(this);
        this.callbackConfirmPassword = this.callbackConfirmPassword.bind(this);

        this.doChangePassword = this.doChangePassword.bind(this);
    }

    componentDidMount(){
        document.title = 'Reset Password';
    }

    callbackPassword(data) {
        var fieldError = this.state.fieldError;
        if(data !== ''){
            fieldError.password = CONST.FIELD_ERR.NONE;
        }

        this.setState({
            password: data,
            fieldError: fieldError
        })
    }

    callbackConfirmPassword(data) {
        var fieldError = this.state.fieldError;
        if(data !== ''){
            fieldError.confirmpassword = CONST.FIELD_ERR.NONE;
        }

        this.setState({
            confirmpassword: data,
            fieldError: fieldError
        })
    }

    doChangePassword(){
        var instance = this;
        var bError = false;
        var fieldError = this.state.fieldError;

        if(this.state.password === ''){
            bError = true;
            fieldError.password = CONST.FIELD_ERR.EMPTY;
        }

        if(this.state.confirmpassword === ''){
            bError = true;
            fieldError.confirmpassword = CONST.FIELD_ERR.EMPTY;
        }

        if(this.state.password !== this.state.confirmpassword){
            bError = true;
            fieldError.confirmpassword = CONST.FIELD_ERR.EMPTY;
        }

        if(bError){
            this.setState({
                fieldError: fieldError
            });

            return;
        }

        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.RESET_PASSWORD,
            type: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': CONST.API.KEY
            },
            data: {
                token: instance.state.reset_pw_token,
                password: instance.state.password,
            },
            success: function(response){
                instance.setState({
                    resetResp: response
                })
            }
        })
    }

    render() {

        var error_msg_html = 'sd';
        var class_form_state = '';
        if(this.state.resetResp.status_text === CONST.API.RESP.WARNING.status_text){
            class_form_state = 'form--show-warning';

            if(this.state.resetResp.message == CONST.API.RESP.WARNING.message_invalid_expired_link){
                error_msg_html = 'This link is invalid or has expired. <a href="' + CONST.PAGE.RESET_PASS_REQUEST + '">Resend link</a>';
            }
            else if(this.state.resetResp.message == CONST.API.RESP.WARNING.message_link_used_before){
                error_msg_html = 'This link has already been used';
            }
            else if(this.state.resetResp.message == CONST.API.RESP.WARNING.message_something_has_happened){
                error_msg_html = 'Something has happened and your password could not be changed. Please, go to your email and try again!';
            }
            else if(this.state.resetResp.message == CONST.API.RESP.WARNING.message_user_pending_confirmation){
                error_msg_html = 'Your account is currently awaiting confirmation. Confirmation was sent to username001@gmail.com. Please check your email, or <a href="' + CONST.PAGE.RESET_PASS_REQUEST + '"> click here to resend confimation email</a>';
            }
        }

        if(this.state.resetResp.status_text === CONST.API.RESP.SUCCESS.status_text){
            class_form_state = 'form--show-alert';
        }

        return(
            <div className="form-page reset-pw-page">
                <div className="container before-reset-password-progress">
                    <div className="form-page-top">
                        <div className="location-info">
                            <img className="location-info__flag" src={ic_flag}></img>
                            <span className="">UK, GBP | English</span>
                        </div>
                        <a href={CONST.PAGE.HOME}><img className="form-page__logo" src={ic_logo}></img></a>
                    </div>

                    <div className={"form-container reset-pw-form " + class_form_state}>
                        <div className="form-type form-type--right-side">
                            <span className="form-type__title from-type--disable form-type--left" onClick={() => window.location.href=CONST.PAGE.SIGNUP}>NEW TO SUITOK.COM?<img className="form-type__icon" src={ic_arrow_right}></img></span>
                            <span className="form-type__sep"></span>
                            <span className="form-type__title form-type--right"><img className="form-type__icon" src={ic_arrow_left}></img>EXISTING CUSTOMER</span>
                        </div>
                        <div className="form-alert">
                            <img className="form-alert__icon" src={ic_ok}></img>
                            <span className="form-alert__title">Your password was successfulfy changed.</span>
                        </div>
                        <div className="form-warning">
                            <img className="form-warning__icon" src={ic_warning}></img>
                            <div className="form-warning__title">{Parser(error_msg_html)}</div>
                        </div>
                        <div className="form-fields">
                            <div className="form__title">reset password</div>
                            <FormInput
                                type={CONST.FORM_INPUT.PASSWORD}
                                label="New Password"
                                msgError="Your new password is empty"
                                msgDesc="Must be 8 or more characters and contain at least 1 number"
                                value={this.state.password}
                                fieldError={this.state.fieldError.password}
                                callback={this.callbackPassword}
                                hasTitle={false}
                            ></FormInput>
                            <FormInput
                                type={CONST.FORM_INPUT.PASSWORD}
                                label="Confirm New Password"
                                msgError="Your confirm new password is empty"
                                value={this.state.password}
                                fieldError={this.state.fieldError.confirmpassword}
                                callback={this.callbackConfirmPassword}
                                hasTitle={false}
                            ></FormInput>
                            <div className="form-button" onClick={() => this.doChangePassword()}>
                                <div className="form-btn-normal__text">change password</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withCookies(PWResetPage)