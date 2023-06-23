import React, {Component} from 'react'

import bv_home_women from '../../assets/images/bv_home_women.mp4'
import bk_home_women from '../../assets/images/bk_home_women.png'
import bk_home_women_portrait from '../../assets/images/bk_home_women_portrait.png'
import bv_home_men from '../../assets/images/bv_home_men.mp4'
import bk_home_men from '../../assets/images/bk_home_men.png'
import bk_home_men_portrait from '../../assets/images/bk_home_men_portrait.png'
import bv_home_kids from '../../assets/images/bv_home_kids.mp4'
import bk_home_kids from '../../assets/images/bk_home_kids.png'
import bk_home_kids_portrait from '../../assets/images/bk_home_kids_portrait.png'

import {withCookies} from 'react-cookie';
import CONST from '../../global/const';
import ReactPlayer from 'react-player';


class HomeBackground extends Component {
    
    constructor(props){
        super(props);

    }
    
    render() {        
        var hbk_cls_name = 'home-background';
        
        if(this.props.info.video_screen_dir === CONST.VIEWPORT_DIR.LANDSCAPE){
            hbk_cls_name = 'home-background bk--landscape';
        }

        var hbk_style = {};
        if(this.props.info.bk_height > 0){
            hbk_style = {
                'height': this.props.info.bk_height + 'px'
            }
        }

        if(this.props.info.vpw < 768){
            //render image (mobile)
            var bk_home;
            var img_style = {};

            if(this.props.info.gender === CONST.GENDER.WOMEN){
                bk_home = bk_home_women;
            }
            if(this.props.info.gender === CONST.GENDER.MEN){
                bk_home = bk_home_men;
            }
            if(this.props.info.gender === CONST.GENDER.KIDS){
                bk_home = bk_home_kids;
            }

            var final_bk_height = this.props.info.vph;
            if(this.props.info.bk_height != 0){
                final_bk_height = this.props.info.bk_height;
            }
            
            if(this.props.info.viewport_dir === CONST.VIEWPORT_DIR.LANDSCAPE){
                
                if((final_bk_height / this.props.info.vpw) < (CONST.HBKIMG_DM.LANDSCAPE.HEIGHT / CONST.HBKIMG_DM.LANDSCAPE.WIDTH)){
                    img_style = {
                        width: '100%',
                        height: 'auto'
                    }
                    console.log('check point 1');
                }
                else{
                    var img_width = final_bk_height * CONST.HBKIMG_DM.LANDSCAPE.WIDTH / CONST.HBKIMG_DM.LANDSCAPE.HEIGHT;
                    img_width = img_width / 2;
                    img_style = {
                        width: 'auto',
                        height: '100%',
                        'marginLeft': 'calc( 50vw - ' + img_width + 'px )'
                    }
                    console.log('check point 2');
                }
            }
            else{
                if((final_bk_height / this.props.info.vpw) < (CONST.HBKIMG_DM.PORTRAIT.HEIGHT / CONST.HBKIMG_DM.PORTRAIT.WIDTH)){
                    img_style = {
                        width: '100%',
                        height: 'auto'
                    }

                    //var new_img_height = this.props.info.vpw * CONST.HBKIMG_DM.PORTRAIT.HEIGHT / CONST.HBKIMG_DM.PORTRAIT.WIDTH
                    console.log('check point 3');
                }
                else{
                    var img_width = final_bk_height * CONST.HBKIMG_DM.PORTRAIT.WIDTH / CONST.HBKIMG_DM.PORTRAIT.HEIGHT;
                    img_width = img_width / 2;
                    img_style = {
                        width: 'auto',
                        height: '100%',
                        'marginLeft': 'calc( 50vw - ' + img_width + 'px )'
                    }
                    console.log('check point 4');
                }
                if(this.props.info.gender === CONST.GENDER.WOMEN){
                    bk_home = bk_home_women_portrait;
                }
                if(this.props.info.gender === CONST.GENDER.MEN){
                    bk_home = bk_home_men_portrait;
                }
                if(this.props.info.gender === CONST.GENDER.KIDS){
                    bk_home = bk_home_kids_portrait;
                }
            }
            console.log(this.props.info.vpw, this.props.info.vph);
            return (
                <div className={hbk_cls_name} style={hbk_style}>
                    <div className="img-wrap">
                        <img src={bk_home} style={img_style}></img>
                    </div>
                </div>
            )
        }
        else{

            //render video (desktop)
            var bv_home;
            var bk_home;

            //var video_width = this.props.info.vph * CONST.HVIDEO_DM.WIDTH / CONST.HVIDEO_DM.HEIGHT;
            var video_width = this.props.info.bk_height * CONST.HVIDEO_DM.WIDTH / CONST.HVIDEO_DM.HEIGHT;
            var margin_left = (video_width - this.props.info.vpw ) / 2;            

            if(video_width > this.props.info.vpw){
                if(this.props.info.video_screen_dir != CONST.VIEWPORT_DIR.LANDSCAPE){
                    hbk_style['left'] = '-' + margin_left + 'px';
                    hbk_style['position'] = 'relative';
                    hbk_style['width'] = 'calc(100% + ' + Math.abs(margin_left) + 'px)';
                }
            }
            
            // video_wrap_style = {};
            if(this.props.info.gender === CONST.GENDER.WOMEN){
                bv_home = bv_home_women;
                bk_home = bk_home_women;
            }
            if(this.props.info.gender === CONST.GENDER.MEN){
                bv_home = bv_home_men;
                bk_home = bk_home_men;
            }
            if(this.props.info.gender === CONST.GENDER.KIDS){
                bv_home = bv_home_kids;
                bk_home = bk_home_kids;
            }

            return (
                <div className={hbk_cls_name} style={hbk_style}>
                    <ReactPlayer className="video-wrap" config={{file: { attributes: { poster: bk_home} } }} url={bv_home} playing={this.props.info.playing} height="100%" loop muted={this.props.info.mute}></ReactPlayer>
                </div>
            )
        }

    }
}
export default withCookies(HomeBackground);