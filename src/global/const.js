const PAGE_URL = {
    HOME: '/',

    LOGIN: '/login',
    SIGNUP: '/signup',

    SEARCH_IMG: '/search_image',
    SEARCH_DESC: '/search_desciption',
    SEARCH_OUTFITS: '/search_outfits',

    CLOSET: '/closet',
    ACCOUNT: '/account',
    OUTFITS: '/outfits',

    FORGET_PASS: '/forgetpassword',
    RESET_PASS_REQUEST: '/password/recover',
    RESET_PASS_REQUEST_SENT: '/reset_password_request_sent',
    RESET_PASS_EMAIL: '/password',/*email template*/
    RESET_PASS: '/reset_password',

    CONFIRM_ACCOUNT: '/confirm_account',/*email template */
    VERIFICATION_EMAIL: '/verification_email',

    BROWSER_SUPPORT: '/browser_support',

    MAIN: '/main'
}

const BROWSER_SUPPORT_VERSION = {
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
        VERSION: 10,
    },
    EDGE: {
        NAME: 'edge',
        VERSION: 10,
    },
    SAFARI: {
        NAME: 'safari',
        VERSION: 9,
    },
    Android: {
        NAME: 'android',
        VERSION: 4.4,
    },
    IOS: {
        NAME: 'ios',
        VERSION: 9,
    }
}

const HOME_VIDEO_DIMENSION = {
    WIDTH: 1280,
    HEIGHT: 720
}

const HOME_BKIMG_DIMENSION = {
    PORTRAIT:{
        WIDTH: 550,
        HEIGHT: 720
    },
    LANDSCAPE: {
        WIDTH: 1280,
        HEIGHT: 720
    }
}

const GENDER_TYPE = {
    MEN: 'man',
    WOMEN: 'woman',
    KIDS: 'kids'
}

const FORM_GENDER_TYPE = {
    MALE: 'male',
    FEMALE: 'female'
}

const FIELD_ERROR = {
    EMPTY: 'empty',
    INCORRECT: 'incorrect',
    EXIST: 'exist',
    NONE: '',
    INVALID: 'invalid',
    CHECK_ERROR: 'check_error',
    CHECK_OK: 'check_ok',
}

const SEARCH_BY = {
    IMAGE: 'image',
    DESC: 'description',
    OUTFITS: 'outfits'
}

const API_INFO = {
    BASE_URL: 'http://176.9.17.3:5001',
    KEY: '1d3fcef8-f4f3-4a11-b64c-87b4da46cb17',

    URLS: {
        LOGIN: '/login',

        CHECK_EXISTENCE: '/check_existence',
        POSTCODE_SUGGEST: '/postcode_suggest',
        REGISTER: '/register',
        RESEND_CONFIRMATION: '/resend_confirmation',
        CONFIRM: '/confirm',

        RESET_PASSWORD_REQUEST: '/reset_password_request',
        RESET_PASSWORD: '/reset_password'

    },

    RESP: {
        INVALID: {
            status_text: 'WARNING',
            message: 'invalid credentials',
        },
        PENDING: {
            status_text: 'WARNING',
            message: 'user pending confirmation!'
        },
        SUCCESS: {
            status_text: 'SUCCESS',
        },
        OK: {
            status_text: 'OK',
        },
        ERROR: {
            status_text: 'ERROR',

            message_unauthorized: 'Unauthorized',
            message_could_not_verify: 'could not verify your login',
            message_internal_error: 'internal error occured',
            message_bad_request: 'Bad Request'
        },
        WARNING: {
            status_text: 'WARNING',

            message_existing_username: 'existing username',
            message_existing_email: 'existing email',
            message_invalid_credentials: 'invalid credentials',
            message_user_pending_confirmation: 'user pending confirmation',
            message_confirmation_expired: 'confirmation expired',
            message_account_already_confirmed: 'account already confirmed',
            message_something_has_happened: 'something has happened',
            message_invalid_expired_link: 'invalid or expired link',
            message_link_used_before: 'link used before'
        }
    }
}

const VIEWPORT_DIRECTION = {
    LANDSCAPE: 'landscape',
    PORTRAIT: 'portrait',
    NONE: 'none'
}

const FORM_INPUT_TYPE = {
    PASSWORD: 'password',
    DATE: 'date',
    OPTION: 'option',
    POSTCODE: 'postcode'
}

const FORM_NAME = {
    LOGIN: 'login',
    SIGNUP: 'signup',
    SIGNUP_SENT: 'signupsent'
}

const COOKIE_NAME = {
    GLOBAL: {
        USERNAME: 'username',
        GENDER: 'gender',
        TOKEN: 'token',
        EMAIL: 'email'
    },

    SIGNUP_PAGE: {
        USERNAME: 'signup_page_username',
        EMAIL: 'signup_page_email',
        NEEDS_VERIFICATION: 'signup_page_needs_verification'
    },

    RESET_PW_PAGE: {
        EMAIL: 'reset_password_page_email',
        TOKEN: 'reset_password_page_token',
    }
}

const CONST = {
    PAGE: PAGE_URL,
    GENDER: GENDER_TYPE,
    API: API_INFO,
    FIELD_ERR: FIELD_ERROR,
    SEARCH: SEARCH_BY,
    HVIDEO_DM: HOME_VIDEO_DIMENSION,
    HBKIMG_DM: HOME_BKIMG_DIMENSION,
    VIEWPORT_DIR: VIEWPORT_DIRECTION,
    BROWSER: BROWSER_SUPPORT_VERSION,
    FORM_INPUT: FORM_INPUT_TYPE,
    FGENDER: FORM_GENDER_TYPE,
    FORM: FORM_NAME,
    COOKIE: COOKIE_NAME
}

export default CONST;
