const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const TokenService = require('./tokenService');
const ApiError = require('../exceptions/api_error');

class UserService {
    constructor(userModel, rolesModel) {
        this.userModel = userModel;
        this.rolesModel = rolesModel;
    };

    async registration(userData) {
        const existingUser = await this.userModel.findByEmail(userData.email)

        if(existingUser) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${userData.email} уже существует`)
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, parseInt(process.env.SALT_ROUNDS));
            const newUserData = {
                name: userData.name,
                role_id: process.env.USER_ACCESS_ID,
                email: userData.email,
                password: hashedPassword
            };
            this.userModel.create(newUserData);

            const user = await this.userModel.findByEmail(userData.email);
            const role = await this.rolesModel.findById(user.role_id);

            const tokens = TokenService.generateTokens({ id: user.id, name: user.name, role: role.name});
            await TokenService.saveToken(user.id, tokens.refreshToken);

            return {...tokens};
        }
    };

    async createRole(userData) {
        const existingUser = await this.userModel.findByEmail(userData.email)

        if(existingUser) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, parseInt(process.env.SALT_ROUNDS));
            const newUserData = {
                name: userData.name,
                role_id: userData.role_id ? userData.role_id : process.env.USER_ACCESS_ID,
                email: userData.email,
                password: hashedPassword
            };

            this.userModel.createRole(newUserData);
        }
    };

    async login(userData) {
        const user = await this.userModel.findByEmail(userData.email);
        const role = await this.rolesModel.findById(user.role_id);

        if (user && await bcrypt.compare(userData.password, user.password)) {
            const tokens = TokenService.generateTokens({ id: user.id, name: user.name, role: role.name});
            await TokenService.saveToken(user.id, tokens.refreshToken);

            return {...tokens};
        } else {
            throw ApiError.BadRequest('Неверный пароль');
        }
    };

    async getAllUsers(offset, limit) {
        return this.userModel.getAll(offset, limit);
    };

    async getUserById(id) {
        return this.userModel.getById(id);
    };

    async updateUser(id, userData) {
        let hashedPassword = '';
        if(userData.password){
            hashedPassword = await bcrypt.hash(userData.password, parseInt(process.env.SALT_ROUNDS));
        }

        const newUserData = Object.assign({},
            userData.name && { name: userData.name },
            userData.email && { email: userData.email },
            hashedPassword
        );        
        return this.userModel.update(id, newUserData); 
    };
};

module.exports = UserService;