const mongoose=require('mongoose');
// it will be required from same instance

const adminSchema=new mongoose.Schema({
    name:{
      type:String
     // required:true
    },
    mobile:{
        type:String
       // required:true
    },
    email:{
        type:String
       // required:true
    },
    district:{
        type:String
       // required:true
    },
    locality:{
        type:String
       // required:true
    },
    pincode:{
        type:String
       // required:true
    },
    estimatedweight:{
        type:String
       // required:true
    },
    garbagetype: {
        type: [String], // Change the type to an array of strings
    },
    
    preferreddate:{
        type:String
       // required:true
    },
    preferredtime:{
        type:String
       // required:true
    },
    suggestion:{
        type:String
       // required:true
    }

});
const Admin=mongoose.model('admin',adminSchema);
module.exports=Admin;
// validate: {
//     validator: function (v) {
//         // Check if the mobile number is exactly 10 digits long
//         return /^[0-9]{10}$/.test(v);
//     },
//     message: 'Mobile number must be exactly 10 digits long.'
// }