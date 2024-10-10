const Manager= require('./manager.model');
const User = require('./../models/User');

exports.createManager = async (managerData) => {
  if (managerData?.password == null) managerData.password = "123456789";
  const user = await User.create({ email: managerData.email, password: managerData.password, role: "ROLE_MANAGER" });
  managerData.user = { _id: user._id };
  
  const manager = await Manager.create(managerData);
  
  return manager;
};


exports.getAllManagers = async (page = 0, size = 10, name = '') => {
  const skip = page * size;
  const limit = size;

  // Create regex filter for name
  const nameRegex = name ? new RegExp(name, 'i') : null; // Case-insensitive search for name

  // Build the query object based on the presence of name
  const query = {};
  if (nameRegex) {
    query.name = { $regex: nameRegex };
  }

  const managers = await Manager.find(query).skip(skip).limit(limit).exec();

  // Optionally, you can also return the total count for client-side pagination
  const totalManagers = await Manager.countDocuments(query).exec();

  return {
    header: {
      code: 200,
      libelle: 'Managers'
    },
    content: managers,
    total: totalManagers ,
    page,
    size,
    totalPages: Math.ceil(totalManagers / size)
  };
};


exports.getManagerById = async (id) => {
  const manager= await Manager.findById(id);
  return manager;
};



exports.updateManager= async (id, managerData) => {
  const manager = await Manager.findByIdAndUpdate(id, managerData, { new: true });
  return manager;
};

exports.deleteManager = async (id) => {
  const manager = await Manager.findByIdAndDelete(id);
  return manager;
};
