const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');

const Usuario=require('./models/usuarios');
const Transaccion=require('./models/transaccion');
const Partitura=require('./models/partitura');
const Genero=require('./models/generos');

const app=express();
const port=process.env.PORT || 9000;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
//usuarios
app.get('/usuarios',(req,res)=>{
    Usuario.find({},(err,usuarios)=>{
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`});
        if(!usuarios) return res.status(404).send({mensaje:'No existen usuarios'});
        res.status(200).send({usuarios});
    })
})
app.get('/transacciones',(req,res)=>{
    Transaccion.find({},(err,transacciones)=>{
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`});
        if(!transacciones) return res.status(404).send({mensaje:'No existen transacciones'});
        res.status(200).send({transacciones});
    })
})
//usuarios

//partitura
app.get('/partituras',(req,res)=>{
    Partitura.find({},(err,partituras)=>{
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`});
        if(!partituras) return res.status(404).send({mensaje:'No existen partituras'});
        res.status(200).send({partituras});
    })
})

//genero
app.get('/generos',(req,res)=>{
    Genero.find({},(err,generos)=>{
        if(err) return res.status(500).send({mensaje:`Error al realizar la peticion ${err}`});
        if(!generos) return res.status(404).send({mensaje:'No existen generos'});
        res.status(200).send({generos});
    })
})

app.post('/partituras',(req,res)=>{
    let part=new Partitura()
    part.titulo=req.body.titulo
    part.duracion=req.body.duracion
    part.archivo=req.body.archivo
    part.precio=req.body.precio
    part.tipo=req.body.tipo
    part.save((err,partStored)=>{
        if(err) res.status(500).send({mensaje:`Error al salvar la partitura ${err}`})
        res.status(200).send({part:partStored})
    })
})



app.post('/usuarios',(req,res)=>{
    let user=new Usuario()
    user.nombre=req.body.nombre
    user.apellido=req.body.apellido
    user.edad=req.body.edad
    user.ciudad=req.body.ciudad
    user.save((err,userStored)=>{
        if(err) res.status(500).send({mensaje:`Error al salvar el usuario ${err}`})
        res.status(200).send({user:userStored})
    })
})
//transacciones
app.post('/transacciones',(req,res)=>{
    let transac=new Transaccion()
    transac.idusuario=req.body.idusuario
    transac.idpartitura=req.body.idpartitura
    transac.accion=req.body.accion
    transac.pago=req.body.pago
    transac.precio=req.body.precio
    transac.save((err,transaccionStored)=>{
        if(err) res.status(500).send({mensaje:`Error al salvar la transaccion ${err}`})
        res.status(200).send({transac:transaccionStored})
    })
})

app.post('/generos',(req,res)=>{
    let gen=new Genero()
    gen.nombre=req.body.nombre
    gen.save((err,genStored)=>{
        if(err) res.status(500).send({mensaje:`Error al salvar el genero ${err}`})
        res.status(200).send({gen:genStored})
    })
})


mongoose.connect('mongodb://localhost:27017/partituras',{useNewUrlParser:true},(err,res)=>{
    if(err)console.log(`Error al conectar a la db ${err}`)
    else console.log('Conexión a la db establecida');
    app.listen(port,()=>{
        console.log(`Api rest corriendo en http://localhost:${port}`)
    })
})