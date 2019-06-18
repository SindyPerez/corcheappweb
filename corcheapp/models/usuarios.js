const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const usuarios=new Schema({
  nombre:{type:String},
  apellido:{type:String},
  edad:{type:Number},
  ciudad:{type:String}
},{versionKey:false});
module.exports=mongoose.model('usuarios',usuarios);
