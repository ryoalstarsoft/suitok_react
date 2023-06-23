import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Header from '../components/Homepage/Header';
import HomeBackground from '../components/Homepage/HomeBackground';
import HomeCenterBar from '../components/Homepage/HomeCenterBar';
import Footer from '../components/Footer';
import LoginPopup from '../components/LoginPopup';
import VideoPopup from '../components/Homepage/VideoPopup';

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';

import CONST from '../global/const'
import $ from 'jquery'

import MobileDetect from 'mobile-detect'

class HomePage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
        
        if(typeof this.props.cookies.get(CONST.COOKIE.GLOBAL.GENDER) == 'undefined'){
            this.props.cookies.set(CONST.COOKIE.GLOBAL.GENDER, CONST.GENDER.WOMEN, {maxAge: 10 * 60});   
        }

        var token = '';
        var username = '';
        if(typeof this.props.cookies.get(CONST.COOKIE.GLOBAL.TOKEN) != 'undefined'){
            token = this.props.cookies.get(CONST.COOKIE.GLOBAL.TOKEN);
        }

        if(typeof this.props.cookies.get(CONST.COOKIE.GLOBAL.USERNAME) != 'undefined'){
            username = this.props.cookies.get(CONST.COOKIE.GLOBAL.USERNAME);
        }

        this.state = {
            gender: this.props.cookies.get(CONST.COOKIE.GLOBAL.GENDER),
            video_visible: false,
            mute: true,
            playing: true,
            token: token,
            username: username,
            video_screen_dir: CONST.VIEWPORT_DIR.NONE,
            bk_height: 0,
            viewport_dir: CONST.VIEWPORT_DIR.NONE,
            vpw: 0,
            vph: 0,

            //login popup setting
            login_pop_enable_scroll: false,
            reset_height: false

        }
    }

    componentDidMount(){
        document.title = 'SuitOK';

        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));

    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    updateDimensions() {
        var vpw = window.innerWidth;
        var vph = window.innerHeight;
        
        var hmenu = 77.5;
        var hbar = 90;
        var hfinal = 0.65 * vph + hbar / 2 + hmenu;

        if(vpw >= 768 && vpw < 1024){
            hmenu = 79.5;
            hbar = 67.5;
            hfinal = 0.65 * vph + hbar / 2 + hmenu;
        }
        else if(vpw < 768){
            hmenu = 83;
            hbar = 114;
            hfinal = 0.65 * vph + hbar / 2 + hmenu;
        }

        var bk_height = vph;

        if(hfinal > vph){
            bk_height = hfinal;
        }
        
        var new_state = {
            'vpw': vpw,
        };

        var resetHeight = false;
        var md = new MobileDetect(navigator.userAgent);

        // alert(md.mobile() + ',' + md.phone() + ',' + md.tablet());

        //if(vpw > 768){
        if(md.mobile() == null && md.phone() == null && md.tablet() == null){
            //desktop and tablet
            resetHeight = true;
        }

        if(vpw > vph){
            if(this.state.viewport_dir != CONST.VIEWPORT_DIR.LANDSCAPE){
                new_state['viewport_dir'] = CONST.VIEWPORT_DIR.LANDSCAPE;
                new_state['reset_height'] = true;
                resetHeight = true;
            }
        }
        else{
            if(this.state.viewport_dir != CONST.VIEWPORT_DIR.PORTRAIT){
                new_state['viewport_dir'] = CONST.VIEWPORT_DIR.PORTRAIT;
                new_state['reset_height'] = true;
                resetHeight = true;
            }
        }

        if(resetHeight){
            new_state['vph'] = vph;
            new_state['bk_height'] = bk_height;

            //if((vph / vpw) < (CONST.HVIDEO_DM.HEIGHT / CONST.HVIDEO_DM.WIDTH)){
            if((bk_height / vpw) < (CONST.HVIDEO_DM.HEIGHT / CONST.HVIDEO_DM.WIDTH)){
                new_state['video_screen_dir'] = CONST.VIEWPORT_DIR.LANDSCAPE;
            }
            else{
                new_state['video_screen_dir'] = CONST.VIEWPORT_DIR.PORTRAIT;
            }
        }

        if(vph < 623){
            new_state['login_pop_enable_scroll'] = true;
        }
        else{
            new_state['login_pop_enable_scroll'] = false;
        }

        this.setState(new_state);

    }

    changeGender(gender){
        // this.props.cookies.set('gender', gender);
        this.setState(
            {
                gender: gender,
            }
        );
    }

    changeMute(mute){
        this.setState(
            {
                mute: mute
            }
        )
    }

    showVideo(visible){
        
        if(visible){
            document.body.classList.add('show--popup');
        }
        else{
            document.body.classList.remove('show--popup');
        }

        this.setState(
            {
                video_visible: visible,
                playing: !visible
            }
        )
    }

    showLoginPopup(visible){
        if(this.state.vpw >= 768){
            //showing login popup
            if(visible){
                document.body.classList.add('show--popup');
            }
            else{
                document.body.classList.remove('show--popup');
            }
                
            this.setState({
                login_popup_visible: visible
            })
        }
        else{
            if(visible){
                //go to login page
                this.goPage(CONST.PAGE.LOGIN, false)
            }            
        }
        
    }

    passLogin(response){
        this.props.cookies.set(CONST.COOKIE.GLOBAL.GENDER, response.gender, {maxAge: 10 * 60});
        this.props.cookies.set(CONST.COOKIE.GLOBAL.TOKEN, response.token, {maxAge: 10 * 60});
        this.props.cookies.set(CONST.COOKIE.GLOBAL.USERNAME, response.username, {maxAge: 10 * 60});

        this.setState({
            token: response.token,
            gender: response.gender,
            username: response.username,
            login_popup_visible: false
        })
    }

    passLogout(){
        this.props.cookies.set(CONST.COOKIE.GLOBAL.TOKEN, '');

        this.setState({
            token: '',
            username: '',
        })
    }

    doSearchBy(type){
        console.log('dosearchby');
        if(this.state.token === '' && type != CONST.SEARCH.DESC){
            this.showLoginPopup(true);
            return;
        }

        if(type === CONST.SEARCH.DESC){
            window.location.href = CONST.PAGE.SEARCH_DESC;
        }
        if(type === CONST.SEARCH.IMAGE){
            window.location.href = CONST.PAGE.SEARCH_IMG;
        }
        if(type === CONST.SEARCH.OUTFITS){
            window.location.href = CONST.PAGE.SEARCH_OUTFITS;
        }
    }

    goPage(url, checktoken){
        if(checktoken && this.state.token === ''){
            this.showLoginPopup(true);
            return;
        }

        window.location.href = url;
    }

    render() {

        return(
            <div className="home-page">
                <HomeBackground info={this.state} />
                <Header 
                    info={this.state} 
                    showVideo={this.showVideo.bind(this)} 
                    showLoginPopup={this.showLoginPopup.bind(this)} 
                    passLogout={this.passLogout.bind(this)}
                    goPage={this.goPage.bind(this)}/>
                <HomeCenterBar 
                    info={this.state} 
                    changeGender={this.changeGender.bind(this)} 
                    changeMute={this.changeMute.bind(this)}
                    doSearchBy={this.doSearchBy.bind(this)}/>
                <Footer />
                <LoginPopup 
                    info={this.state} 
                    showLoginPopup={this.showLoginPopup.bind(this)} 
                    passLogin={this.passLogin.bind(this)}
                    goPage={this.goPage.bind(this)}
                    updateDimensions={this.updateDimensions.bind(this)}/>
                <VideoPopup info={this.state} showVideo={this.showVideo.bind(this)}/>
            </div>
        );
    }
}
export default withCookies(HomePage)