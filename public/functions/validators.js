var Validators = {

    /**
     * Check if passed in password is valid. Returns a tuple in this format: 
     * [bool, message]. The bool is true if the password is valid, false o.w..
     * If false, the message explains why the password isn't valid.
     * 
     * @param {string} password 
     * @return a tuple with a bool and string
     */
    validatePassword: function validatePassword(password) {

        // Check if password is proper length.
        let longEnough = 7 < password.length ? true : false;
        let shortEnough = password.length < 256 ? true : false;

        if (!longEnough) { return [false, "Your password is too short!"]; }
        if (!shortEnough) { return [false, "Your password is too long!"]; }

        let hasAlpha = true /*false*/;
        let hasNum = true /*false*/;

        // Check if the password has at least one alphabetical and numerical char.
        for (let i = 0; i < password.length; ++i) {
            let ascii = password.charCodeAt(i);
            if ((65 <= ascii && ascii <= 90) || (97 <= ascii && ascii <= 122)) {
                hasAlpha = true;
            }
            if (48 <= ascii && ascii <= 57) {
                hasNum = true;
            }
        }

        if (hasAlpha && hasNum) {
            return [true, ""];
        } else {
            return [false, "Not a valid password!"];
        }
    },

    /**
     * Check if email is valid.
     * 
     * @param {string} email
     * @return a bool; true if valid, false otherwise.
     */
    validateEmail: function validateEmail(email) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
};

module.exports = Validators;
