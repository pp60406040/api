const db = require('../config/db');

const tickettype = {
  create: async (data) => {
    const sql = 'INSERT INTO tickettype (name, amt) VALUES (?,?)';
    try {
      const [results] = await db.execute(sql, [data.name , data.amt]);
      
      
      let dataJSON = {
        status: 'success',
        data: results
    }
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getAll: async () => {
    try {
      const [results] = await db.execute(`SELECT * FROM tickettype`);
      let dataJSON = {
        status: 'success',
        data: results
      };
      
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

    
  getAllByPage: async (limit, pageNo, searchtxt) => {
    try {
      const offset = (pageNo - 1) * limit;
  
      let query = 'SELECT * FROM tickettype';
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
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM tickettype');
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


  update: async (id, data) => {
    const sql = 'UPDATE tickettype SET name = ?, amt = ? WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.name, data.amt, id]);
      
      let dataJson = {
        status: 'success',
        data: results
    }
      return dataJson;
    } catch (err) {
      throw err;
    }
  },

  delete: async (id) => {
    try {
      const [results] = await db.execute('DELETE FROM tickettype WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = tickettype;
