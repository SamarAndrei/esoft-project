const express = require('express');
const cors = require('cors');

const app = express();

const port = 3000;
app.use(express.json());
app.use(cors())

const RolesModel = require('./reposio/rolesDal'); 
const UserModel = require('./reposio/userDal'); 
const userRoutes = require('./routes/userRoutes');
const UserController = require('./controllers/userController');
const UserService = require('./service/userService');

const userService = new UserService(UserModel, RolesModel);
const userController = new UserController(userService);

app.use('/api', userRoutes(userController));

app.listen(port, 'localhost', () => {
    console.log(`Server listening at http://localhost:${port}`)
});


// const CarModel = require('./reposio/carDal'); 
// const carRoutes = require('./routes/carRoutes');
// const CarController = require('./controllers/carController');
// const CarService = require('./services/carService')


// const carService = new CarService(CarModel)
// const carController = new CarController(carService)

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUi = require('swagger-ui-express');

// app.use('/api', carRoutes(carController));
