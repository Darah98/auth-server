'use strict';
const server= require('../src/server.js');
const supergoose= require('@code-fellows/supergoose');
const mockServer= supergoose(server);

describe('Server', ()=>{
    it('signs a user up', ()=>{
        const user= {username:'user', password:'usr123'}
        mockServer.post('/auth/v1/signup').send(user).then(result=>{
            expect(result).objectContaining();
        });
    });
    it('signs a user in', ()=>{
        const user= {username:'user', password:'usr123'}
        mockServer.post('/auth/v1/signup').send(user.username, user.password).then(result=>{
            expect(result).resolves();
        })
    })
});