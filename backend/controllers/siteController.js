const Site = require('../models/Site');

const createSite = async (req, res) => {
  try {
    const { siteName, location, startDate, budget } = req.body;
    const site = await Site.create({ siteName, location, startDate, budget });
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSites = async (req, res) => {
  try {
    const sites = await Site.find({});
    res.json(sites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });
    
    Object.assign(site, req.body);
    await site.save();
    res.json(site);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteSite = async (req, res) => {
  try {
    const site = await Site.findById(req.params.id);
    if (!site) return res.status(404).json({ message: 'Site not found' });

    await Site.deleteOne({ _id: req.params.id });
    res.json({ message: 'Site removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSite, getSites, updateSite, deleteSite };
