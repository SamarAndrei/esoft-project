const express = require('express');
const request = require('supertest');
const { redisClient } = require('../redis.js');

const CommModel = require('../reposio/commDal.js');
const commRoutes = require('../routes/commRoutes.js');
const CommController = require('../controllers/commController.js');
const CommService = require('../service/commService.js');

const commService = new CommService(CommModel);
const commController = new CommController(commService);

describe('CommentsController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    let server;
    beforeAll(async () => {
        server = express();
        const port = 1002;
        server.use(express.json());
        server.use('/api', commRoutes(commController));

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
        await CommModel.deleteCommentForTest(
            'Test comment Test comment Test comment',
        );
    });

    it('Create a comment', async () => {
        const commentData = {
            comment: 'Test comment Test comment Test comment',
            rating: 3,
        };

        const result = await commService.createComm(commentData, 2, 14);

        expect(result).toBeUndefined();
    });

    it('Create a comment with invalid text', async () => {
        const commentData = {
            comment: 'Test comment',
            rating: 3,
        };

        request(server)
            .post('/api/comments')
            .send(commentData)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    throw new Error(JSON.stringify(res.body));
                }
                done();
            });
    });

    it('Create a comment with invalid rating', async () => {
        const commentData = {
            comment: 'Test comment',
            rating: 8,
        };

        request(server)
            .post('/api/comments')
            .send(commentData)
            .expect(400)
            .end((err, res) => {
                if (err) {
                    throw new Error(JSON.stringify(res.body));
                }
                done();
            });
    });

    it('Get comments by product id', done => {
        request(server)
            .get('/api/production/3/comments')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    throw new Error(JSON.stringify(res.body));
                }
                done();
            });
    });
});
