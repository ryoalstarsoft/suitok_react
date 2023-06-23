import React, {Component} from 'react'

import UserMenuPopup from './UserMenuPopup'
import img_logo from '../../assets/images/ic_logo.png'
import img_menu_user_black from '../../assets/images/ic_user_black.png'
import img_menu_user_orange from '../../assets/images/ic_user_orange.png'
import img_menu_closet_black from '../../assets/images/ic_closet_black.png'
import img_menu_closet_orange from '../../assets/images/ic_closet_orange.png'
import img_menu_play_black from '../../assets/images/ic_play_black.png'
import img_menu_play_orange from '../../assets/images/ic_play_orange.png'
import ic_three_lines from '../../assets/images/ic_three_lines.png'
import ic_times from '../../assets/images/ic_times.png'

import CONST from '../../global/const'

class Header extends Component {
    constructor(props){
        super(props);

        this.showUserPopup = this.showUserPopup.bind(this);

        this.state = {
            user_menu_visible: false
        }
    }

    componentWillMount(){
        document.addEventListener('mouseup', this.handleClick_UserMenuIcon, false)
    }

    componentWillUnmount(){
        document.addEventListener('mouseup', this.handleClick_UserMenuIcon, false)
    }

    handleClick_UserMenuIcon = (e) => {
        if(this.hmi_user_menu_icon){
            if(this.hmi_user_menu_icon.contains(e.target)){
                this.showUserPopup(!this.state.user_menu_visible);
            }
            else{
                this.showUserPopup(false);
            }
        }
    }

    showUserPopup(visible){

        this.setState({
            user_menu_visible: visible
        })
    }

    onLogoClick = (e) => {
        window.open('/', '_blank');
    }

    render() {
        var ic_user_normal = img_menu_user_black;
        var ic_user_hover = img_menu_user_orange;

        var user_menu_style = {
            display: 'none'
        };

        if(this.state.user_menu_visible){
            user_menu_style['display'] = 'block';
        }

        if(this.props.info.vpw < 480){
            user_menu_style['left'] = 'initial';
            user_menu_style['right'] = '-15px';
            ic_user_normal = ic_three_lines;
            ic_user_hover = ic_times;
        }

        if(this.props.info.vpw >= 1024){
            //render desktop
            return(
                <div className="header container">
                    <a href="#" className="header-logo">
                        <img className="header-logo__img" src={img_logo} onContextMenu={this.onLogoClick}></img>
                    </a>
                    <div className="header-menu">
                        <div className="header-menu-item hmi--user-menu-popup"
                            onMouseOver={() => this.showUserPopup(true)}
                            onMouseLeave={() => this.showUserPopup(false)}>
                            <img className="header-menu-item__icon icon--desktop-nav icon--normal" src={ic_user_normal}></img>
                            <img className="header-menu-item__icon icon--desktop-nav icon--hover" src={ic_user_hover}></img>
                            <UserMenuPopup
                                style={user_menu_style}
                                info={this.props.info}
                                showLoginPopup={this.props.showLoginPopup.bind(this)}
                                passLogout={this.props.passLogout.bind(this)}
                                goPage={this.props.goPage.bind(this)}
                                showVideo={this.props.showVideo.bind(this)}/>
                        </div>
                        <div className="header-menu-item" onClick={() => this.props.goPage(CONST.PAGE.CLOSET, true)} title="CLOSET">
                            <img className="header-menu-item__icon icon--desktop-nav icon--normal" src={img_menu_closet_black}></img>
                            <img className="header-menu-item__icon icon--desktop-nav icon--hover" src={img_menu_closet_orange}></img>
                        </div>
                        <div className="header-menu-item" onClick={() => this.props.showVideo(true)} title="How does SUITOK work?">
                            <img className="header-menu-item__icon icon--desktop-nav icon--normal" src={img_menu_play_black}></img>
                            <img className="header-menu-item__icon icon--desktop-nav icon--hover" src={img_menu_play_orange}></img>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            //render mobile or tablet
            var user_icon_normal_style = {};
            var user_icon_hover_style = {};
            if(this.props.info.vpw < 480){

                if(this.state.user_menu_visible){
                    user_icon_normal_style = {
                        'display': 'none'
                    }

                    user_icon_hover_style = {
                        'display': 'block'
                    }
                }
                else{
                    user_icon_normal_style = {
                        'display': 'block'
                    }

                    user_icon_hover_style = {
                        'display': 'none'
                    }
                }

            }

            return(
                <div className="header container">
                    <a href="#" className="header-logo">
                        <img className="header-logo__img" src={img_logo} onContextMenu={this.onLogoClick}></img>
                    </a>
                    <div className="header-menu">
                        <div className="header-menu-item hmi--user-menu-popup"
                            ref={node => this.hmi_user_menu_icon = node}>
                            <img className="header-menu-item__icon icon--desktop-nav icon--normal" style={user_icon_normal_style} src={ic_user_normal}></img>
                            <img className="header-menu-item__icon icon--desktop-nav icon--hover" style={user_icon_hover_style} src={ic_user_hover}></img>
                            <UserMenuPopup
                                style={user_menu_style}
                                info={this.props.info}
                                showLoginPopup={this.props.showLoginPopup.bind(this)}
                                passLogout={this.props.passLogout.bind(this)}
                                goPage={this.props.goPage.bind(this)}
                                showVideo={this.props.showVideo.bind(this)}/>
                        </div>

                        <div className="header-menu-item" onClick={() => this.props.goPage(CONST.PAGE.CLOSET, true)} title="CLOSET">
                            <img className="header-menu-item__icon icon--desktop-nav icon--normal" src={img_menu_closet_black}></img>
                            <img className="header-menu-item__icon icon--desktop-nav icon--hover" src={img_menu_closet_orange}></img>
                        </div>
                        <div className="header-menu-item" onClick={() => this.props.showVideo(true)} title="How does SUITOK work?">
                            <img className="header-menu-item__icon icon--desktop-nav icon--normal" src={img_menu_play_black}></img>
                            <img className="header-menu-item__icon icon--desktop-nav icon--hover" src={img_menu_play_orange}></img>
                        </div>
                    </div>
                </div>
            )
        }

    }
}
export default Header