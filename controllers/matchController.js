const Matchs = require('../models/matchModel');

exports.createMatch = async (req, res) => {
  try {
    const result = await Matchs.create(req.body);
    res.status(201).json({ message: 'Match created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Match:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllMatchs = async (req, res) => {
  try {
    const results = await Matchs.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Matchs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getMatchById = async (req, res) => {
    const id = req.params.id;
  try {
    const results = await Matchs.getById(id);
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Match:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllMatchsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Matchs.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Matchs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateMatch = async (req, res) => {
  const id = req.params.id;
  try {
    await Matchs.update(id, req.body);
    res.status(200).json({ message: 'Match updated' });
  } catch (err) {
    console.error('Error updating Match:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteMatch = async (req, res) => {
  const id = req.params.id;
  try {
    await Matchs.delete(id);
    res.status(200).json({ message: 'Match deleted' });
  } catch (err) {
    console.error('Error deleting Match:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
