class FavouritesController {
    constructor(favouritesService) {
        this.favouritesService = favouritesService;
    };
    
    getFavouritesById = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);

            const favourites = await this.favouritesService.getFavouritesById(user_id);
    
            if (favourites) {
                res.status(200).json(favourites);
            } else {
                res.status(404).send('Избранное не найдено');
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    };
    
    addFavouriteItem = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const newItem = await this.favouritesService.addFavouriteItem(req.body, user_id, prod_id);
            res.status(200).json(newItem);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };

    deleteFavouriteItem = async (req, res) => {
        try {
            const user_id = parseInt(req.params.user_id, 10);
            const prod_id = parseInt(req.params.prod_id, 10);

            const deletedItem = await this.favouritesService.deleteFavouriteItem(user_id, prod_id);
            res.status(200).json(deletedItem);
        } catch (error) {
            res.status(400).send(error.message);
        }
    };
};

module.exports = FavouritesController;