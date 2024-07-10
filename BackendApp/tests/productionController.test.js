const express = require('express');
const request = require('supertest');
const { redisClient } = require('../redis.js');

const ProdModel = require('../reposio/productionDal.js');
const productionRoutes = require('../routes/productionRoutes.js');
const ProdController = require('../controllers/productionController.js');
const ProdService = require('../service/productionService.js');

const prodService = new ProdService(ProdModel);
const prodController = new ProdController(prodService);

describe('ProductionController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    let server;
    beforeAll(async () => {
        server = express();
        const port = 1000;
        server.use(express.json());
        server.use('/api', productionRoutes(prodController));

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

    it('get All production', done => {
        request(server)
            .get('/api/production')
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(JSON.stringify(res.body));
                done();
            });
    });

    it('get one product', done => {
        request(server)
            .get('/api/production/2')
            .expect(200)
            .end((err, res) => {
                if (err) throw new Error(JSON.stringify(res.body));
                done();
            });
    });
});
