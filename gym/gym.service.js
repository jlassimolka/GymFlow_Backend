const Gym = require('./gym.model');


exports.createGym = async (gymData) => {
  const gym = await Gym.create(gymData);
  return gym;
};

exports.getAllGyms = async (page, size, name = '', country = '') => {
    const skip = page  * size;
    const limit = size;
  
    // Create regex filters
    const nameRegex = name ? new RegExp(name, 'i') : null; // Case-insensitive search for name
    const countryRegex = country ? new RegExp(country, 'i') : null; // Case-insensitive search for country
  
    // Build the query object based on the presence of name and country
    const query = {};
    if (nameRegex) {
      query.name = { $regex: nameRegex };
    }
    if (countryRegex) {
      query['address.country'] = { $regex: countryRegex };
    }
    
    const gyms = await Gym.find(query).populate('profilePicture').skip(skip).limit(limit).exec();
    
  
    // Optionally, you can also return the total count for client-side pagination
    const totalGyms = await Gym.countDocuments(query).exec();

    return {
      header : {
        code: 200,
        libelle : "Gyms"
      },
      content: gyms,
      total: totalGyms,
      page,
      size,
      totalPages : Math.ceil(totalGyms / size)
    };
  };
  
  exports.getGymById = async (id) => {
    return await Gym.findById(id)
      .populate('adherents')  // Populates the adherents reference
      .populate('coaches')    // Populates the coaches reference
      .populate('profilePicture')
      .exec(); // Ensures the query executes
  };



exports.updateGym = async (id, gymData) => {
  const gym = await Gym.findByIdAndUpdate(id, gymData, { new: true });
  return gym;
};

exports.deleteGym = async (id) => {
  const gym = await Gym.findByIdAndDelete(id);
  return gym;
};
