const bcrypt = require('bcryptjs');

var PasswordHasher = {

    /**
     * Takes in a password in plaintext and salts and hashes it with the 
     * bcrpytjs library.
     * 
     * @return salted and hased password
     */
    saltAndHashPassword: function saltAndHashPassword(password) {
        var bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                return hash;
            });
        });
    }
};

module.exports = PasswordHasher;