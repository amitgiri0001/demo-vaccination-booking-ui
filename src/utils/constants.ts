// APP TEXT
export const APP_TITLE = "Vaccination drive - SG"
export const FOOTER_TEXT = `${new Date().getFullYear()} Built with ♡ by community`

export const API_BASE_PATH = process.env.REACT_APP_ENV === 'development' ? 'https://vacc-api.herokuapp.com' : `http://[::1]:5000`; 

// PAGES TITLE
export const PAGE_TITLE_HOME = "Home"
export const PAGE_TITLE_SETTINGS = "Slots"
export const PAGE_TITLE_BOOKING_SUCCESS = "Success"
export const PAGE_TITLE_BOOKING_ERROR = "Error"

// UI CONSTANTS
export const FOOTER_HEIGHT = 30
export const HEADER_HEIGHT = 60