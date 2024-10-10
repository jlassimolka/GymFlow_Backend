const ManagerService = require('./manager.service');

exports.createManager = async (req, res) => {
  try {
    const manager = await ManagerService.createManager(req.body);
    res.status(201).json({
      header: {
        code: 201,
        libelle: 'Created'
      },
      content: manager


    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllManagers = async (req, res) => {
  try {
    const { page = 0, size = 10, name = '' } = req.query;
    const response = await ManagerService.getAllManagers(parseInt(page), parseInt(size), name);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getManagerById = async (req, res) => {
  try {
    const manager = await ManagerService.getManagerById(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    res.status(200).json({content : manager});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateManager = async (req, res) => {
  try {
    const manager = await ManagerService.updateManager(req.params.id, req.body);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    res.status(200).json(manager);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteManager = async (req, res) => {
  try {
    const manager = await ManagerService.deleteManager(req.params.id);
    if (!manager) {
      return res.status(404).json({ message: 'Manager not found' });
    }
    res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
