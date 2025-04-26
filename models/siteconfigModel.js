const db = require('../config/db');

const siteconfig = {
    create: async (data) => {
        const sql = 'INSERT INTO siteconfig (upiId, gpay, phonepe, paytm, upi, serviceCharge) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())';
        try {
            const [results] = await db.execute(sql, [data.upiId, data.gpay, data.phonepe, data.paytm, data.upi, data.serviceCharge]);

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
            const [results] = await db.execute(`SELECT * FROM siteconfig`);

            let dataJSON = {
                status: 'success',
                data: results
            };

            return dataJSON;
        } catch (err) {
            throw err;
        }
    },
    update: async (id, data) => {
        const sqlUpdate = 'UPDATE siteconfig SET upiId = ?, gpay = ?, phonepe = ?, paytm = ?, upi = ?, serviceCharge = ? WHERE id = ?';
        try {
            const [results] = await db.execute(sqlUpdate, [data.upiId, data.gpay, data.phonepe, data.paytm, data.upi, data.serviceCharge, id]);
            

            let dataJSON = {
                status: 'success',
                data: results
            }
    
            return dataJSON;
        } catch (err) {
            throw err;
        }
    },

    delete: async (id) => {
        try {
            const [results] = await db.execute('DELETE FROM siteconfig WHERE id = ?', [id]);
            return results;
        } catch (err) {
            throw err;
        }
    },  
};

module.exports = siteconfig;