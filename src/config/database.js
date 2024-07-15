// In sequelize the connections are manually done by sequelize-cli but in mongoose we need to the connections
// manually but it is very easy

import mongoose from"mongoose"
 
export const connect = async() => {
      await mongoose.connect('mongodb://localhost/twitter_Dev');
}
