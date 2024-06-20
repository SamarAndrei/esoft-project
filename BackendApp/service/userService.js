const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');


class UserService {
    constructor(userModel, rolesModel) {
        this.userModel = userModel;
        this.rolesModel = rolesModel;
    };

    async registration(userData) {
        const existingUser = await this.userModel.findByFilter(userData)

        if(existingUser) {
            throw new Error('Юзер существует')
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, parseInt(process.env.SALT_ROUNDS));
            const newUserData = {'password': hashedPassword,'email':userData.email, 'name': userData.name}
            return this.userModel.create(newUserData);
        }
    };

    async login(userData) {
        const user = await this.userModel.findByFilter(userData);
        const role = await this.rolesModel.findByFilter(user.role_id)
        
        if (user && await bcrypt.compare(userData.password, user.password)) {
            const token = jwt.sign({ id: user.id, name: user.name, role: role}, process.env.SECRET_KEY, { expiresIn: process.env.SESSION_DURATION });
            return res.json({ message: 'Authenticated', token });
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