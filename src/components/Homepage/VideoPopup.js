import React, {Component} from 'react'

import ic_arrow_right from '../../assets/images/ic_arrow_right.png'
import ic_btn_facebook from '../../assets/images/ic_btn_facebook.png'
import ic_btn_google from '../../assets/images/ic_btn_google.png'
import ic_btn_twitter from '../../assets/images/ic_btn_twitter.png'
import ic_warning from '../../assets/images/ic_warning.png'

class VideoPopup extends Component {
    render() {
        var video_url = '';
        var cls_name = 'video-popup';
        if(this.props.info.video_visible){
            video_url = 'https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com';
            cls_name = 'video-popup visible';
        }
        return(
            
            <div className={cls_name} onClick={() => this.props.showVideo(false)}>
                <div className="video-popup-bk"></div>
                <div className="video-popup-wrap">
                    <iframe className="video-iframe" type="text/html" src={video_url} frameBorder="0"></iframe>
                </div>
            </div>
        )
    }
}
export default VideoPopup