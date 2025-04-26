const Tickettypes = require('../models/tickettypeModel');

exports.createTickettype = async (req, res) => {
  try {
    const result = await Tickettypes.create(req.body);
    res.status(201).json({ message: 'Tickettype created', id: result.insertId });
  } catch (err) {
    console.error('Error creating Tickettype:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTickettypes = async (req, res) => {
  try {
    const results = await Tickettypes.getAll();
    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching Tickettypes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getAllTickettypesByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await Tickettypes.getAllByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalPages: Math.ceil(results.totalCount / limit),
      currentPage: page
    });
  } catch (err) {
    console.error('Error fetching Tickettypes:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateTickettype = async (req, res) => {
  const id = req.params.id;
  try {
    await Tickettypes.update(id, req.body);
    res.status(200).json({ message: 'Tickettype updated' });
  } catch (err) {
    console.error('Error updating Tickettype:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteTickettype = async (req, res) => {
  const id = req.params.id;
  try {
    await Tickettypes.delete(id);
    res.status(200).json({ message: 'Tickettype deleted' });
  } catch (err) {
    console.error('Error deleting Tickettype:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
