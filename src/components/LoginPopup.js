import React, {Component} from 'react'
import ReactDOM from 'react-dom'

import ic_arrow_right from '../assets/images/ic_arrow_right.png'
import ic_btn_facebook from '../assets/images/ic_btn_facebook.png'
import ic_btn_google from '../assets/images/ic_btn_google.png'
import ic_btn_twitter from '../assets/images/ic_btn_twitter.png'
import ic_warning from '../assets/images/ic_warning.png'
import ic_close from '../assets/images/ic_close.png'

import $ from 'jquery'
import CONST from '../global/const'
import Parser from 'html-react-parser'

class LoginPopup extends Component {

    constructor(props){
        super(props);

        this.state = {
            'username' :'',
            'password': '',
            'status_text': '',
            'message': '',
            'password_input_type': 'password',
            'username_field_error': CONST.FIELD_ERR.NONE,
            'password_field_error': CONST.FIELD_ERR.NONE,
        }

        this.showPassword = this.showPassword.bind(this);

        this.changeUsername = this.changeUsername.bind(this);
        this.blurUsername = this.blurUsername.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.blurPassword = this.blurPassword.bind(this);

        this.doLogin = this.doLogin.bind(this);
    }

    componentDidMount(){       
    }

    showPassword(event){
        event.preventDefault();
        event.stopPropagation();

        this.setState({
            'password_input_type': this.state.password_input_type === 'input' ? 'password' : 'input'
        })
    }

    changeUsername(event){
        if(event.target.value === ''){
            this.setState({
                'username': event.target.value,
                // username_field_error: CONST.FIELD_ERR.EMPTY
            })
        }
        else{
            this.setState({
                'username': event.target.value,
                username_field_error: CONST.FIELD_ERR.NONE
            })
        }
    }

    blurUsername(event){
        if(event.target.value === ''){
            this.setState({
                'username': event.target.value,
                username_field_error: CONST.FIELD_ERR.EMPTY
            })
        }
        else{
            this.setState({
                'username': event.target.value,
                username_field_error: CONST.FIELD_ERR.NONE
            })
        }
    }

    changePassword(event){
        if(event.target.value === ''){
            this.setState({
                'password': event.target.value,
                // password_field_error: CONST.FIELD_ERR.EMPTY
            })
        }
        else{
            this.setState({
                'password': event.target.value,
                password_field_error: CONST.FIELD_ERR.NONE
            })
        }
    }

    blurPassword(event){
        if(event.target.value === ''){
            this.setState({
                'password': event.target.value,
                password_field_error: CONST.FIELD_ERR.EMPTY
            })
        }
        else{
            this.setState({
                'password': event.target.value,
                password_field_error: CONST.FIELD_ERR.NONE
            })
        }
    }

    checkPasswordInvalid(password){
        var letters = /^[0-9a-zA-Z]+$/;
        if(letters.test(password))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    doLogin(){
        var bcontniue = true;
        var username_field_error = CONST.FIELD_ERR.NONE;
        var password_field_error = CONST.FIELD_ERR.NONE;

        if(this.state.username === ''){
            username_field_error = CONST.FIELD_ERR.EMPTY;
            bcontniue = false;
        }

        if(this.state.password === ''){
            password_field_error = CONST.FIELD_ERR.EMPTY;
            bcontniue = false;
        }

        if(!bcontniue){
            this.setState({
                username_field_error: username_field_error,
                password_field_error: password_field_error,
            })
            return;
        }

        if(!this.checkPasswordInvalid(this.state.password)){
            this.setState({
                'status_text': CONST.API.RESP.INVALID.status_text,
                'message': CONST.API.RESP.INVALID.message,
            })
            this.props.updateDimensions();
            return;
        }

        this.setState({
            status_text: ''
        });

        var instance = this;
        
        $.ajax({
            url: CONST.API.BASE_URL + CONST.API.URLS.LOGIN,
            type: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-API-KEY': CONST.API.KEY
            },
            data: {
                username: this.state.username,
                password: this.state.password
            },

            success: function(response){
                if(response.status_text === CONST.API.RESP.SUCCESS.status_text){
                    instance.setState({
                        'status_text': response.status_text,
                        'token': response.token,
                        'username': response.username,
                        'gender': response.gender,
                        username: '',
                        password: '',
                    })

                    instance.props.passLogin(response);
                    instance.props.updateDimensions();
                }
                else if(response.message === CONST.API.RESP.PENDING.message){
                    instance.setState({
                        'status_text': response.status_text,
                        'message': response.message,
                        'email': response.email
                    })
                    instance.props.updateDimensions();
                    // instance.inp_username.focus();
                }
                else{
                    instance.setState({
                        'status_text': response.status_text,
                        'message': response.message,
                        'username_field_error': CONST.FIELD_ERR.INCORRECT,
                        'password_field_error': CONST.FIELD_ERR.INCORRECT,
                    })
                    instance.props.updateDimensions();
                    // instance.inp_username.focus();
                }
                
            }
        })
    }

    showLoginPopup(visible){      
        this.setState({
            username: '',
            password: '',
            'status_text': '',
            'message': '',
            'password_input_type': 'password',
            'username_field_error': CONST.FIELD_ERR.NONE,
            'password_field_error': CONST.FIELD_ERR.NONE,
        })
        this.props.showLoginPopup(visible);
    }

