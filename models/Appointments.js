const mongoose = require('mongoose');

//dat,time,student_name,completed,slot,occupied

const appointmentSchema = new mongoose.Schema({
    student_name:{
        type:String,
    },
    time:{
        type:String,
        required:true,
    },
    day:{
        type:String
    },
    completed:{
        type:Boolean,
        required:true
    },
    slot:{
        type:Number
    },
    occupied:{
        type:Boolean,
        required:true
    }

});

module.exports = mongoose.model("Appointment",appointmentSchema);