var assert = require('assert');
let Validators = require('../validators.js');

describe('Validation', () => {
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
        it('should return false; not valid', () => {
            let pswd = 'abcdefghijk';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(false, tuple[0]);
        });
        it('should return false; not valid', () => {
            let pswd = '12345678';
            let tuple = Validators.validatePassword(pswd)
            assert.equal(false, tuple[0]);
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
});