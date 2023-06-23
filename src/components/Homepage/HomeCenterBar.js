import React, {Component} from 'react'

import ic_down_arrow from '../../assets/images/ic_down_arrow.png'
import ic_up_arrow from '../../assets/images/ic_up_arrow.png'
import ic_mute_on from '../../assets/images/ic_mute_on.png'
import ic_mute_off from '../../assets/images/ic_mute_off.png'
import ic_sh_camera from '../../assets/images/ic_sh_camera.png'
import ic_sh_description from '../../assets/images/ic_sh_description.png'
import ic_sh_outfits from '../../assets/images/ic_sh_outfits.png'

import CONST from '../../global/const'
import {withCookies} from 'react-cookie'

class HomeCenterBar extends Component {
    constructor(props){
        super(props);

        this.showSearchDropdown = this.showSearchDropdown.bind(this);

        this.state = {
            search_dropdown_visible: false
        }
    }
    
    componentWillMount(){
        document.addEventListener('mouseup', this.handleClick_HcbSbDropdownIcon, false)
    }

    componentWillUnmount(){
        document.addEventListener('mouseup', this.handleClick_HcbSbDropdownIcon, false)
    }

    handleClick_HcbSbDropdownIcon = (e) => {
        console.log('handleClick_HcbSbDropdownIcon:', e);
        //if(this.hcb_sb_button){
        if(this.hcb_sb_button_text){
            //if(this.hcb_sb_button.contains(e.target)){
            if(this.hcb_sb_button_text.contains(e.target)){
                this.showSearchDropdown(!this.state.search_dropdown_visible);
            }
            else{
                this.showSearchDropdown(false);
            }
        }        
    }

    showSearchDropdown(visible){
        console.log('showSearchDropdown:', visible);
        this.setState({
            search_dropdown_visible: visible
        })
    }

