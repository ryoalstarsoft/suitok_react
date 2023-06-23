import React, {Component} from 'react'

// import img_logo from '../assets/images/ic_logo.png'
import CONST from '../../global/const'
import img_menu_play_black from '../../assets/images/ic_play_black.png'

class UserMenuPopup extends Component {  
    constructor(props){
        super(props);

        this.state = {
            
        }
    }

    render() {
        var class_name = 'user-menu-popup';
        var username = '';
        if(this.props.info.token == ''){
            class_name = 'user-menu-popup signup-form';
        }
        else {
            class_name = 'user-menu-popup login-form';
            username = this.props.info.username;
        }

        return(
            // <div className="user-menu-popup login-form">
            <div className={class_name} style={this.props.style}>
                <div className="ump-wrap">
                    <div className="ump-btn-normal form--signup">
                        <div className="ump-btn-normal__text" onClick={() => this.props.showLoginPopup(true)}>log in</div>
                    </div>
                    <div className="ump-desc form--signup">New to SUITOK? <span className="ump-desc__link" onClick={() => this.props.goPage(CONST.PAGE.SIGNUP, false)}>Join us</span> and enjoy more.</div>
                    <div className="ump-desc form--login">Hello <span className="ump-desc__username">{username}</span>:</div>
                    <hr></hr>
                    <div className="ump-btn-link-row" onClick={() => this.props.goPage(CONST.PAGE.ACCOUNT, true)}>
                        <div className="ump-btn-link">
                            my account
                        </div>
                    </div>
                    <div className="ump-btn-link-row" onClick={() => this.props.goPage(CONST.PAGE.CLOSET, true)}>
                        <div className="ump-btn-link">
                            my closet
                        </div>
                    </div>
                    <div className="ump-btn-link-row" onClick={() => this.props.goPage(CONST.PAGE.OUTFITS, true)}>
                        <div className="ump-btn-link">
                            my outfits
                        </div>
                    </div>
                    <hr className="hr--bottom form--login"></hr>
                    <div className="ump-mobile-video" onClick={() => this.props.showVideo(true)}>
                        How does SUITOK work? <img src={img_menu_play_black} className="ump-mobile-video__play-btn" ></img>
                    </div>
                    <div className="ump-btn-normal form--login">
                        <div className="ump-btn-normal__text" onClick={() => this.props.passLogout()}>log out</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserMenuPopup