const mongoose=require('mongoose');
// it will be required from same instance

const truckSchema=new mongoose.Schema({
    truckname:{
      type:String
     // required:true
    },
    truckcapacity:{
        type:String
       // required:true
    },
    associateduser:{
        type:String
       // required:true
    }
   
   

});
const Truck=mongoose.model('truck',truckSchema);
module.exports=Truck;