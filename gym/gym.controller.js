const GymService = require('./gym.service');
const AdherentService = require('../adherent/adherent.service');

exports.createGym = async (req, res) => {
  try {
    const gym = await GymService.createGym(req.body);
    res.status(201).json({
      header: {
        code: 201,
        libelle: 'Created'
      },
      content: gym

    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllGyms = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 0;
      const size = parseInt(req.query.size) || 10;
      const name = req.query.name || '';
      const country = req.query.country || '';
  
      const gymsResponse = await GymService.getAllGyms(page, size, name, country);
      res.status(200).json(gymsResponse);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

exports.getAdherentByGym = async (req,res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const gymId = req.params.id || '';

    const response = await AdherentService.getAllAdherents(parseInt(page), parseInt(size), '',gymId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getGymById = async (req, res) => {
  try {
    const gym = await GymService.getGymById(req.params.id);
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.status(200).json({content : gym});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGym = async (req, res) => {
  try {
    const gym = await GymService.updateGym(req.params.id, req.body);
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.status(200).json(gym);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteGym = async (req, res) => {
  try {
    const gym = await GymService.deleteGym(req.params.id);
    if (!gym) {
      return res.status(404).json({ message: 'Gym not found' });
    }
    res.status(200).json({ message: 'Gym deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
