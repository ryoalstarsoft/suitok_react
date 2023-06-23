import React, {Component} from 'react'

import img_instagram from '../assets/images/ic_instagram.png'
import img_facebook from '../assets/images/ic_facebook.png'
import img_twitter from '../assets/images/ic_twitter.png'
import img_youtube from '../assets/images/ic_youtube.png'

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                <div className="footer-wrap container">
                    <div className="footer-col">
                        <div className="footer-col-wrap">
                            <div className="footer-col__title">help/info</div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-title">my account</span>
                            </div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-title">contact us</span>
                            </div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-title">became a partner</span>
                            </div>
                            
                        </div>
                    </div>
    
                    <div className="footer-col">
                        <div className="footer-col-wrap">
                            <div className="footer-col__title">company</div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-title">about us</span>
                            </div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-title">terms &amp; conditions</span>
                            </div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-title">privacy &amp; cookie policy</span>
                            </div>
                            
                        </div>
                    </div>
    
                    <div className="footer-col">
                        <div className="footer-col-wrap">
                            <div className="footer-col__title">follow us</div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-icon-wrap">
                                    <img className="footer-col__menu-icon" src={img_instagram}></img>
                                </span>
                                <span className="footer-col__menu-title">instagram</span>
                            </div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-icon-wrap">
                                    <img className="footer-col__menu-icon" src={img_facebook}></img>
                                </span>
                                <span className="footer-col__menu-title">facebook</span>
                            </div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-icon-wrap">
                                    <img className="footer-col__menu-icon" src={img_twitter}></img>
                                </span>
                                <span className="footer-col__menu-title">twitter</span>
                            </div>
                            <div className="footer-col__menu">
                                <span className="footer-col__menu-icon-wrap">
                                    <img className="footer-col__menu-icon" src={img_youtube}></img>
                                </span>
                                <span className="footer-col__menu-title">youtube</span>
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="footer-copyright">
                © COPYRIGHT 2019 SUITOK LTD - ALL RIGHTS RESERVED
                </div>
            </div>
        );
    }
}
export default Footer