const User = require("../models/User");
const appointments = require("../models/Appointments");

const viewSlots = async (req, res) => {
  try {
    const slots = await appointments.find({occupied:false});
    if (!slots) {
      res.status(200).json({ message: "There are no Empty slots" });
    }
    const destructuredSlots = slots.map((slot) => {
      const {
        occupied: occ,
        completed: comp,    
        student_name: stu,
        ...rest
      } = slot._doc;
      return rest;
    });
    res.status(200).json({ success: true, destructuredSlots });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "There was an error" });
  }
};

const bookslot = async (req, res) => {
    try {
        const slots = await appointments.findOneAndUpdate(
          {_id:req.params.id},
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        if(slots){
            res.status(200).json({slots});    
        }else{
           res.status(404).json({ success: false, message: 'Entry not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("there was an error");
    }
};

module.exports = { viewSlots,bookslot };
