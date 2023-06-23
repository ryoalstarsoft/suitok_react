import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class SearchImagePage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Search by image';
    }
    
    render() {

        return(
            <div className="search-img-page">
                This is search by image page
            </div>
        );
    }
}
export default withCookies(SearchImagePage)