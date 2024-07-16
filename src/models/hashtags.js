import mongoose from"mongoose"
const { Schema }= mongoose;

const hashtagSchema = new Schema({
     title:{
        type: String,
        require: true,
        unique: true
     },
     tweets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tweet'
        }
     ],
}, { timestamps: true});

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

hashtagSchema.pre('save', function(next) {
  this.title= this.title.toLowerCase();
  return next();
});

export default Hashtag;