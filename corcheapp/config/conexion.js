const express=require('express');
const mongoose=require('mongoose');
const port=process.env.PORT || 9000;
mongoose.connect('mongodb://localhost:27017/consultas',{useNewUrlParser:true},(err,res)=>{
  if (err) {
    return console.log(`Error al conectar a la DB ${err}`)
  }
  else{
    console.log('Conexión a la DB establecida')
  }
});
module.exports=mongoose;