    render() {
        var ic_music;
        if(this.props.info.mute){
            ic_music = ic_mute_on;
        }
        else{
            ic_music = ic_mute_off;
        }

        var ic_dropdown = ic_down_arrow;

        if(this.state.search_dropdown_visible){
            ic_dropdown = ic_up_arrow;
        }

        if(this.props.info.vpw >= 1024){
            //render desktop
            var dropdown_style = {
                display: 'none'
            };

            if(this.state.search_dropdown_visible){
                dropdown_style = {
                    display: 'block'
                }
            }
            return(
                <div className="home-center-bar">
                    <div className="home-center-bar-wrap container">
                        <img className="hcb__music-icon" src={ic_music} onClick={() => this.props.changeMute(!this.props.info.mute)}></img>
                        <div className="hcb-gender-menu-wrap">
                            <ul className="hcb-gender-menu">
                                <li className={this.props.info.gender === CONST.GENDER.WOMEN ? "hcb-gm--active" : ""} onClick={() => this.props.changeGender(CONST.GENDER.WOMEN)}><span>women</span></li>
                                <li className={this.props.info.gender === CONST.GENDER.MEN ? "hcb-gm--active" : ""} onClick={() => this.props.changeGender(CONST.GENDER.MEN)}><span>men</span></li>
                                <li className={this.props.info.gender === CONST.GENDER.KIDS ? "hcb-gm--active" : ""} onClick={() => this.props.changeGender(CONST.GENDER.KIDS)}><span>kids</span></li>
                            </ul>
                        </div>
                        <div className="hcb-search-bar-wrap">
                            <div className="hcb-search-bar">
                                <div className="hcb-sb-button" 
                                    onMouseOver={() => this.showSearchDropdown(true)} 
                                    onMouseLeave={() => this.showSearchDropdown(false)}>
                                    <div className="hcb-sb-button__text">search by</div>
                                    {/* <img className="hcb-sb-button__icon dropdown--close" src={ic_down_arrow}></img>
                                    <img className="hcb-sb-button__icon dropdown--open" src={ic_up_arrow}></img> */}
                                    <img className="hcb-sb-button__icon" src={ic_dropdown}></img>
                                    <div className="hcb-sb-dropdown" style={dropdown_style}>
                                        <div className="hcb-sb-dropdown--background">
                                        </div>
                                        <div className="hcb-sb-dropdown--wrap">
                                            <div className="hcb-sb-dropdown-item" onClick={() => this.props.doSearchBy(CONST.SEARCH.IMAGE)}>
                                                <img className="hcb-sb-ditem__icon" src={ic_sh_camera}></img>
                                                <span className="hcb-sb-ditem__text">image</span>
                                            </div>
                                            <div className="hcb-sb-dropdown-item" onClick={() => this.props.doSearchBy(CONST.SEARCH.DESC)}>
                                                <img className="hcb-sb-ditem__icon" src={ic_sh_description}></img>
                                                <span className="hcb-sb-ditem__text">description</span>
                                            </div>
                                            <div className="hcb-sb-dropdown-item" onClick={() => this.props.doSearchBy(CONST.SEARCH.OUTFITS)}>
                                                <img className="hcb-sb-ditem__icon" src={ic_sh_outfits}></img>
                                                <span className="hcb-sb-ditem__text">outfits</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            //render mobile or tablet
            var dropdown_style = {
                display: 'none'
            };

            if(this.state.search_dropdown_visible){
                dropdown_style = {
                    display: 'block'
                }
            }

            var home_center_bar_style = {};
            var top = 0;
            var hbar = 0;
            
            if(this.props.info.vpw >= 1024 && this.props.info.reset_height){
                hbar = 90;
                //top = this.props.info.bk_height * 0.65 - hbar / 2;
                top = this.props.info.vph * 0.65 - hbar / 2;
                home_center_bar_style = {
                    'top': top + 'px'
                }
            }
            else if(this.props.info.vpw >= 768 && this.props.info.vpw < 1024 && this.props.info.reset_height){
                hbar = 67.5;
                //top = this.props.info.bk_height * 0.65 - hbar / 2;
                top = this.props.info.vph * 0.65 - hbar / 2;
                home_center_bar_style = {
                    'top': top + 'px'
                }
            }
            else if(this.props.info.vpw < 768 && this.props.info.reset_height){
                hbar = 114;
                //top = this.props.info.bk_height * 0.65 - hbar / 2;
                top = this.props.info.vph * 0.65 - hbar / 2;
                home_center_bar_style = {
                    'top': top + 'px'
                }
            }

            return(
                <div className="home-center-bar" style={home_center_bar_style}>
                    <div className="home-center-bar-wrap container">
                        <img className="hcb__music-icon" src={ic_music} onClick={() => this.props.changeMute(!this.props.info.mute)}></img>
                        <div className="hcb-gender-menu-wrap">
                            <ul className="hcb-gender-menu">
                                <li className={this.props.info.gender === CONST.GENDER.WOMEN ? "hcb-gm--active" : ""} onClick={() => this.props.changeGender(CONST.GENDER.WOMEN)}><span>women</span></li>
                                <li className={this.props.info.gender === CONST.GENDER.MEN ? "hcb-gm--active" : ""} onClick={() => this.props.changeGender(CONST.GENDER.MEN)}><span>men</span></li>
                                <li className={this.props.info.gender === CONST.GENDER.KIDS ? "hcb-gm--active" : ""} onClick={() => this.props.changeGender(CONST.GENDER.KIDS)}><span>kids</span></li>
                            </ul>
                        </div>
                        <div className="hcb-search-bar-wrap">
                            <div className="hcb-search-bar">
                                <div className="hcb-sb-button"
                                    ref={node => this.hcb_sb_button = node}>
                                    <div className="hcb-sb-button__text" ref={node => this.hcb_sb_button_text = node}>search by</div>
                                    <img className="hcb-sb-button__icon" src={ic_dropdown}></img>
                                    <div className="hcb-sb-dropdown" style={dropdown_style}>
                                        <div className="hcb-sb-dropdown--background">
                                        </div>
                                        <div className="hcb-sb-dropdown--wrap">
                                            <div className="hcb-sb-dropdown-item" onMouseDown={() => this.props.doSearchBy(CONST.SEARCH.IMAGE)}>
                                                <img className="hcb-sb-ditem__icon" src={ic_sh_camera}></img>
                                                <span className="hcb-sb-ditem__text">image</span>
                                            </div>
                                            <div className="hcb-sb-dropdown-item" onMouseDown={() => this.props.doSearchBy(CONST.SEARCH.DESC)}>
                                                <img className="hcb-sb-ditem__icon" src={ic_sh_description}></img>
                                                <span className="hcb-sb-ditem__text">description</span>
                                            </div>
                                            <div className="hcb-sb-dropdown-item" onMouseDown={() => this.props.doSearchBy(CONST.SEARCH.OUTFITS)}>
                                                <img className="hcb-sb-ditem__icon" src={ic_sh_outfits}></img>
                                                <span className="hcb-sb-ditem__text">outfits</span>
                                            </div>
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
}
export default withCookies(HomeCenterBar)