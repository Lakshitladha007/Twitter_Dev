const Hashtag = require("../models/hashtags");

class HashtagRepository{

   async create(data) {
        try {
           const tag= await Hashtag.create(data);
           return tag;
        } catch (error) {
           console.log(error);
        }
   }

   async bulkCreate(data){  // In this fx, we expect data to be in the form of an array
      try {
         const tags= await Hashtag.insertMany(data);
         return tags;
      } catch (error) {
         console.log(error);
      }
   }

   async get(id){
      try {
          const tag= await Hashtag.findById(id);
          return tag;
       } catch (error) {
          console.log(error);
       }
   }

   async destroy(id){
      try {
          const tag= await Hashtag.findByIdAndRemove(id);
          return tag;
       } catch (error) {
          console.log(error);
       }
   }

   async findByName(titlelist){   // this fxn expects an array of 'tags', and returns 
                                  // all the tags that are present in 'db' as well as this list( union of tags in titlelist and tags in db)
      try {
         const tags = await Hashtag.find({
            title: titlelist
         });
         return tags;   // this is an array
      } catch (error) {
         console.log(error);
      }
   }

}

module.exports= HashtagRepository;

