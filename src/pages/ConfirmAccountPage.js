import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';
import ic_flag from '../assets/images/ic_flag.png'
import ic_logo from '../assets/images/ic_logo.png'
import ic_arrow_right from '../assets/images/ic_arrow_right.png'

import ic_ok from '../assets/images/ic_ok.png'
import ic_warning from '../assets/images/ic_warning.png'

import CONST from '../global/const'

import $ from 'jquery';
import Parser from 'html-react-parser'

class ConfirmAccountPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);

        var username = 'username001';
        if(typeof this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.USERNAME) != 'undefined'){
            username = this.props.cookies.get(CONST.COOKIE.SIGNUP_PAGE.USERNAME);
        }

        var confirm_token = window.location.search;
        confirm_token = confirm_token.substr(7);
        
        this.state = {
            username: username,
            confirm_token: confirm_token,
            confirmResp: {
                status_text: '',
                message: ''
            }
        }

        this.doConfirmAccount = this.doConfirmAccount.bind(this);
    }

    componentDidMount(){
        document.title = 'Confirm Account';
    }

    doConfirmAccount(){
        var instance = this;
        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.CONFIRM,
            type: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': CONST.API.KEY
            },
            data: {
                token: this.state.confirm_token
            },
            success: function(response){                
                if(response.status_text == CONST.API.RESP.SUCCESS){
                    instance.props.cookies.set(CONST.COOKIE.SIGNUP_PAGE.NEEDS_VERIFICATION, false);
                }

                instance.setState({
                    confirmResp: response
                })
            }
        })
    }
    
    render() {
        var error_msg_html = 'sd';
        var class_form_state = '';
        if(this.state.confirmResp.status_text === CONST.API.RESP.WARNING.status_text){
            class_form_state = 'form--show-warning';

            if(this.state.confirmResp.message == CONST.API.RESP.WARNING.message_invalid_expired_link){
                error_msg_html = 'This link is invalid or has expired. You will need to sign up again!';
            }
            else if(this.state.confirmResp.message == CONST.API.RESP.WARNING.message_account_already_confirmed){
                error_msg_html = 'Your account is already verified!';
            }
            else if(this.state.confirmResp.message == CONST.API.RESP.WARNING.message_something_has_happened){
                error_msg_html = 'Something has happened during verification. Please, go to your email and try again!';
            }
        }

        if(this.state.confirmResp.status_text === CONST.API.RESP.SUCCESS.status_text){
            class_form_state = 'form--show-alert';
        }

        return(
            <div className="form-page confirm-account-page">
                <div className="container">
                    <div className="form-page-top">
                        <div className="location-info">
                            <img className="location-info__flag" src={ic_flag}></img>
                            <span className="">UK, GBP | English</span>
                        </div>
                        <a href={CONST.PAGE.HOME}><img className="form-page__logo" src={ic_logo}></img></a>
                    </div>
                    
                    <div className={"form-container " + class_form_state}>
                        <div className="form-type">
                            <span className="form-type__title">VERIFY YOUR EMAIL ADDRESS<img className="form-type__icon" src={ic_arrow_right}></img></span>
                        </div>

                        <div className="form-alert">
                            <img className="form-alert__icon" src={ic_ok}></img>
                            <span className="form-alert__title">Account successfully verified. Log in and enjoy!</span>
                        </div>
                        <div className="form-warning">
                            <img className="form-warning__icon" src={ic_warning}></img>
                            <div className="form-warning__title">{Parser(error_msg_html)}</div>
                        </div>
                        
                        <div className="confirm-account-form">
                            <div className="text-form-desc confirm-account-form__title1">Hello {this.state.username}:</div>
                            <div className="text-form-desc confirm-account-form__title2">We just need to verify your email address. Click the link below, log in and enjoy!</div>
                            <div className="form-button confirm-account-form__btn">
                                <div className="form-btn-normal__text" onClick={() => this.doConfirmAccount()}>Verify Now</div>
                            </div>
                            <div className="text-form-desc confirm-account-form__title3">This link is valid for 24 hours and you can only use once</div>
                            <div className="text-form-desc confirm-account-form__title4">Thank you</div>
                            <div className="text-form-desc confirm-account-form__title5">The team of SUITOK</div>
                        </div>                         
                    </div>               
                </div>
            </div>
        );
    }
}
export default withCookies(ConfirmAccountPage)