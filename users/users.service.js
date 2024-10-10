const User =  require('../models/User');
    
    
exports.createUser = async (user) => {
    const user = await User.create(adherentData);
    return user;
};