const Coach= require('./coach.model');
const User = require('./../models/User');

exports.createCoach = async (coachData) => {
  if(coachData?.password == null ) coachData.password = "123456789";
  const user  = await User.create({email : coachData.email ,password : coachData.password, role : "ROLE_COACHE"});
  coachData.user = { _id: user._id };
  console.log(coachData)
  const coach= await Coach.create(coachData);
  return coach;
};



exports.getAllCoachs = async (page = 0, size = 10, name = '', gym = '') => {
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
    query.gyms = {_id : gym};
  }
  const coaches = await Coach.find(query).populate('profilePicture').skip(skip).limit(limit).exec();

  // Optionally, you can also return the total count for client-side pagination
  const totalCoaches = await Coach.countDocuments(query).exec();

  return {
    header: {
      code: 200,
      libelle: 'Coaches'
    },
    content: coaches,
    total: totalCoaches,
    page,
    size,
    totalPages: Math.ceil(totalCoaches / size)
  };
};


exports.getCoachById = async (id) => {
  const coach= await Coach.findById(id).populate('profilePicture');
  return coach;
};

exports.updateCoach= async (id, coachData) => {
  const coach = await Coach.findByIdAndUpdate(id, coachData, { new: true });
  return coach;
};

exports.deleteCoach = async (id) => {
  const coach = await Coach.findByIdAndDelete(id);
  return coach;
};
