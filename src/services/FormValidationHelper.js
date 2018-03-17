import { isEmail } from "validator";

export function validateEmail (rule, value, callback) {
  if (value && isEmail(value)) {
    callback()
  } else {
    callback(new Error('Please input a valid email address.'))
  }
}
