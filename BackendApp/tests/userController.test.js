const express = require('express');
const request = require('supertest');
const { redisClient } = require('../redis.js');

const RolesModel = require('../reposio/rolesDal.js');
const UserModel = require('../reposio/userDal.js');
const userRoutes = require('../routes/userRoutes.js');
const UserController = require('../controllers/userController.js');
const UserService = require('../service/userService.js');

const userService = new UserService(UserModel, RolesModel);
const userController = new UserController(userService);

describe('UserController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    let server;
    beforeAll(async () => {
        server = express();
        const port = 1001;
        server.use(express.json());
        server.use('/api', userRoutes(userController));

        server.listen(port, 'localhost', () => {
            console.log(`Server listening at http://localhost:${port}`);
            try {
                redisClient
                    .on('error', err => console.log('redisClient error'))
                    .connect();
            } catch (e) {
                console.log(e);
            }
        });
    });

    afterAll(async () => {
        await UserModel.deleteByEmailForTest('test2@test.ru');
    });

    it('Registration', done => {
        request(server)
            .post('/api/registration')
            .send({
                name: 'Test',
                email: 'test2@test.ru',
                password: '12345678',
            })
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw new Error(JSON.stringify(res.body));
                }
                done();
            });
    });

    it('Registration but password < 8', done => {
        request(server)
            .post('/api/registration')
            .send({
                name: 'Test',
                email: 'test3@test.ru',
                password: '123',
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw new Error(JSON.stringify(res.body));
                done();
            });
    });

    it('Registration but invalid email < 8', done => {
        request(server)
            .post('/api/registration')
            .send({
                name: 'Test',
                email: 'test',
                password: '12345678',
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw new Error(JSON.stringify(res.body));
                done();
            });
    });

    it('Login', done => {
        request(server)
            .post('/api/Login')
            .send({
                email: 'test2@test.ru',
                password: '12345678',
            })
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(JSON.stringify(res.body));
                done();
            });
    });

    it('Login with invalid password', done => {
        request(server)
            .post('/api/Login')
            .send({
                email: 'test2@test.ru',
                password: '678',
            })
            .expect(400)
            .end((err, res) => {
                if (err) throw new Error(JSON.stringify(res.body));
                done();
            });
    });
});
