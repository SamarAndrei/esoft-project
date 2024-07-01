const pool = require('../db');

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
            throw err;
        } finally {
            // await pool.destroy();
        }
    }
}

module.exports = new RolesModel();
