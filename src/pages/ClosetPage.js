import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class ClosetPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Closet';
    }
    
    render() {

        return(
            <div className="closet-page">
                This is closet page
            </div>
        );
    }
}
export default withCookies(ClosetPage)