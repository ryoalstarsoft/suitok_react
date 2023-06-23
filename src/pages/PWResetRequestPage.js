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

class PWResetRequestPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            email: '',
            fieldError: {
                email: CONST.FIELD_ERR.NONE
            },
            resetResp: {
                status_text: '',
                message: ''
            }
        }

        this.callbackEmail = this.callbackEmail.bind(this);
        this.doResetPasswordRequest = this.doResetPasswordRequest.bind(this);
    }

    componentDidMount(){
        document.title = 'Reset Password Request';
    }

    callbackEmail(data){
        var fieldError = this.state.fieldError;
        if(data !== ''){
            fieldError.email = CONST.FIELD_ERR.NONE;
        }

        this.setState({
            email: data,
            fieldError: fieldError
        })
    }

    doResetPasswordRequest(){
        var instance = this;
        var bError = false;
        var fieldError = this.state.fieldError;

        if(this.state.email === ''){
            bError = true;
            fieldError.email = CONST.FIELD_ERR.EMPTY;
        }
        else{
            fieldError.email = CONST.FIELD_ERR.NONE;
        }

        if(bError){
            this.setState({
                fieldError: fieldError
            });

            return;
        }

        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.RESET_PASSWORD_REQUEST,
            type: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': CONST.API.KEY
            },
            data: {
                email: instance.state.email,
            },
            success: function(response){
                if(response.status_text === CONST.API.RESP.SUCCESS.status_text){
                    // instance.props.cookies.set(CONST.COOKIE.GLOBAL.USERNMAE, response.username);
                    instance.props.cookies.set(CONST.COOKIE.RESET_PW_PAGE.EMAIL, response.email);

                    window.location.href = CONST.PAGE.RESET_PASS_REQUEST_SENT;
                }
                else{
                    instance.setState({
                        resetResp : response
                    })
                }

            }
        })
    }

    render() {

        var error_msg_html = '';

        console.log('sdfadfasd');

        return(
            <div className="form-page forgetpw-page">
                <div className="container before-reset-password-progress">
                    <div className="form-page-top">
                        <div className="location-info">
                            <img className="location-info__flag" src={ic_flag}></img>
                            <span className="">UK, GBP | English</span>
                        </div>
                        <a href={CONST.PAGE.HOME}><img className="form-page__logo" src={ic_logo}></img></a>
                    </div>

                    <div className="form-container">
                        <div className="form-type form-type--right-side">
                            <span className="form-type__title from-type--disable form-type--left" onClick={() => window.location.href=CONST.PAGE.SIGNUP}>NEW TO SUITOK.COM?<img className="form-type__icon" src={ic_arrow_right}></img></span>
                            <span className="form-type__sep"></span>
                            <span className="form-type__title form-type--right"><img className="form-type__icon" src={ic_arrow_left}></img>EXISTING CUSTOMER</span>
                        </div>
                        <div className="form-alert">
                            <img className="form-alert__icon" src={ic_ok}></img>
                            <span className="form-alert__title">Confirmation Email sent</span>
                        </div>
                        <div className="form-warning">
                            <img className="form-warning__icon" src={ic_warning}></img>
                            <div className="form-warning__title">{Parser(error_msg_html)}</div>
                        </div>
                        <div className="ask-email-form">
                            <div className="form-desc">If you've forgotten your password, enter your e-mail address and we'll send you an e-mail telling you how to recover it.</div>
                            <div className="form-fields">
                                <FormInput
                                    label="Email address"
                                    value={this.state.email}
                                    fieldError={this.state.fieldError.email}
                                    msgError="Your email address is empty"
                                    msgErrorCheck="Existing email: Write a new one"
                                    callback={this.callbackEmail}
                                ></FormInput>
                                <div className="form-button" onClick={() => this.doResetPasswordRequest()}>
                                    <div className="form-btn-normal__text">reset password</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withCookies(PWResetRequestPage)