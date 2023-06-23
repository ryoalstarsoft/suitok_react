import React, { Component } from 'react';
import HomePage from './pages/HomePage'
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

import CONST from './global/const'

import LoginPage from './pages/LoginPage';
import SearchDescPage from './pages/SearchDescPage';
import ClosetPage from './pages/ClosetPage';
import SearchImagePage from './pages/SearchImagePage';
import SearchOutfitsPage from './pages/SearchOutfitsPage';
import AccountPage from './pages/AccountPage';
import OutfitsPage from './pages/OutfitsPage';
import ForgetPWPage from './pages/ForgetPWPage';
import SignupPage from './pages/SignupPage';
import ConfirmAccountPage from './pages/ConfirmAccountPage';
import BrowserSupportPage from './pages/BrowserSupportPage';
import MainPage from './pages/MainPage';

import Platform from 'react-platform-js';
import VerificationEmailPage from './pages/VerificationEmailPage';
import PWResetRequestSentPage from './pages/PWResetRequestSentPage';
import PWResetPage from './pages/PWResetPage';
import PWResetEmailPage from './pages/PWResetEmailPage';
import PWResetRequestPage from './pages/PWResetRequestPage';

class App extends Component {
  constructor(){
    super();

    // this.checkBrowser();
  }

  checkBrowser(){

    alert(Platform.Browser + ':' + parseInt(Platform.BrowserVersion));

    if(window.location.pathname === CONST.PAGE.BROWSER_SUPPORT){
        return;
    }

    if(Platform.Browser.toLowerCase() === CONST.BROWSER.CHROME.NAME){
        if(parseInt(Platform.BrowserVersion) < CONST.BROWSER.CHROME.VERSION){
            window.location.href=CONST.PAGE.BROWSER_SUPPORT;
        }
    }

    if(Platform.Browser.toLowerCase() === CONST.BROWSER.FIREFOX.NAME){
        if(parseInt(Platform.BrowserVersion) < CONST.BROWSER.FIREFOX.VERSION){
            window.location.href=CONST.PAGE.BROWSER_SUPPORT;
        }
    }

    if(Platform.Browser.toLowerCase() === CONST.BROWSER.IE.NAME){
        if(parseInt(Platform.BrowserVersion) < CONST.BROWSER.IE.VERSION){
            window.location.href=CONST.PAGE.BROWSER_SUPPORT;
        }
    }

    if(Platform.Browser.toLowerCase() === CONST.BROWSER.EDGE.NAME){
        if(parseInt(Platform.BrowserVersion) < CONST.BROWSER.EDGE.VERSION){
            window.location.href=CONST.PAGE.BROWSER_SUPPORT;
        }
    }

    if(Platform.Browser.toLowerCase() === CONST.BROWSER.SAFARI.NAME){
        if(parseInt(Platform.BrowserVersion) < CONST.BROWSER.SAFARI.VERSION){
            window.location.href=CONST.PAGE.BROWSER_SUPPORT;
        }
    }


    //   alert(browser.name + ':' + browser.version);
    // alert(navigator.userAgent);
    //   if(window.location.pathname === CONST.PAGE.BROWSER_SUPPORT){
    //     return;
    //   }

    //   if(browser.name == CONST.BROWSER.CHROME.NAME){
    //       if(parseInt(browser.version) < CONST.BROWSER.CHROME.VERSION){
    //           window.location.href=CONST.PAGE.BROWSER_SUPPORT;
    //       }
    //   }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact={true} path='/' Component={HomePage} render={(props) => (
                <HomePage />
            )}/>

            <Route exact={true} path={CONST.PAGE.LOGIN} Component={LoginPage} render={(props) => (
                <LoginPage />
            )}/>
            <Route exact={true} path={CONST.PAGE.SIGNUP} Component={SignupPage} render={(props) => (
                <SignupPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.SEARCH_IMG} Component={SearchImagePage} render={(props) => (
                <SearchImagePage />
            )}/>
            <Route exact={true} path={CONST.PAGE.SEARCH_DESC} Component={SearchDescPage} render={(props) => (
                <SearchDescPage />
            )}/>
            <Route exact={true} path={CONST.PAGE.SEARCH_OUTFITS} Component={SearchOutfitsPage} render={(props) => (
                <SearchOutfitsPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.CLOSET} Component={ClosetPage} render={(props) => (
                <ClosetPage />
            )}/>
            <Route exact={true} path={CONST.PAGE.ACCOUNT} Component={AccountPage} render={(props) => (
                <AccountPage />
            )}/>
            <Route exact={true} path={CONST.PAGE.OUTFITS} Component={OutfitsPage} render={(props) => (
                <OutfitsPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.FORGET_PASS} Component={ForgetPWPage} render={(props) => (
                <ForgetPWPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.RESET_PASS_REQUEST} Component={PWResetRequestPage} render={(props) => (
                <PWResetRequestPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.RESET_PASS_REQUEST_SENT} Component={PWResetRequestSentPage} render={(props) => (
                <PWResetRequestSentPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.RESET_PASS_EMAIL} Component={PWResetEmailPage} render={(props) => (
                <PWResetEmailPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.RESET_PASS} Component={PWResetPage} render={(props) => (
                <PWResetPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.CONFIRM_ACCOUNT} Component={ConfirmAccountPage} render={(props) => (
                <ConfirmAccountPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.BROWSER_SUPPORT} Component={BrowserSupportPage} render={(props) => (
                <BrowserSupportPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.MAIN} Component={MainPage} render={(props) => (
                <MainPage />
            )}/>

            <Route exact={true} path={CONST.PAGE.VERIFICATION_EMAIL} Component={VerificationEmailPage} render={(props) => (
                <VerificationEmailPage />
            )}/>

          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;