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
import ic_closet from '../assets/images/ic_closet_black.png'
import ic_likes from '../assets/images/ic_likes.png'
import ic_reviews from '../assets/images/ic_reviews.png'
import ic_alert from '../assets/images/ic_alert.png'
import ic_outfits from '../assets/images/ic_outfits.png'
import FormInput from '../components/Form/FormInput'
import FormDate from '../components/Form/FormDate'
import CONST from '../global/const'
import FormRadio from '../components/Form/FormRadio';
import FormPostcode from '../components/Form/FormPostcode';
import FormCheck from '../components/Form/FormCheck';

import $ from 'jquery';

class SignupPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);

        var username = '';
        if(typeof this.props.cookies.get(CONST.COOKIE.GLOBAL.USERNAME) != 'undefined'){
            username = this.props.cookies.get(CONST.COOKIE.GLOBAL.USERNAME);
        }

        var email = '';
        if(typeof this.props.cookies.get(CONST.COOKIE.GLOBAL.EMAIL) != 'undefined'){
            email = this.props.cookies.get(CONST.COOKIE.GLOBAL.EMAIL);
        }

        this.state = {
            'email': email,
            'username' : username,
            'password': '',
            'first_name': '',
            'last_name': '',
            'gender': '',
            'postcode': '',
            'birth': {
                'year': 0,
                'month': 0,
                'day': 0
            },
            'newsletter': false,
            'terms': true,

            fieldError: {
                email: CONST.FIELD_ERR.NONE,
                username: CONST.FIELD_ERR.NONE,
                password: CONST.FIELD_ERR.NONE,
                first_name: CONST.FIELD_ERR.NONE,
                last_name: CONST.FIELD_ERR.NONE,
                gender: CONST.FIELD_ERR.NONE,
                postcode: CONST.FIELD_ERR.NONE,
                birth: CONST.FIELD_ERR.NONE,
                terms: CONST.FIELD_ERR.NONE
            },

            msgError: {
                email: 'Your email is empty',
                username: 'Your username is empty',
                password: 'Your password is empty',
                first_name: 'Your first name is empty',
                last_name: 'Your last name is empty',
                gender: 'Select your gender',
                postcode: 'Your postcode is empty',
                birth: 'Enter a full date of birth',
                terms: 'You must agree to our Terms & Conditions and Privacy & Cookie Policy'
            },

            resendResp: {
                status_text: '',
                message: ''
            },
        }

        this.doSignup = this.doSignup.bind(this);
        this.doResendEmail = this.doResendEmail.bind(this);
        this.callbackEmail = this.callbackEmail.bind(this);
        this.callbackUsername = this.callbackUsername.bind(this);
        this.callbackPassword = this.callbackPassword.bind(this);
        this.callbackFirstName = this.callbackFirstName.bind(this);
        this.callbackLastName = this.callbackLastName.bind(this);
        this.callbackPostcode = this.callbackPostcode.bind(this);
        this.callbackBirth = this.callbackBirth.bind(this);
        this.callbackGender = this.callbackGender.bind(this);
        this.callbackNewsletter = this.callbackNewsletter.bind(this);
        this.callbackTerms = this.callbackTerms.bind(this);

        this.goLoginPage = this.goLoginPage.bind(this);

        this.refBirth = React.createRef();
    }

    componentDidMount(){
        document.title = 'Signup';
    }

    goLoginPage(){
        window.location.href = CONST.PAGE.LOGIN;
    }

    callbackEmail(data){
        const { fieldError, msgError } = this.state;

        var instance = this;

        if (data === '') {
            fieldError.email = CONST.FIELD_ERR.EMPTY;
            msgError.email = 'Your email is empty';

            instance.setState({
                email: data,
                fieldError: fieldError,
                msgError: msgError
            })
        } else if (instance.validateEmail(data) === false) {
            fieldError.email = CONST.FIELD_ERR.CHECK_ERROR;
            msgError.email = 'Invalid email format';

            instance.setState({
                email: data,
                fieldError: fieldError,
                msgError: msgError
            })

        } else {
            $.ajax({
                url: CONST.API.BASE_URL + CONST.API.URLS.CHECK_EXISTENCE,
                type: 'GET',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY': CONST.API.KEY
                },
                data: {
                    field: 'email',
                    value: data,
                },
                success: function (response) {
                    if (response.status_text === CONST.API.RESP.SUCCESS.status_text) {
                        fieldError.email = CONST.FIELD_ERR.CHECK_OK;
                        msgError.email = '';

                        instance.setState({
                            email: data,
                            fieldError: fieldError,
                            msgError: msgError
                        })
                    }
                    else {
                        fieldError.email = CONST.FIELD_ERR.CHECK_ERROR;
                        msgError.email = 'Existing email. Write a new one';

                        instance.setState({
                            email: data,
                            fieldError: fieldError,
                            msgError: msgError
                        });
                    }
                }
            })
        }
    }

    validateEmail(email) {
        // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        var re = /^([a-zA-Z][\w\.-]*[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z])$/g;

        return email.length <= 80 && re.test(String(email).toLowerCase());
    }

    callbackUsername(data){
        const { fieldError, msgError } = this.state;

        var regExp = /^[a-zA-Z0-9]+$/g;

        /*fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY': CONST.API.KEY
                },
            }).then(responseJson => {
                if (responseJson.statusText === CONST.API.RESP.OK.status_text) {
                    if (regExp.test(data) === false) {
                        fieldError.username = CONST.FIELD_ERR.INVALID;
                        msgError.username = 'Invalid username format';
                    } else if (data === '') {
                        fieldError.username = CONST.FIELD_ERR.EMPTY;
                        msgError.username = 'Your username is empty';
                    } else {
                        fieldError.username = CONST.FIELD_ERR.CHECK_OK;
                        msgError.username = '';
                    }

                    this.setState({
                        username: data,
                        fieldError: fieldError,
                        msgError: msgError
                    });
                }
            })
            .catch(error => {
                fieldError.username = CONST.FIELD_ERR.CHECK_ERROR;
                msgError.username = 'Existing username. Write a new one';

                this.setState({
                    username: data,
                    fieldError: fieldError,
                    msgError: msgError
                });
            });*/

        var instance = this;

        if (data === '') {
            fieldError.username = CONST.FIELD_ERR.EMPTY;
            msgError.username = 'Your username is empty';

            instance.setState({
                username: data,
                fieldError: fieldError,
                msgError: msgError
            });
        } else if (regExp.test(data) === false || data.length > 20) {
            fieldError.username = CONST.FIELD_ERR.CHECK_ERROR;
            msgError.username = 'Invalid username format';

            instance.setState({
                username: data,
                fieldError: fieldError,
                msgError: msgError
            });
        } else {
            $.ajax({
                url: CONST.API.BASE_URL + CONST.API.URLS.CHECK_EXISTENCE,
                type: 'GET',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY': CONST.API.KEY
                },
                data: {
                    field: 'username',
                    value: data,
                },
                success: function (response) {
                    if (response.status_text === CONST.API.RESP.SUCCESS.status_text) {

                        fieldError.username = CONST.FIELD_ERR.CHECK_OK;
                        msgError.username = '';

                        instance.setState({
                            username: data,
                            fieldError: fieldError,
                            msgError: msgError
                        });
                    }
                    else {
                        fieldError.username = CONST.FIELD_ERR.CHECK_ERROR;
                        msgError.username = 'Existing username. Write a new one';

                        instance.setState({
                            username: data,
                            fieldError: fieldError,
                            msgError: msgError
                        });
                    }
                }
            })
        }
    }

    callbackPassword(data){
        const { fieldError, msgError } = this.state;
        var regExp = /^(?=.*\d)([a-zA-Z]+){8,100}$/g;
        // var regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^!@#\$%\^&\*])(?=.{8,})/g;
        // var regExp = /^(?=.*[0-9])[a-zA-Z0-9]{6,16}$/;

        if (data === '') {
            fieldError.password = CONST.FIELD_ERR.EMPTY;
            msgError.password = 'Your password is empty';
        } else if (regExp.test(data) === false) {
            fieldError.password = CONST.FIELD_ERR.CHECK_ERROR;
            msgError.password = 'Invalid password format';
        } else {
            fieldError.password = CONST.FIELD_ERR.NONE;
            msgError.password = '';
        }

        this.setState({
            password: data,
            fieldError: fieldError,
            msgError: msgError
        });
    }

    callbackFirstName(data){
        const { fieldError, msgError } = this.state;

        if (data === '') {
            fieldError.first_name = CONST.FIELD_ERR.EMPTY;
            msgError.first_name = 'Your first name is empty';
        } else {
            fieldError.first_name = CONST.FIELD_ERR.NONE;
            msgError.first_name = '';
        }

        this.setState({
            first_name: data,
            fieldError: fieldError,
            msgError: msgError
        });
    }

    callbackLastName(data){
        const { fieldError, msgError } = this.state;

        if (data === '') {
            fieldError.last_name = CONST.FIELD_ERR.EMPTY;
            msgError.last_name = 'Your last name is empty';
        } else {
            fieldError.last_name = CONST.FIELD_ERR.NONE;
            msgError.last_name = '';
        }

        this.setState({
            last_name: data,
            fieldError: fieldError,
            msgError: msgError
        });
    }

    callbackBirth(data){
        console.log('callback birth', data);
        var fieldError = this.state.fieldError;

        if((data.year == 0 && data.changedField == 'year') || (data.month == 0 && data.changedField == 'month') || (data.day == 0 && data.changedField == 'day')){
            fieldError.birth = CONST.FIELD_ERR.EMPTY;
        }
        else{
            fieldError.birth = CONST.FIELD_ERR.NONE;
        }

        this.setState({
            birth: data,
            fieldError: fieldError
        })
    }

    callbackGender(data){
        var fieldError = this.state.fieldError;
        if(data === ''){
            fieldError.gender = CONST.FIELD_ERR.EMPTY;
        }
        else{
            fieldError.gender = CONST.FIELD_ERR.NONE;
        }
        this.setState({
            gender: data,
            fieldError: fieldError
        })
    }

    callbackPostcode(data, state){
        console.log('callbackPostcode', data);
        var { fieldError, msgError } = this.state;

        if(data === ''){
            if (state) {
                fieldError.postcode = CONST.FIELD_ERR.EMPTY;
                msgError.postcode = "Your postcode is empty";
            } else {
                fieldError.postcode = CONST.FIELD_ERR.EMPTY;
                msgError.postcode = "This postcode could not be found";
            }
        }
        else {
            fieldError.postcode = CONST.FIELD_ERR.NONE;
            msgError.postcode = "";
        }

        this.setState({
            postcode: data,
            fieldError: fieldError,
            msgError: msgError
        })
    }

    callbackNewsletter(data){
        this.setState({
            newsletter: data
        })
    }

    callbackTerms(data){
        var fieldError = this.state.fieldError;
        fieldError.terms = data;

        this.setState({
            terms: data,
            fieldError: fieldError
        })
    }

    doSignup(){
        var instance = this;
        var bError = false;
        var fieldError = this.state.fieldError;

        if(this.state.email === ''){
            bError = true;
            fieldError.email = CONST.FIELD_ERR.EMPTY;
        }

        if(this.state.username === ''){
            bError = true;
            fieldError.username = CONST.FIELD_ERR.EMPTY;
        }

        if(this.state.password === ''){
            bError = true;
            fieldError.password = CONST.FIELD_ERR.EMPTY;
        }

        if(this.state.first_name === ''){
            bError = true;
            fieldError.first_name = CONST.FIELD_ERR.EMPTY;
        }

        if(this.state.last_name === ''){
            bError = true;
            fieldError.last_name = CONST.FIELD_ERR.EMPTY;
        }

        if(parseInt(this.state.birth.day) == 0 || parseInt(this.state.birth.month) == 0 || parseInt(this.state.birth.year) == 0){
            bError = true;
            fieldError.birth = CONST.FIELD_ERR.EMPTY;
        }

        var newStateBirth = {};
        if(parseInt(this.state.birth.day) == 0){
            newStateBirth['col_class_day'] = '';
        }
        else{
            newStateBirth['col_class_day'] = 'not--empty';
        }

        if(parseInt(this.state.birth.month) == 0){
            newStateBirth['col_class_month'] = '';
        }
        else{
            newStateBirth['col_class_month'] = 'not--empty';
        }

        if(parseInt(this.state.birth.year) == 0){
            newStateBirth['col_class_year'] = '';
        }
        else{
            newStateBirth['col_class_year'] = 'not--empty';
        }

        if(this.state.gender === ''){
            bError = true;
            fieldError.gender = CONST.FIELD_ERR.EMPTY;
        }
        else{
            fieldError.gender = CONST.FIELD_ERR.NONE;
        }

        if(this.state.postcode === ''){
            bError = true;
            fieldError.postcode = CONST.FIELD_ERR.EMPTY;
        }
        else{
            fieldError.postcode = CONST.FIELD_ERR.NONE;
        }

        if(!this.state.terms){
            bError = true;
            fieldError.terms = CONST.FIELD_ERR.EMPTY;
        }
        else{
            fieldError.terms = CONST.FIELD_ERR.NONE;
        }

        if(bError){
            this.setState({
                fieldError: fieldError
            });

            this.refBirth.current.changeState(newStateBirth);
            return;
        }

        var promise_check_existence = new Promise(function(resolve_existence, reject_existence){
            function checkUsername(resp_check_email){
                var promise_check_username = new Promise(function(resolve_username, reject_username){
                    $.ajax({
                        url: CONST.API.BASE_URL + CONST.API.URLS.CHECK_EXISTENCE,
                        type: 'GET',
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'X-API-KEY': CONST.API.KEY
                        },
                        data: {
                            field: 'username',
                            value: instance.state.username,
                        },
                        success: function(response){
                            if(response.status_text === CONST.API.RESP.SUCCESS.status_text){
                                resolve_username(response);
                            }
                            else{
                                reject_username(response);
                            }
                        }
                    })
                })

                promise_check_username.then(function(resp){
                    if(resp.status_text == CONST.API.RESP.SUCCESS.status_text){
                        var fieldError = instance.state.fieldError;
                        fieldError.username = CONST.FIELD_ERR.CHECK_OK;
                        instance.setState({
                            fieldError: fieldError
                        })
                    }

                    if(resp_check_email.status_text == CONST.API.RESP.SUCCESS.status_text){
                        resolve_existence(resp);
                    }
                }).catch(function(resp){
                    if(resp.status_text == CONST.API.RESP.WARNING.status_text){
                        var fieldError = instance.state.fieldError;
                        fieldError.username = CONST.FIELD_ERR.CHECK_ERROR;
                        instance.setState({
                            fieldError: fieldError
                        })
                    }
                });
            }

            var promise_check_email = new Promise(function(resolve_email, reject_email){
                $.ajax({
                    url: CONST.API.BASE_URL + CONST.API.URLS.CHECK_EXISTENCE,
                    type: 'GET',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-API-KEY': CONST.API.KEY
                    },
                    data: {
                        field: 'email',
                        value: instance.state.email,
                    },
                    success: function(response){
                        if(response.status_text === CONST.API.RESP.SUCCESS.status_text){
                            resolve_email(response);
                        }
                        else{
                            reject_email(response);
                        }
                    }
                })
            })

            promise_check_email.then(function(resp){
                if(resp.status_text == CONST.API.RESP.SUCCESS.status_text){
                    var fieldError = instance.state.fieldError;
                    fieldError.email = CONST.FIELD_ERR.CHECK_OK;
                    instance.setState({
                        fieldError: fieldError
                    })
                }

                checkUsername(resp);
            }).catch(function(resp){
                if(resp.status_text == CONST.API.RESP.WARNING.status_text){
                    var fieldError = instance.state.fieldError;
                    fieldError.email = CONST.FIELD_ERR.CHECK_ERROR;
                    instance.setState({
                        fieldError: fieldError
                    })
                }
                checkUsername(resp);
            })
        })

        promise_check_existence.then(function(resp){
            $.ajax({
                url: CONST.API.BASE_URL + CONST.API.URLS.REGISTER,
                type: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-API-KEY': CONST.API.KEY
                },
                data: {
                    email: instance.state.email,
                    username: instance.state.username,
                    password: instance.state.password,
                    first_name: instance.state.first_name,
                    last_name: instance.state.last_name,
                    gender: instance.state.gender,
                    postcode: instance.state.postcode,
                    b_year: instance.state.birth.year,
                    b_month: instance.state.birth.month,
                    b_day: instance.state.birth.day,
                    newsletter: instance.state.newsletter ? 'True' : 'False'
                },
                success: function(response){
                    if(response.status_text === CONST.API.RESP.SUCCESS.status_text){
                        instance.props.cookies.set(CONST.COOKIE.SIGNUP_PAGE.USERNAME, response.username);
                        instance.props.cookies.set(CONST.COOKIE.SIGNUP_PAGE.EMAIL, response.email);
                        instance.props.cookies.set(CONST.COOKIE.SIGNUP_PAGE.NEEDS_VERIFICATION, true);
                        // instance.props.cookies.set(CONST.COOKIE.GLOBAL.USERNMAE, response.username);
                        // instance.props.cookies.set(CONST.COOKIE.GLOBAL.GENDER, response.gender);
                        window.location.href = CONST.PAGE.VERIFICATION_EMAIL;
                    }

                }
            })
        })

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

        return(
            <div className="form-page signup-page">
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
                            <span className="form-type__title form-type--left">NEW TO SUITOK.COM?<img className="form-type__icon" src={ic_arrow_right}></img></span>
                            <span className="form-type__sep"></span>
                            <span className="form-type__title from-type--disable form-type--right" onClick={() => window.location.href=CONST.PAGE.LOGIN}><img className="form-type__icon" src={ic_arrow_left}></img>EXISTING CUSTOMER</span>
                        </div>
                        <div className="signup-form">
                            <div className="form-symbols">
                                <div className="form-symbol-item">
                                    <img className="form-symbol-item__icon" src={ic_closet}></img>
                                    <div className="form-symbol-item__text">Build your <br></br>closet</div>
                                </div>
                                <div className="form-symbol-item">
                                    <img className="form-symbol-item__icon" src={ic_likes}></img>
                                    <div className="form-symbol-item__text">Give <br></br>Likes</div>
                                </div>
                                <div className="form-symbol-item">
                                    <img className="form-symbol-item__icon" src={ic_reviews}></img>
                                    <div className="form-symbol-item__text">Make &amp; Read <br></br>comments</div>
                                </div>
                                <div className="form-symbol-item">
                                    <img className="form-symbol-item__icon" src={ic_alert}></img>
                                    <div className="form-symbol-item__text">Set <br></br>alerts</div>
                                </div>
                                <div className="form-symbol-item">
                                    <img className="form-symbol-item__icon" src={ic_outfits}></img>
                                    <div className="form-symbol-item__text">View <br></br>outfits</div>
                                </div>
                            </div>

                            <div className="form-fields">
                                <FormInput
                                    label="Email address"
                                    value={this.state.email}
                                    fieldError={this.state.fieldError.email}
                                    msgError={this.state.msgError.email}
                                    msgErrorCheck="Existing email: Write a new one"
                                    callback={this.callbackEmail}
                                    maxLength={255}
                                ></FormInput>
                                <FormInput
                                    label="Username"
                                    value={this.state.username}
                                    fieldError={this.state.fieldError.username}
                                    msgError={this.state.msgError.username}
                                    msgErrorCheck="Existing username: Write a new one"
                                    callback={this.callbackUsername}
                                    maxLength={255}
                                ></FormInput>
                                <FormInput
                                    type={CONST.FORM_INPUT.PASSWORD}
                                    label="Password"
                                    msgError={this.state.msgError.password}
                                    msgDesc="Must be 8 or more characters and contain at least 1 number"
                                    value={this.state.password}
                                    fieldError={this.state.fieldError.password}
                                    callback={this.callbackPassword}
                                    maxLength={100}
                                ></FormInput>
                                <FormInput
                                    label="First Name"
                                    msgError={this.state.msgError.first_name}
                                    value={this.state.first_name}
                                    fieldError={this.state.fieldError.first_name}
                                    callback={this.callbackFirstName}
                                    maxLength={100}
                                ></FormInput>
                                <FormInput
                                    label="Last Name"
                                    msgError={this.state.msgError.last_name}
                                    value={this.state.last_name}
                                    fieldError={this.state.fieldError.last_name}
                                    callback={this.callbackLastName}
                                    maxLength={100}
                                ></FormInput>
                                <FormDate
                                    label="Date of Birth"
                                    msgError={this.state.msgError.birth}
                                    value={this.state.birth}
                                    callback={this.callbackBirth}
                                    yearMax={2003}
                                    yearMin={1980}
                                    fieldError={this.state.fieldError.birth}
                                    ref={this.refBirth}
                                ></FormDate>
                                <FormRadio
                                    label="Gender"
                                    msgError={this.state.msgError.gender}
                                    value={this.state.gender}
                                    callback={this.callbackGender}
                                    fieldError={this.state.fieldError.gender}
                                ></FormRadio>
                                <FormPostcode
                                    label="Postcode"
                                    placeholder="e.g. TW19 5NW"
                                    msgError={this.state.msgError.postcode}
                                    value={this.state.postcode}
                                    callback={this.callbackPostcode}
                                    fieldError={this.state.fieldError.postcode}
                                ></FormPostcode>
                                <div className="check-box-container">
                                    <FormCheck
                                        label="Yes, I wish to receive occasional Newsletters on my email"
                                        value={this.state.newsletter}
                                        hasErrorField={false}
                                        callback={this.callbackNewsletter}
                                    ></FormCheck>
                                    <FormCheck
                                        label="By creating a SUITOK account you agree to our Terms & Conditions and Privacy & Cookie Policy"
                                        msgError={this.state.msgError.terms}
                                        fieldError={this.state.fieldError.terms}
                                        value={this.state.terms}
                                        callback={this.callbackTerms}
                                    ></FormCheck>
                                </div>

                                <div className="form-button">
                                    <div className="form-btn-normal__text" onClick={() => this.doSignup()}>Join suitok</div>
                                </div>

                                <div className="form-middle-with">
                                    <div className="form-middle-with__midline"></div>
                                    <div className="form-middle-with__title">or sign up with</div>
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
            </div>
        );
    }
}
export default withCookies(SignupPage)