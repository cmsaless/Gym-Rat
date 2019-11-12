var Validators = {

    /**
     * Check if passed in password is valid. Returns a tuple in this format: 
     * [bool, message].
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

        let hasAlpha = false;
        let hasNum = false;

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
            return [true, "Good to go!"];
        } else {
            return [false, "Not a valid password!"];
        }
    },

    test: function test() {
        console.log("Yes?");
    }

};