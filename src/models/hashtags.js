import mongoose from"mongoose"
const { Schema }= mongoose;

const hashtagSchema = new Schema({
     title:{
        type: String,
        require: true,
     },
     tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
     ],
}, { timestamps: true});

const Hashtag = mongoose.model('Hashtag', hashtagSchema);
export default Hashtag;