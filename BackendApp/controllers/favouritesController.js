const ApiError = require('../exceptions/api_error');

class FavouritesController {
    constructor(favouritesService) {
        this.favouritesService = favouritesService;
    };
    
    getFavouritesById = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);

            const favourites = await this.favouritesService.getFavouritesById(user_id);
    
            if (favourites) {
                res.status(200).json(favourites);
            } else {
                throw ApiError.NotFound(`Избранное не найдено`);                
            }
        } catch (e) {
            next(e);
        }
    };
    
    addFavouriteItem = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const newItem = await this.favouritesService.addFavouriteItem(req.body, user_id, prod_id);
            res.status(200).json(newItem);
        } catch (e) {
            next(e);
        }
    };

    deleteFavouriteItem = async (req, res, next) => {
        try {
            const user_id = parseInt(req.user.id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const deletedItem = await this.favouritesService.deleteFavouriteItem(user_id, prod_id);
            res.status(200).json(deletedItem);
        } catch (e) {
            next(e);
        }
    };
};

module.exports = FavouritesController;