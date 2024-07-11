const pool = require('../db');
const ApiError = require('../exceptions/api_error');

// type User = {
//     user_id: number,
//     name: string,
//     email: string,
//     cart: number[],
//     favourite: number[],
//     registration_date: Date
// };

class RolesModel {
    async findById(id) {
        try {
            const query = pool('roles');
            const role = await query
                .where({
                    id: id,
                })
                .first();
            if (role) {
                return role;
            } else {
                return false;
            }
        } catch (err) {
            console.error('Error fetching role by ID', err);
            ApiError.BadConnectToDB(errors.array());
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new RolesModel();
