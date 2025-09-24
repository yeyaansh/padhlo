import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
  first_name: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required: true,
    trim:true
  },
  last_name:{
    type:String,
    minLength: 2,
    maxLength: 20,
    trim:true

  },
  age:{
    type: Number,
    min:8,
    max:80
  },
  email_id:{
    type:String,
    unique:true,
    required: true,
    lowerCase: true,
    trim: true,
    immutable:true

  },
  problemSolved:{
    type:[{
      type:Schema.Types.ObjectId,
      ref:'problem',
      // unique:true
    }],

  },
  role:{
    type: String,
    enum:["user","admin"],
    default:"user"
  },
  password:{
    type:String,
    required:true,
  }
},{timestamps:true});


const User = mongoose.model("User",userSchema);

export default User;