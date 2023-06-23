import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class SearchDescPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Search by description';
    }
    
    render() {

        return(
            <div className="search-desc-page">
                This is search by description page
            </div>
        );
    }
}
export default withCookies(SearchDescPage)