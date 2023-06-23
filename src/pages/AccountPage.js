import React, {Component} from 'react'

import {Cookies, withCookies} from 'react-cookie';
import { instanceOf } from 'prop-types';


class AccountPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        document.title = 'My Account';
    }
    
    render() {

        return(
            <div className="account-page">
                This is account page
            </div>
        );
    }
}
export default withCookies(AccountPage)