const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middleware/errorMiddleware.ts');
require('dotenv').config();

const { redisClient } = require('./redis.js');

const app = express();

const port = 3000;
app.use(express.json());
app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
    }),
);
app.use(cookieParser());

const RolesModel = require('./reposio/rolesDal');
const UserModel = require('./reposio/userDal');
const userRoutes = require('./routes/userRoutes');
const UserController = require('./controllers/userController');
const UserService = require('./service/userService');

const CommModel = require('./reposio/commDal');
const commRoutes = require('./routes/commRoutes');
const CommController = require('./controllers/commController');
const CommService = require('./service/commService');

const ProdModel = require('./reposio/productionDal');
const productionRoutes = require('./routes/productionRoutes');
const ProdController = require('./controllers/productionController');
const ProdService = require('./service/productionService');

const CartModel = require('./reposio/cart_itemsDal');
const cartRoutes = require('./routes/cart_itemsRoutes');
const CartController = require('./controllers/cart_itemsController');
const CartService = require('./service/cart_itemsService');

const FavouritesModel = require('./reposio/favouritesDal');
const favouritesRoutes = require('./routes/favouritesRoutes');
const FavouritesController = require('./controllers/favouritesController');
const FavouritesService = require('./service/favouritesService');

const OrdersModel = require('./reposio/ordersDal');
const ordersRoutes = require('./routes/ordersRoutes');
const OrdersController = require('./controllers/ordersController');
const OrdersService = require('./service/ordersService');

const ordersService = new OrdersService(OrdersModel);
const ordersController = new OrdersController(ordersService);

const favouritesService = new FavouritesService(FavouritesModel);
const favouritesController = new FavouritesController(favouritesService);

const cartService = new CartService(CartModel);
const cartController = new CartController(cartService);

const prodService = new ProdService(ProdModel);
const prodController = new ProdController(prodService);

const userService = new UserService(UserModel, RolesModel);
const userController = new UserController(userService);

const commService = new CommService(CommModel);
const commController = new CommController(commService);

app.use('/api', userRoutes(userController));
app.use('/api', commRoutes(commController));
app.use('/api', productionRoutes(prodController));
app.use('/api', cartRoutes(cartController));
app.use('/api', favouritesRoutes(favouritesController));
app.use('/api', ordersRoutes(ordersController));

app.use(errorMiddleware);
app.listen(port, 'localhost', () => {
    console.log(`Server listening at http://localhost:${port}`);
    try {
        redisClient
            .on('error', err => console.log('redisClient error'))
            .connect();
    } catch (e) {
        console.log(e);
    }
});
