const AdherentService = require('./adherent.service');

exports.createAdherent = async (req, res) => {
  try {
    const adherent = await AdherentService.createAdherent(req.body);
    res.status(201).json({
      header: {
        code: 201,
        libelle: 'Created'
      },
      content: adherent
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllAdherents = async (req, res) => {
  try {
    const { page = 0, size = 10, name = '', gymId = ''} = req.query;
    const response = await AdherentService.getAllAdherents(parseInt(page), parseInt(size), name, gymId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdherentById = async (req, res) => {
  try {
    const adherent = await AdherentService.getAdherentById(req.params.id);
    if (!adherent) {
      return res.status(404).json({ message: 'adherent not found' });
    }
    res.status(200).json({content : adherent});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateAdherent = async (req, res) => {
  try {
    const adherent = await AdherentService .updateAdherent(req.params.id, req.body);
    if (!adherent) {
      return res.status(404).json({ message: 'adherent not found' });
    }
    res.status(200).json(adherent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteAdherent = async (req, res) => {
  try {
    const adherent = await AdherentService.deleteAdherent(req.params.id);
    if (!adherent) {
      return res.status(404).json({ message: 'adherent not found' });
    }
    res.status(200).json({ message: 'adherent deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
