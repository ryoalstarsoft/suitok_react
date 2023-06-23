import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';

import ic_flag from '../assets/images/ic_flag.png'
import ic_logo from '../assets/images/ic_logo.png'
import ic_arrow_right from '../assets/images/ic_arrow_right.png'
import ic_arrow_left from '../assets/images/ic_arrow_left.png'
import ic_ok from '../assets/images/ic_ok.png'

import CONST from '../global/const'

import $ from 'jquery';

class PWResetRequestSentPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);

        var email = '';
        
        if(typeof this.props.cookies.get(CONST.COOKIE.RESET_PW_PAGE.EMAIL) != 'undefined'){
            email = this.props.cookies.get(CONST.COOKIE.RESET_PW_PAGE.EMAIL);
        }

        if(email == ''){
            // window.location.href = CONST.PAGE.RESET_PASS_REQUEST;
            // return;
        }

        this.state = {
            email: email,
            resendResp: {
                status_text: '',
                message: ''
            }
        }

        this.goLoginPage = this.goLoginPage.bind(this);
        this.doResendEmail = this.doResendEmail.bind(this);
    }

    componentDidMount(){
        document.title = 'Reset Password Request Sent';
    }

    goLoginPage(){
        window.location.href = CONST.PAGE.LOGIN;
    }

    doResendEmail(){
        var instance = this;
        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.RESET_PASSWORD_REQUEST,
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

        var class_form_status = '';
        if(this.state.resendResp.status_text == CONST.API.RESP.SUCCESS.status_text){
            class_form_status = 'form--show-alert';
        }

        return(
            <div className="form-page sent-email-page">
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
                        <div className={"sent-email-form " + class_form_status}>
                            <div className="form-alert">
                                <img className="form-alert__icon" src={ic_ok}></img>
                                <span className="form-alert__title">Email sent</span>
                            </div>
                            <div className="text-form-desc sent-email-form__title1">We've sent a reset password email to: </div>
                            <div className="text-form-desc sent-email-form__title2">{this.state.email}</div>
                            <div className="text-form-desc sent-email-form__title3">To create a new password, click the link in the email and enter a new one</div>
                            <div className="text-form-desc sent-email-form__title4">Didn't receive the email?</div>
                            <div className="text-form-desc sent-email-form__title5"> Check your junk mail or send me another.</div>
                            <div className="form-btn-container">
                                <div className="form-btn-col-2">
                                    <div className="form-button" onClick={() => this.goLoginPage()}>
                                        <div className="form-btn-normal__text">Login</div>
                                    </div>
                                </div>
                                <div className="form-btn-col-2">
                                    <div className="form-button button--outline" onClick={() => this.doResendEmail()}>
                                        <div className="form-btn-normal__text">resend email</div>
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
export default withCookies(PWResetRequestSentPage)