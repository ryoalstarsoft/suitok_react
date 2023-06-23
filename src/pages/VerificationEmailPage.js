import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';
import ic_flag from '../assets/images/ic_flag.png'
import ic_logo from '../assets/images/ic_logo.png'
import ic_arrow_right from '../assets/images/ic_arrow_right.png'
import ic_arrow_left from '../assets/images/ic_arrow_left.png'

import ic_ok from '../assets/images/ic_ok.png'
import ic_warning from '../assets/images/ic_warning.png'

import CONST from '../global/const'

import $ from 'jquery';

import Parser from 'html-react-parser'

class VerificationEmailPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);

        var needs_verification = false;
        if(typeof this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.NEEDS_VERIFICATION) != 'undefined'){
            needs_verification = this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.NEEDS_VERIFICATION);
        }

        if(!needs_verification){
            // window.location.href = CONST.PAGE.SIGNUP;
            // return;
        }

        var username = '';
        if(typeof this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.USERNAME) != 'undefined'){
            username = this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.USERNAME);
        }

        var email = '';
        if(typeof this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.EMAIL) != 'undefined'){
            email = this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.EMAIL);
        }

        this.state = {
            'email': email,
            'username' : username,

            resendResp: {
                status_text: '',
                message: ''
            },

        }

        this.doResendEmail = this.doResendEmail.bind(this);
        this.goLoginPage = this.goLoginPage.bind(this);

    }

    componentDidMount(){
        document.title = 'Verification Email';
    }

    goLoginPage(){
        window.location.href = CONST.PAGE.LOGIN;
    }

    doResendEmail(){
        var instance = this;
        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.RESEND_CONFIRMATION,
            type: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': CONST.API.KEY
            },
            data: {
                email: this.state.email,
            },
            success: function(response){
                instance.setState({
                    resendResp: response
                })
            }
        })
    }

    render() {

        var form_hide__signup_sent = '';
        var error_msg_html = '';

        if(this.state.resendResp.status_text === CONST.API.RESP.SUCCESS.status_text){
            form_hide__signup_sent = form_hide__signup_sent + ' form--show-alert';
        }
        else if(this.state.resendResp.status_text === CONST.API.RESP.WARNING.status_text){
            form_hide__signup_sent = form_hide__signup_sent + ' form--show-warning';
            if(this.state.resendResp.message === CONST.API.RESP.WARNING.message_confirmation_expired){
                error_msg_html = 'The period for your account verification has expired. You need to sign up.';
            }
            else if(this.state.resendResp.message === CONST.API.RESP.WARNING.message_account_already_confirmed){
                error_msg_html = 'Your account is already verified!';
            }
            else if(this.state.resendResp.message === CONST.API.RESP.WARNING.message_something_has_happened){
                error_msg_html = 'Oops! Something went wrong. <a href="">Click here to resend verification email.</a>';
            }
        }

        return(
            <div className="form-page verification-email-page">
                <div className="container">
                    <div className="form-page-top">
                        <div className="location-info">
                            <img className="location-info__flag" src={ic_flag}></img>
                            <span className="">UK, GBP | English</span>
                        </div>
                        <a href={CONST.PAGE.HOME}><img className="form-page__logo" src={ic_logo}></img></a>
                    </div>

                    <div className="form-container">
                        <div className="form-type form-type--left-side">
                            <span className="form-type__title form-type--left">
                                <a href={CONST.PAGE.SIGNUP}>NEW TO SUITOK.COM?</a>
                                <img className="form-type__icon" src={ic_arrow_right}></img>
                            </span>
                            <span className="form-type__sep"></span>
                            <span className="form-type__title from-type--disable form-type--right" onClick={() => window.location.href=CONST.PAGE.LOGIN}><img className="form-type__icon" src={ic_arrow_left}></img>EXISTING CUSTOMER</span>
                        </div>
                        <div className={"verification-email-form " + form_hide__signup_sent}>
                            <div className="form-alert">
                                <img className="form-alert__icon" src={ic_ok}></img>
                                <span className="form-alert__title">Confirmation Email sent</span>
                            </div>
                            <div className="form-warning">
                                <img className="form-warning__icon" src={ic_warning}></img>
                                <div className="form-warning__title">{Parser(error_msg_html)}</div>
                            </div>
                            <div className="text-form-desc verification-email-form__title1">Hello {this.state.username}:</div>
                            <div className="text-form-desc verification-email-form__title2">Thank you for joining SUITOK. We've sent you a verification email to:</div>
                            <div className="text-form-desc verification-email-form__title3">{this.state.email} </div>
                            <div className="text-form-desc verification-email-form__title4">Please, activate your account with the link in this email.</div>
                            <div className="text-form-desc verification-email-form__title5">Didn't receive the email?</div>
                            <div className="text-form-desc verification-email-form__title6"> Check your junk mail or send me another.</div>
                            <div className="form-btn-container">
                                <div className="form-btn-col-2">
                                    <div className="form-button">
                                        <div className="form-btn-normal__text" onClick={() => this.goLoginPage()}>Login</div>
                                    </div>
                                </div>
                                <div className="form-btn-col-2">
                                    <div className="form-button button--outline">
                                        <div className="form-btn-normal__text" onClick={() => this.doResendEmail()}>resend email</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withCookies(VerificationEmailPage)