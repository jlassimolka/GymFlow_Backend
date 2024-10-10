
exports.create = async (data,Model) => {
  const gym = await Model.create(data);
  return gym;
};

exports.getAll = async (page, size,query,Model) => {
    const skip = page  * size;
    const limit = size;
  
    
    
    const gyms = await Model.find(query).skip(skip).limit(limit).exec();
  
    // Optionally, you can also return the total count for client-side pagination
    const totalGyms = await Model.countDocuments(query).exec();

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
  return await ModelfindById(id);
};

exports.updateGym = async (id, gymData) => {
  const gym = await ModelfindByIdAndUpdate(id, gymData, { new: true });
  return gym;
};

exports.deleteGym = async (id) => {
  const gym = await ModelfindByIdAndDelete(id);
  return gym;
};
