const db = require('../config/db');

const Users = {
    create: async (data) => {
        const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
        try {
            const [results] = await db.execute(sql, [data.name, data.password]);


            let dataJSON = {
                status: 'success',
                data: results
            }

            return dataJSON;
        } catch (err) {
            throw err; // Propagate the error to be handled later
        }
    },

    getAll: async () => {
        try {
            const [results] = await db.execute(`SELECT * FROM users`);

            const modifiedResults = results.map(user => ({
                ...user,
                roleName: user.roleName
            }));

            let dataJSON = {
                status: 'success',
                data: modifiedResults
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    
    
  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = 'SELECT * FROM users';
      let queryParams = [];
  
      // If there's a search text, add the WHERE clause
      if (searchtxt) {
        const columns = ['name'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      // Here, make sure to specify the column for ordering (e.g., 'id', 'name', etc.)
      query += ' ORDER BY id DESC LIMIT ? OFFSET ?'; // Use an actual column (e.g., 'id') for sorting
  
      queryParams.push(limit, offset);
  
      // Execute the query to fetch data
      const [results] = await db.execute(query, queryParams);
  
      // Query to get total count
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM users');
      const totalCount = totalCountResults[0].totalCount;
  
      return {
        status: 'success',
        data: results,
        totalCount: totalCount
      };
    } catch (err) {
      throw err;
    }
  },



    getUserStatus: async (id) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [id]);

            let status =  results[0].isActive;

            return status;
        } catch (err) {
            throw err;
        }
    },

    update: async (id, data) => {
        const sqlUpdate = 'UPDATE users SET name = ?, password = ? WHERE id = ?';
        try {
            const [updateResults] = await db.execute(sqlUpdate, [data.name, data.password,  id]);


            const sqlSelect = 'SELECT * FROM users WHERE id = ?';
            const [updatedUser] = await db.execute(sqlSelect, [id]);

            if (updatedUser.length === 0) {
                throw new Error('User not found');
            }

            let dataJSON = {
                status: 'success',
                data: updatedUser[0]
            }

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    updateUserToken: async (id, data) => {
        const sqlUpdate = 'UPDATE users SET token = ?, updated_at = NOW() WHERE id = ?';
        try {
            db.execute(sqlUpdate, [data, id]);
        } catch (err) {
            throw err;
        }
    },

    updateUserStatus: async (id, isActive, userDetails) => {
        const sql = 'UPDATE users SET isActive = ?, updated_at = NOW() WHERE id = ?';
        try {
            const [results] = await db.execute(sql, [isActive, id]);


            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id, userDetails) => {
        try {
            const [results] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

            return results;
        } catch (err) {
            throw err;
        }
    },
    findByname: async (name) => {
        const sql = 'SELECT * FROM users WHERE name = ?';
        try {

            const [results] = await db.execute(sql, [name]);

            if (results.length > 0) {
                return {
                    status: 'success',
                    data: results[0]
                };
            } else {
                return {
                    status: 'not_found',
                    data: null
                };
            }
        } catch (err) {
            throw err;
        }
    },
    getPagesByPermissionIds: async (permissions, user) => {
        if (!permissions || permissions.length === 0) return [];

        const permissionIds = permissions.map(permission => permission.action && permission.pageid);

        const placeholders = permissionIds.map(() => '?').join(', ');

        const sql = `SELECT * FROM pages WHERE pageId IN (${placeholders})`;
        // const sql = `SELECT
        //   pages.*, 
        //   permissions.action AS action
        // FROM pages
        // LEFT JOIN permissions ON pages.pageId = permissions.pageid AND permissions.roleid = ${user.data.roleId}
        // WHERE pageId IN (${placeholders})`;
        // const sql = `
        // SELECT pages.*, permissions.action AS action FROM pages LEFT JOIN permissions ON pages.pageId = permissions.pageid AND ${user.data.roleId} = permissions.roleid WHERE pageId IN (${placeholders})`;

        try {
            const [results] = await db.execute(sql, permissionIds);
            results.forEach(e => {
                let permissionAction = permissions.find(f => f.pageid == e.pageId).action;
                e['action'] = permissionAction;
            });
            return results;
        } catch (err) {
            throw err;
        }
    },
    getPermissionsByRoleId: async (roleId) => {
        const sql = 'SELECT * FROM permissions WHERE roleid = ?';
        try {
            const [results] = await db.execute(sql, [roleId]);
            return results;
        } catch (err) {
            throw err;
        }
    },
    verifyPassword: async function (inputPassword, storedPassword) {
        try {
            return inputPassword === storedPassword;
        } catch (err) {
            throw err;
        }
    },
};

module.exports = Users;