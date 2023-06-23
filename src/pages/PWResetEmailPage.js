import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';

import ic_flag from '../assets/images/ic_flag.png'
import ic_logo from '../assets/images/ic_logo.png'
import ic_arrow_right from '../assets/images/ic_arrow_right.png'

import CONST from '../global/const'

class PWResetEmailPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);

        this.state = {
            username: ''
        }

        var reset_pw_token = window.location.search;
        reset_pw_token = reset_pw_token.substr(7);
        
        this.props.cookies.set(CONST.COOKIE.RESET_PW_PAGE.TOKEN, reset_pw_token);

        this.goResetPWPage = this.goResetPWPage.bind(this);
    }

    componentDidMount(){
        document.title = 'Reset Password Email';
    }
    
    goResetPWPage(){
        window.location.href = CONST.PAGE.RESET_PASS;
    }

    render() {

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
                    
                    <div className="form-container">
                        <div className="form-type">
                            <span className="form-type__title">RESET YOUR PASSWORD<img className="form-type__icon" src={ic_arrow_right}></img></span>
                        </div>
                        
                        <div className="confirm-account-form">
                            <div className="text-form-desc confirm-account-form__title1">Hello {this.state.username}:</div>
                            <div className="text-form-desc confirm-account-form__title2">You have forgotten your password. Don't worry! Click on this link to change it.</div>
                            <div className="form-button confirm-account-form__btn">
                                <div className="form-btn-normal__text" onClick={() => this.goResetPWPage()}>Reset Password</div>
                            </div>
                            <div className="text-form-desc confirm-account-form__title3">This link is valid for 3 hours and you can only use once</div>
                            <div className="text-form-desc confirm-account-form__title4">Thank you</div>
                            <div className="text-form-desc confirm-account-form__title5">The team of SUITOK</div>
                        </div>                         
                    </div>               
                </div>
            </div>
        );
    }
}
export default withCookies(PWResetEmailPage)