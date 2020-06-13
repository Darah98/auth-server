'use strict';
const basicAuth = require('../src/auth/middleware/basic.js');
let consoleSpy = jest.spyOn(console, 'log').mockImplementation();
const req = {headers:{authorization:'ZGFyYWg6MTgxMg=='}};
const res = {};
const next= jest.fn();
describe('Basic Auth Middleware', () => {
    it('returns false if no info in authorization headers', () => {
        basicAuth(req, res, next);
        expect(next()).toBeFalsy();
    });
    it('moves to the the next middleware properly', ()=>{
        const header =req.headers.authorization;
        basicAuth(header, res, next);
        expect(consoleSpy).toHaveBeenCalled();
    })
});