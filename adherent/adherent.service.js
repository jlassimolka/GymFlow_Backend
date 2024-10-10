const Adherent= require('./adherent.model');
const GymService = require('../gym/gym.service')
const User = require('./../models/User');

exports.createAdherent = async (adherentData) => {
  if (adherentData?.password == null) adherentData.password = "123456789";
  const user = await User.create({ email: adherentData.email, password: adherentData.password, role: "ROLE_ADHERENT" });
  adherentData.user = { _id: user._id };
  
  const adherent = await Adherent.create(adherentData);
  
  let gym = await GymService.getGymById(adherent.gym._id);
  gym.adherents.push(adherent._id);
  await GymService.updateGym(gym._id, gym);
  
  return adherent;
};




exports.getAllAdherents = async (page = 0, size = 10, name = '', gym = '') => {
  const skip = page * size;
  const limit = size;

  // Create regex filter for name
  const nameRegex = name ? new RegExp(name, 'i') : null; // Case-insensitive search for name

  // Build the query object based on the presence of name
  const query = {};
  if (nameRegex) {
    query.name = { $regex: nameRegex };
  }
  if(gym != ''){
    query.gym = {_id : gym};
  }

  const adherents = await Adherent.find(query).skip(skip).limit(limit).exec();

  // Optionally, you can also return the total count for client-side pagination
  const totalAdherents = await Adherent.countDocuments(query).exec();

  return {
    header: {
      code: 200,
      libelle: 'Adherents'
    },
    content: adherents,
    total: totalAdherents,
    page,
    size,
    totalPages: Math.ceil(totalAdherents / size)
  };
};


exports.getAdherentById = async (id) => {
  const adherent= await Adherent.findById(id);
  return adherent;
};

exports.updateAdherent= async (id, adherentData) => {
  const adherent = await Adherent.findByIdAndUpdate(id, adherentData, { new: true });
  return adherent;
};

exports.deleteAdherent = async (id) => {
  const adherent = await Adherent.findByIdAndDelete(id);
  return adherent;
};
