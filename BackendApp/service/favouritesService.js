class FavouritesService {
    constructor(favoriteModel) {
        this.favoriteModel = favoriteModel;
    };

    async addFavouriteItem(favouriteData, user_id, prod_id) {
        const newFavoriteData = {user_id: user_id, prod_id};;
        return this.favoriteModel.create(newFavoriteData); 
    };

    async getFavouritesById(user_id) {
        return this.favoriteModel.getAll(user_id);
    };

    async deleteFavouriteItem(user_id, prod_id) {
        return this.favoriteModel.delete(user_id, prod_id);
    };
};

module.exports = FavouritesService;