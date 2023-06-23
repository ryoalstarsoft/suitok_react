import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';

import ic_flag from '../assets/images/ic_flag.png'
import ic_logo from '../assets/images/ic_logo.png'
import ic_arrow_right from '../assets/images/ic_arrow_right.png'
import ic_arrow_left from '../assets/images/ic_arrow_left.png'
import FormInput from '../components/Form/FormInput'
import CONST from '../global/const'

class ForgetPWPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Forgot Password';
    }
    
    render() {

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
                        <div className="form-type">
                            <span className="form-type__title from-type--disable form-type--left">NEW TO SUITOK.COM?<img className="form-type__icon" src={ic_arrow_right}></img></span>
                            <span className="form-type__sep"></span>
                            <span className="form-type__title form-type--right"><img className="form-type__icon" src={ic_arrow_left}></img>EXISTING CUSTOMER</span>
                        </div>
                        <div className="ask-email-form">
                            <div className="form-desc">If you've forgotten your password, enter your e-mail address and we'll send you an e-mail telling you how to recover it.</div>
                            <div className="form-fields">
                                <FormInput 
                                    hasError={false}
                                    label="Email Address"
                                    msgError="Your email address is empty"
                                ></FormInput>
                                <div className="form-button">
                                    <div className="form-btn-normal__text">reset password</div>
                                </div>
                            </div>
                        </div>    
                        <div className="sent-email-form">
                            <div className="text-form-desc sent-email-form__title1">We've sent a reset password email to: </div>
                            <div className="text-form-desc sent-email-form__title2">user001@hotmail.com </div>
                            <div className="text-form-desc sent-email-form__title3">To create a new password, click the link in the email and enter a new one</div>
                            <div className="text-form-desc sent-email-form__title4">Didn't receive the email?</div>
                            <div className="text-form-desc sent-email-form__title5"> Check your junk mail or send me another.</div>
                            <div className="form-btn-container">
                                <div className="form-btn-col-2">
                                    <div className="form-button">
                                        <div className="form-btn-normal__text">Login</div>
                                    </div>
                                </div>
                                <div className="form-btn-col-2">
                                    <div className="form-button button--outline">
                                        <div className="form-btn-normal__text">resend email</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
                <div className="container when-reset-password-progress">
                    <div className="form-page-top">
                        <div className="location-info">
                            <img className="location-info__flag" src={ic_flag}></img>
                            <span className="">UK, GBP | English</span>
                        </div>
                        <a href={CONST.PAGE.HOME}><img className="form-page__logo" src={ic_logo}></img></a>
                    </div>
                    
                    <div className="form-container">
                        <div className="form-type">
                            <span className="form-type__title">RESET YOUR PASSWORD<img className="form-type__icon" src={ic_arrow_right}></img></span>
                        </div>
                        
                        <div className="text-form-desc sent-email-form__title1">We've sent a reset password email to: </div>
                        <div className="text-form-desc sent-email-form__title2">user001@hotmail.com </div>
                        <div className="text-form-desc sent-email-form__title3">To create a new password, click the link in the email and enter a new one</div>
                        <div className="text-form-desc sent-email-form__title4">Didn't receive the email?</div>
                        <div className="text-form-desc sent-email-form__title5"> Check your junk mail or send me another.</div>
                        <div className="form-btn-container">
                            <div className="form-btn-col-2">
                                <div className="form-button">
                                    <div className="form-btn-normal__text">Login</div>
                                </div>
                            </div>
                            <div className="form-btn-col-2">
                                <div className="form-button button--outline">
                                    <div className="form-btn-normal__text">resend email</div>
                                </div>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        );
    }
}
export default withCookies(ForgetPWPage)