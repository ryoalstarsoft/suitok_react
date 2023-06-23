
var BROWSER_SUPPORT = {
    CHROME: {
        NAME: 'chrome',
        VERSION: 45,
    },
    FIREFOX: {
        NAME: 'firefox',
        VERSION: 38,
    },
    IE: {
        NAME: 'ie',
        VERSION: 11,
    },
    MSEDGE: {
        NAME: 'microsoft edge',
        VERSION: 10,
    },
    SAFARI: {
        NAME: 'safari',
        VERSION: 9,
    },
    ANDROID: {
        NAME: 'android',
        VERSION: 4.4,
    },
    IOS: {
        NAME: 'ios',
        VERSION: 9,
    }
}

function showUnsupportPage(visible){
    if(visible){
        $('#unsupport_page').show();
        $('#root').hide();
        var browser_name = platform.name;

        if(platform.name.toLowerCase() === BROWSER_SUPPORT.CHROME.NAME){
            browser_name = 'Google Chrome';
        }
        if(platform.name.toLowerCase() === BROWSER_SUPPORT.FIREFOX.NAME){
            browser_name = 'Mozilla Firefox';
        }
        if(platform.name.toLowerCase() === BROWSER_SUPPORT.IE.NAME){
            browser_name = 'Microsoft Internet Explorer';
        }
        if(platform.name.toLowerCase() === BROWSER_SUPPORT.MSEDGE.NAME){
            browser_name = 'Microsoft Edge';
        }
        if(platform.name.toLowerCase() === BROWSER_SUPPORT.SAFARI.NAME){
            browser_name = 'Apple Safari';
        }

        $('#old_browser_name').text(browser_name);
        document.title = 'Browser is out-of-date';

    }
    else{
        $('#unsupport_page').hide();
        $('#root').show();
    }
}

// alert(platform.name + ',  ' + platform.version + ', ' + platform.product + ', ' + platform.manufacturer + ', ' + platform.layout + ', ' + platform.os + ', ' + platform.description);

// alert(platform.os.family);
if(platform.os.family.toLowerCase() == BROWSER_SUPPORT.ANDROID.NAME && parseFloat(platform.os.version) < BROWSER_SUPPORT.ANDROID.VERSION){
    //android
    showUnsupportPage(true);
}
else if(platform.os.family.toLowerCase() == BROWSER_SUPPORT.IOS.NAME && parseInt(platform.os.version) < BROWSER_SUPPORT.IOS.VERSION){
    //ios
    showUnsupportPage(true);
}
else if(platform.name.toLowerCase() === BROWSER_SUPPORT.CHROME.NAME && parseInt(platform.version) < BROWSER_SUPPORT.CHROME.VERSION){
    //chrome
    showUnsupportPage(true);
}
else if(platform.name.toLowerCase() === BROWSER_SUPPORT.FIREFOX.NAME && parseInt(platform.version) < BROWSER_SUPPORT.FIREFOX.VERSION){
    //firefox
    showUnsupportPage(true);
}
else if(platform.name.toLowerCase() === BROWSER_SUPPORT.IE.NAME && parseInt(platform.version) < BROWSER_SUPPORT.IE.VERSION){
    //ie
    showUnsupportPage(true);
}
else if(platform.name.toLowerCase() === BROWSER_SUPPORT.MSEDGE.NAME && parseInt(platform.version) < BROWSER_SUPPORT.MSEDGE.VERSION){
    //edge
    showUnsupportPage(true);
}
else if(platform.name.toLowerCase() === BROWSER_SUPPORT.SAFARI.NAME && parseInt(platform.version) < BROWSER_SUPPORT.SAFARI.VERSION){
    //safari
    showUnsupportPage(true);
}
else{
    //other
    showUnsupportPage(false);
}

