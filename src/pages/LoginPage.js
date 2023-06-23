import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';
import ic_flag from '../assets/images/ic_flag.png'
import ic_logo from '../assets/images/ic_logo.png'
import ic_arrow_right from '../assets/images/ic_arrow_right.png'
import ic_arrow_left from '../assets/images/ic_arrow_left.png'
import ic_btn_facebook from '../assets/images/ic_btn_facebook.png'
import ic_btn_google from '../assets/images/ic_btn_google.png'
import ic_btn_twitter from '../assets/images/ic_btn_twitter.png'
import ic_ok from '../assets/images/ic_ok.png'
import ic_warning from '../assets/images/ic_warning.png'
import ic_delete from '../assets/images/ic_delete.png'

import FormInput from '../components/Form/FormInput'
import CONST from '../global/const'

import $ from 'jquery';

import Parser from 'html-react-parser'

class LoginPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);

        this.state = {
            username: '',
            password: '',

            fieldError: {
                username: CONST.FIELD_ERR.NONE,
                password: CONST.FIELD_ERR.NONE,
            },

            loginWarning: false,
            loginMessage: '',
            loginEmail: ''
        }

        this.callbackUsername = this.callbackUsername.bind(this);
        this.callbackPassword = this.callbackPassword.bind(this);

        this.doLogin = this.doLogin.bind(this);

        this.goForgetPage = this.goForgetPage.bind(this);
    }

    componentDidMount(){
        document.title = 'Login';
    }

    goForgetPage(){
        window.location.href = CONST.PAGE.RESET_PASS_REQUEST;
    }

    callbackUsername(data){
        var fieldError = this.state.fieldError;
        if(data !== ''){
            fieldError.username = CONST.FIELD_ERR.NONE;
        }

        this.setState({
            username: data,
            fieldError: fieldError
        })
    }

    callbackPassword(data){
        var fieldError = this.state.fieldError;
        if(data !== ''){
            fieldError.password = CONST.FIELD_ERR.NONE;
        }

        this.setState({
            password: data,
            fieldError: fieldError
        })
    }

    doLogin(){
        var instance = this;
        var bError = false;
        var fieldError = this.state.fieldError;

        if(this.state.username === ''){
            bError = true;
            fieldError.username = CONST.FIELD_ERR.EMPTY;
        }

        if(this.state.password === ''){
            bError = true;
            fieldError.password = CONST.FIELD_ERR.EMPTY;
        }

        if(bError){
            this.setState({
                fieldError: fieldError
            });

            return;
        }

        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.LOGIN,
            type: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': CONST.API.KEY
            },
            data: {
                username: instance.state.username,
                password: instance.state.password,
            },
            success: function(response){
                if(response.status_text === CONST.API.RESP.SUCCESS.status_text){
                    instance.setState({
                        formtype: CONST.FORM.SIGNUP_SENT,
                        username: response.username
                    })

                    instance.props.cookies.set(CONST.COOKIE.GLOBAL.TOKEN, response.token)
                    instance.props.cookies.set(CONST.COOKIE.GLOBAL.USERNMAE, response.username)
                    instance.props.cookies.set(CONST.COOKIE.GLOBAL.GENDER, response.gender)

                    window.location.href=CONST.PAGE.MAIN;
                }
                else if(response.status_text === CONST.API.RESP.WARNING.status_text){
                    instance.setState({
                        loginWarning: true,
                        loginMessage:response.message,
                        loginEmail: response.email
                    })
                }

            }
        })
    }

    render() {

        var class_show_alert = '';
        var error_msg_html = ''
        if(this.state.loginWarning){
            class_show_alert = 'form--show-warning';

            if(this.state.loginMessage == CONST.API.RESP.WARNING.message_invalid_credentials){
                error_msg_html = 'The email/username or password you entered is incorrect. Please try again!';
            }

            if(this.state.loginMessage == CONST.API.RESP.WARNING.message_user_pending_confirmation){
                error_msg_html = 'Your account is currently Awaiting confirmation. Confirmation was sent to ' + this.state.loginEmail + '. <br><br> Please check your email, or <a className="lp-error__text--link" href="' + CONST.PAGE.CONFIRM_EMAIL + '">click here to resend confimation email</a>'
            }
        }
        return(
            <div className="form-page login-page">
                <div className="container">
                    <div className="form-page-top">
                        <div className="location-info">
                            <img className="location-info__flag" src={ic_flag}></img>
                            <span className="">UK, GBP | English</span>
                        </div>
                        <a href={CONST.PAGE.HOME}><img className="form-page__logo" src={ic_logo}></img></a>
                    </div>

                    <div className="form-container login-form">
                        <div className="form-type form-type--right-side">
                            <span className="form-type__title from-type--disable form-type--left" onClick={() => window.location.href=CONST.PAGE.SIGNUP}>NEW TO SUITOK.COM?<img className="form-type__icon" src={ic_arrow_right}></img></span>
                            <span className="form-type__sep"></span>
                            <span className="form-type__title form-type--right"><img className="form-type__icon" src={ic_arrow_left}></img>EXISTING CUSTOMER</span>
                        </div>
                        <div className={"form-fields " + class_show_alert}>
                            <div className="form__title">log in to your account</div>
                            {/* <div className="form-alert">
                                <img className="form-alert__icon" src={ic_ok}></img>
                                <span className="form-alert__title">Account successfully verified. Log in and enjoy!</span>
                            </div> */}
                            <div className="form-warning">
                                <img className="form-warning__icon" src={ic_warning}></img>
                                <div className="form-warning__title">{Parser(error_msg_html)}</div>
                            </div>
                            <FormInput
                                hasError={false}
                                value={this.state.username}
                                fieldError={this.state.fieldError.username}
                                label="Email or Username"
                                msgError="Your email/username is empty"
                                callback={this.callbackUsername}
                            ></FormInput>
                            <FormInput
                                value={this.state.password}
                                type={CONST.FORM_INPUT.PASSWORD}
                                fieldError={this.state.fieldError.password}
                                label="Password"
                                msgError="Your password is empty"
                                callback={this.callbackPassword}
                            ></FormInput>
                            <div className="form-button" onClick={this.doLogin}>
                                <div className="form-btn-normal__text">Login</div>
                            </div>

                            <div className="form-forget-title" onClick={() => this.goForgetPage()}>Did you forget your password?</div>

                            <div className="form-middle-with">
                                <div className="form-middle-with__midline"></div>
                                <div className="form-middle-with__title">or log in with</div>
                                <div className="form-middle-with__midline"></div>
                            </div>

                            <div className="form-social-btn-container">
                                <div className="form-social-btn">
                                    <img className="form-social-btn__icon" src={ic_btn_facebook}></img>
                                    <span className="form-social-btn__title">facebook</span>
                                </div>
                                <div className="form-social-btn">
                                    <img className="form-social-btn__icon" src={ic_btn_google}></img>
                                    <span className="form-social-btn__title">google</span>
                                </div>
                                <div className="form-social-btn">
                                    <img className="form-social-btn__icon" src={ic_btn_twitter}></img>
                                    <span className="form-social-btn__title">twitter</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}
export default withCookies(LoginPage)