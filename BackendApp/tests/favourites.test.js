const express = require('express');
const { redisClient } = require('../redis.js');

const FavouritesModel = require('../reposio/favouritesDal.js');
const FavouritesService = require('../service/favouritesService.js');

const favouritesService = new FavouritesService(FavouritesModel);

describe('FavouritesController', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });
    let server;
    beforeAll(async () => {
        server = express();
        const port = 1004;
        server.use(express.json());

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

    it('Add to favourites', async () => {
        const result = await favouritesService.addFavouriteItem(6, 3);

        expect(result).toBeUndefined();
    });

    it('Delete from favourites', async () => {
        const result = await favouritesService.deleteFavouriteItem(6, 3);

        expect(result).toBeUndefined();
    });

    it('Get favourites', async () => {
        const result = await favouritesService.getFavouritesById(14);

        expect(result).toBeInstanceOf(Array);
    });
});
