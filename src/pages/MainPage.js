import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class MainPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Main Page';
    }
    
    render() {

        return(
            <div className="search-img-page">
                This is main page
            </div>
        );
    }
}
export default withCookies(MainPage)