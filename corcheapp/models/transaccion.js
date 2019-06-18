const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const transacciones=new Schema({
  idtransacciones:{type:String},
  idusuarios:{type:String},
  idpartitura:{type:String},
  accion:{type:String},
  pago:{type:String},
  precio:{type:Number}
},{versionKey:false});
module.exports=mongoose.model('transacciones',transacciones);
