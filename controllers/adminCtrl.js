const Appointment = require('../models/Appointments');

const getAllAppointments = async(req,res)=>{
    try {
        const result = await Appointment.find(req.query);
        if(!result){
            res.status(200).send({message:"There are no appointments"});
        }
        else{
            res.status(200).send({result});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"There was an error"})        
    }
}


module.exports = {getAllAppointments};