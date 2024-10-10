const ResponsableService = require('./responsable.service');

exports.createResponsable = async (req, res) => {
  try {
    const responsable = await ResponsableService.createResponsable(req.body);
    res.status(201).json({
      header: {
        code: 201,
        libelle: 'Created'
      },
      content: responsable

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllResponsables = async (req, res) => {
  try {
    const { page = 0, size = 10, name = '' } = req.query;
    const response = await ResponsableService.getAllResponsables(parseInt(page), parseInt(size), name);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResponsableById = async (req, res) => {
  try {
    const responsable = await ResponsableService.getResponsableById(req.params.id);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable not found' });
    }
    res.status(200).json({content : responsable});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateResponsable = async (req, res) => {
  try {
    const responsable = await ResponsableService.updateResponsable(req.params.id, req.body);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable not found' });
    }
    res.status(200).json(responsable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteResponsable = async (req, res) => {
  try {
    const responsable = await ResponsableService.deleteResponsable(req.params.id);
    if (!responsable) {
      return res.status(404).json({ message: 'Responsable not found' });
    }
    res.status(200).json({ message: 'Responsable deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
