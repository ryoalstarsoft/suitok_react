import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class OutfitsPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'Outfits';
    }
    
    render() {

        return(
            <div className="outfits-page">
                This is outfits page
            </div>
        );
    }
}
export default withCookies(OutfitsPage)