    render() {    
        var class_name = '';
        if(this.props.info.login_popup_visible){
            class_name = 'login-popup show';
        }
        else{
            class_name = 'login-popup';
        }

        if(this.props.info.login_pop_enable_scroll){
            class_name = class_name + ' enable--scroll';
        }

        var error_msg_class_name = 'lp-error-msg-box';
        if(this.state.status_text === "" || this.state.status_text === CONST.API.RESP.SUCCESS.status_text){
            error_msg_class_name = 'lp-error-msg-box';
        }
        else{
            error_msg_class_name = 'lp-error-msg-box show';
        }

        var error_msg_html = '';
        
        if(this.state.status_text === CONST.API.RESP.INVALID.status_text && this.state.message === CONST.API.RESP.INVALID.message){
            error_msg_html = 'The email/username or password you entered is incorrect. Please try again!';
        }

        if(this.state.status_text === CONST.API.RESP.PENDING.status_text && this.state.message === CONST.API.RESP.PENDING.message){
            error_msg_html = 'Your account is currently Awaiting confirmation. Confirmation was sent to ' + this.state.email + '. <br><br> Please check your email, or <a className="lp-error__text--link" href="' + CONST.PAGE.CONFIRM_EMAIL + '">click here to resend confimation email</a>'
        }

        var username_class_name = 'lp-form-input-container error--empty';
        if(this.state.username_field_error === CONST.FIELD_ERR.EMPTY){
            username_class_name = 'lp-form-input-container error--empty';
        }
        else if(this.state.username_field_error === CONST.FIELD_ERR.INCORRECT){
            username_class_name = 'lp-form-input-container error--incorrect';
        }
        else{
            username_class_name = 'lp-form-input-container';
        }

        var password_class_name = 'lp-form-input-container error--empty';
        if(this.state.password_field_error === CONST.FIELD_ERR.EMPTY){
            password_class_name = 'lp-form-input-container error--empty';
        }
        else if(this.state.password_field_error === CONST.FIELD_ERR.INCORRECT){
            password_class_name = 'lp-form-input-container error--incorrect';
        }
        else{
            password_class_name = 'lp-form-input-container';
        }

        return(
            <div className={class_name}>
                <div className="login-popup-bk" onClick={() => this.showLoginPopup(false)}></div>
                <div className="login-popup-scroll-parent">
                    <div className="login-popup-wrap">
                        <img className="login-popup-close" src={ic_close} onClick={() => this.showLoginPopup(false)}></img>
                        <div className="lp-title">
                            Login <img className="lp-title__icon" src={ic_arrow_right}></img>
                        </div>
                        <div className={error_msg_class_name}>
                            <img className="lp-error__icon" src={ic_warning}></img>
                            <div className="lp-error__text">
                            {Parser(error_msg_html)}
                            </div>
                        </div>
                        <div className={username_class_name}>
                            <label className="lp-fic-title">Email or Username</label>
                            <div className="lp-fic-input-wrap">
                                <input type="text" className="" value={this.state.username} onChange={this.changeUsername} onBlur={this.blurUsername} ref={(input) => {this.inp_username = input;}}></input>
                            </div>
                            <label className="lp-fic-error-msg">Your email/username is empty</label>
                        </div>
                        <div className={password_class_name}>
                            <label className="lp-fic-title">Password</label>
                            <div className="lp-fic-input-wrap lp-fic-iw--has-title">
                                <input type={this.state.password_input_type} className="" value={this.state.password} onChange={this.changePassword} ref={(input) => {this.inp_password = input;}} onBlur={this.blurPassword}></input>
                                <label className="lp-fic-iw__title" onClick={this.showPassword}>{this.state.password_input_type === 'password' ? 'show' : 'hide'}</label>
                            </div>
                            <label className="lp-fic-error-msg">Your password is empty</label>
                        </div>
                        <div className="lp-form-input-container login-btn--container">
                            <div className="lp-btn-normal" onClick={this.doLogin}>
                                <div className="lp-btn-normal__text">log in</div>
                            </div>
                        </div>
                        <div className="lp-forget-title" onClick={() => this.props.goPage(CONST.PAGE.RESET_PASS_REQUEST, false)}>
                            Did you forget your password?
                        </div>
                        <div className="lp-login-with">
                            <div className="lp-login-with__midline"></div>
                            <div className="lp-login-with__title">or log in with</div>
                            <div className="lp-login-with__midline"></div>
                        </div>
                        <div className="lp-social-btn-container">
                            <div className="lp-social-btn">
                                <img className="lp-social-btn__icon" src={ic_btn_facebook}></img>
                                <span className="lp-social-btn__title">facebook</span>
                            </div>
                            <div className="lp-social-btn">
                                <img className="lp-social-btn__icon" src={ic_btn_google}></img>
                                <span className="lp-social-btn__title">google</span>
                            </div>
                            <div className="lp-social-btn">
                                <img className="lp-social-btn__icon" src={ic_btn_twitter}></img>
                                <span className="lp-social-btn__title">twitter</span>
                            </div>
                        </div>
                        <div className="have-account-title">
                        Don't you have an account?
                        </div>

                        <div className="lp-btn-outline">
                            <div className="lp-btn-outline__text">join us</div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default LoginPopup