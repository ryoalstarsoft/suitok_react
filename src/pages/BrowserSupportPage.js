import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';
import img_logo from '../assets/images/ic_logo.png'
import ic_browser_chrome from '../assets/images/ic_browser_chrome.png'
import ic_browser_firefox from '../assets/images/ic_browser_firefox.png'
import ic_browser_ie from '../assets/images/ic_browser_ie.png'
import ic_browser_safari from '../assets/images/ic_browser_safari.png'

class BrowserSupportPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Browser is out-of-date';
    }
    
    render() {

        return(
            <div className="browser-support-page">
                <div className="brs-sp-header">
                    <img className="brs-sp-header__logo" src={img_logo}></img>
                </div>
                <div className="brs-sp-content">
                    <div className="brs-sp-content-wrap">
                        <h4 className="brs-sp-content__title">Sorry, your  browser is out-of-date</h4>
                        <p className="brs-sp-content__desc">You are using an old version of Chrome. You need to update your browser to use SUITOK. </p>
                        <p className="brs-sp-content__desc">Please setup the latest version of our supported browsers and return back.</p>
                        <div className="browser-list">
                            <div className="browser-list-item">
                                <img className="browser-list-item__img" src={ic_browser_chrome}></img>
                                <a className="browser-list-item__title" href="https://www.google.com/chrome/">Google <br></br>Chrome</a>
                            </div>
                            <div className="browser-list-item">
                                <img className="browser-list-item__img" src={ic_browser_firefox}></img>
                                <a className="browser-list-item__title" href="https://www.mozilla.org/">Mozilla <br></br>Firefox</a>
                            </div>
                            <div className="browser-list-item">
                                <img className="browser-list-item__img" src={ic_browser_ie}></img>
                                <a className="browser-list-item__title" href="https://www.microsoft.com/en-US/download/internet-explorer.aspx">Microsoft <br></br>Internet <br></br>Explorer</a>
                            </div>
                            <div className="browser-list-item">
                                <img className="browser-list-item__img" src={ic_browser_safari}></img>
                                <a className="browser-list-item__title" href="https://support.apple.com/en_US/downloads/safari">Apple<br></br> Safari</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default withCookies(BrowserSupportPage)