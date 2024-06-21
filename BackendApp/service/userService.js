const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');

class UserService {
    constructor(userModel, rolesModel) {
        this.userModel = userModel;
        this.rolesModel = rolesModel;
    };

    async registration(userData) {
        const existingUser = await this.userModel.findByEmail(userData.email)

        if(existingUser) {
            throw new Error('Юзер существует')
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, parseInt(process.env.SALT_ROUNDS));
            const newUserData = {
                name: userData.name,
                role_id: userData.role_id ? userData.role_id : 2,
                email: userData.email,
                password: hashedPassword
            };
            return this.userModel.create(newUserData);
        }
    };

    async login(userData) {
        const user = await this.userModel.findByEmail(userData.email);
        const role = await this.rolesModel.findById(user.role_id)

        if (user && await bcrypt.compare(userData.password, user.password)) {
            const token = jwt.sign({ id: user.id, name: user.name, role: role.name}, process.env.SECRET_KEY, { expiresIn: process.env.SESSION_DURATION });
            return { message: 'Authenticated', token };
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    };

    async getAllUsers() {
        return this.userModel.getAll();
    };

    async getUserById(id) {
        return this.userModel.getById(id);
    };

    async updateUser(id, userData) {
       return this.userModel.update(id, userData); 
    };
};

module.exports = UserService;