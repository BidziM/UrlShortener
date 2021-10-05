import validator from 'validator'

export function urlValidation(url) {
    return validator.isURL(url, {validate_length:false}) ? true : false
};