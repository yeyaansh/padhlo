import mongoose, {Schema} from "mongoose"


const userSubmissionSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    problemId:{
        type:Schema.Types.ObjectId,
        ref:'problem',
        required: true
    },
    code:{
        type:String,
        required:true
    },
    language:{
        type:String,
        required:true,
        enum:['javascript','cpp','java']
    },
    status:{
        type:String,
        enum:["pending","accepted","wrong","time limit exceeded","compilation error", "runtime error"],
        default:"pending"
    },
    runtime:{  // sec or millisec
        type:Number,
        default:0
    },
    memory:{ // kb
        type:Number,
        default:0
    },
    errorMessage:{
        type:String,
        default:""
    },
    testCasesPassed:{
        type:Number,
        default:0
    },
    totalTestCases:{ 
        type:Number,
        default:0
    }
    
},
{timestamps:true});

userSubmissionSchema.index({userId:1,problemId:1});

const submission = mongoose.model('submission',userSubmissionSchema)

export default submission;