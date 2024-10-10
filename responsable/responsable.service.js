const Responsable = require('./responsable.model');
const User = require('./../models/User');

exports.createResponsable = async (responsableData) => {
  if (responsableData?.password == null) responsableData.password = "123456789";
  const user = await User.create({ email: responsableData.email, password: responsableData.password, role: "ROLE_ADMIN" });
  responsableData.user = { _id: user._id };
  
  const responsable = await Responsable.create(responsableData);
  
  return responsable;
};




exports.getAllResponsables = async (page = 0, size = 10, name = '') => {
  const skip = page * size;
  const limit = size;

  // Create regex filter for name
  const nameRegex = name ? new RegExp(name, 'i') : null; // Case-insensitive search for name

  // Build the query object based on the presence of name
  const query = {};
  if (nameRegex) {
    query.name = { $regex: nameRegex };
  }

  const responsables = await Responsable.find(query).skip(skip).limit(limit).exec();

  // Optionally, you can also return the total count for client-side pagination
  const totalResponsables = await Responsable.countDocuments(query).exec();

  return {
    header: {
      code: 200,
      libelle: 'OK'
    },
    content: responsables,
    total: totalResponsables ,
    page,
    size,
    totalPages: Math.ceil(totalResponsables / size)
  };
};





exports.getResponsableById = async (id) => {
  const responsable = await Responsable.findById(id);
  return responsable;
};

exports.updateResponsable = async (id, responsableData) => {
  const responsable = await Responsable.findByIdAndUpdate(id, responsableData, { new: true });
  return responsable;
};

exports.deleteResponsable = async (id) => {
  const responsable = await Responsable.findByIdAndDelete(id);
  return responsable;
};
