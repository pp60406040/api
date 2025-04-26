const db = require('../config/db');

const match = {
  create: async (data) => {
    const sql = 'INSERT INTO matchdata (md, date, time, ht, at, place, htImg, atImg, stadium) VALUES (?,?,?,?,?,?,?,?,?)';
    try {
      const [results] = await db.execute(sql, [data.md , data.date , data.time , data.ht , data.at , data.place , data.htImg , data.atImg , data.stadium]);
      
      
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
      const [results] = await db.execute(`SELECT * FROM matchdata`);
      let dataJSON = {
        status: 'success',
        data: results
      };
      
      return dataJSON;
    } catch (err) {
      throw err;
    }
  },

  getById: async (id) => {
    try {
      const [results] = await db.execute(`SELECT * FROM matchdata WHERE id = ?` , [id]);
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
  
      let query = 'SELECT * FROM matchdata';
      let queryParams = [];
  
      // If there's a search text, add the WHERE clause
      if (searchtxt) {
        const columns = ['name'];
        const searchConditions = columns.map(col => `${col} LIKE ?`).join(' OR ');
        query += ` WHERE ${searchConditions}`;
        queryParams = columns.map(() => `%${searchtxt}%`);
      }
  
      // Here, make sure to specify the column for ordering (e.g., 'id', 'name', etc.)
      query += ' LIMIT ? OFFSET ?'; // Use an actual column (e.g., 'id') for sorting
  
      queryParams.push(limit, offset);
  
      // Execute the query to fetch data
      const [results] = await db.execute(query, queryParams);
  
      // Query to get total count
      const [totalCountResults] = await db.execute('SELECT COUNT(*) AS totalCount FROM matchdata');
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
    const sql = 'UPDATE matchdata SET md = ?, date = ?, time = ?, ht = ?, at = ?, place = ?, htImg = ?, atImg = ?, stadium = ?, WHERE id = ?';
    try {
      const [results] = await db.execute(sql, [data.md, data.date, data.time, data.ht, data.at, data.place, data.htImg, data.atImg, data.stadium, id]);
      
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
      const [results] = await db.execute('DELETE FROM matchdata WHERE id = ?', [id]);
      
      return results;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = match;
