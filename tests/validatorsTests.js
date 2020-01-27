const assert = require('assert');
const Validators = require('../public/js/validators.js');

describe('/public/js/validators.js', () => {
    describe('validatePassword', () => {
        it('should return false; too short', () => {
            let pswd = 'abc1234';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(false, tuple[0]);
        });
        it('should return false; too long', () => {
            let pswd = '123aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(false, tuple[0]);
        });
        it('should return true; is valid', () => {
            let pswd = 'abcdefghijk';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(true, tuple[0]);
        });
        it('should return true; is valid', () => {
            let pswd = '12345678';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(true, tuple[0]);
        });
        it('should return true; is valid', () => {
            let pswd = 'abc12345';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(true, tuple[0]);
        });
        it('should return true; is valid', () => {
            let pswd = 'qw3rtyuiop';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(true, tuple[0]);
        });
        it('should return true; is valid', () => {
            let pswd = '123aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(true, tuple[0]);
        });
    });
    describe('validateEmail', () => {
        it('should return false; not valid', () => {
            let email = 'a';
            let res = Validators.validateEmail(email);
            assert.equal(false, res);
        });
        it('should return false; not valid', () => {
            let email = 'a@';
            let res = Validators.validateEmail(email);
            assert.equal(false, res);
        });
        it('should return false; not valid', () => {
            let email = 'a@a';
            let res = Validators.validateEmail(email);
            assert.equal(false, res);
        });
        it('should return false; not valid', () => {
            let email = 'a@a.';
            let res = Validators.validateEmail(email);
            assert.equal(false, res);
        });
        it('should return false; not valid', () => {
            let email = 'a@a.a';
            let res = Validators.validateEmail(email);
            assert.equal(false, res);
        });
        it('should return true; is valid', () => {
            let email = 'a@a.aa';
            let res = Validators.validateEmail(email);
            assert.equal(true, res);
        });
    });
});