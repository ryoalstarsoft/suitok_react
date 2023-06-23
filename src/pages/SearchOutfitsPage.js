import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class SearchOutfitsPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Search by outfits';
    }
    
    render() {

        return(
            <div className="search-outfits-page">
                This is search by outfits page
            </div>
        );
    }
}
export default withCookies(SearchOutfitsPage)