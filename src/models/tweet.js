const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        max: [250, 'Tweet can not be more than 250 characters']
    },
    hashtags: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Hashtag'
        }
    ],
}, { timestamps: true});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet; 

// Note: 
// A tweet can have many hashtags, in the similar way a hashtag can have many tweets associated with it.
// Hence, we are going to have many-to-many relationship between them.