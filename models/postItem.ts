import  mongoose from "mongoose"

const PostItemSchema =  new  mongoose.Schema(
    {
        img:{type:String, required:true},
        category :{type:String},
        date:{type:Date , default: Date.now()},
        brief:{type:String},
        author:{type:String,default:null},
        top:{type:Boolean,default:false},
        trending:{type:Boolean,default:false}
    },
    {timestamps:true}
)
const  PostItem =  mongoose.models.postitem || mongoose.model("postitem",PostItemSchema);

export default  PostItem;