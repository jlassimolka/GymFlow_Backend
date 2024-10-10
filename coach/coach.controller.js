const CoachService = require('./coach.service');

exports.createCoach = async (req, res) => {
  try {
    const coach = await CoachService.createCoach(req.body);
    res.status(201).json({
      header: {
        code: 201,
        libelle: 'Created'
      },
      content: coach
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCoachs = async (req, res) => {
  try {
    const { page = 0, size = 10, name = '', gymId = '' } = req.query;
    const response = await CoachService.getAllCoachs(parseInt(page), parseInt(size), name, gymId);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCoachById = async (req, res) => {
  try {
    const coach = await CoachService.getCoachById(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.status(200).json({ content: coach });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCoach = async (req, res) => {
  try {
    const coach = await CoachService.updateCoach(req.params.id, req.body);
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.status(200).json(coach);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCoach = async (req, res) => {
  try {
    const coach = await CoachService.deleteCoach(req.params.id);
    if (!coach) {
      return res.status(404).json({ message: 'Coach not found' });
    }
    res.status(200).json({ message: 'Coach deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
