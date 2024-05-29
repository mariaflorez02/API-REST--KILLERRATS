const express = require('express');
const router = express.Router();
const { error } = require('console');
const mongoose= require('mongoose');


// esquema (constructor) de la base de datos PERSONAJE  en mongo db //
const inventarioSchema= mongoose.Schema({
    nombre:{type: String, require: true},
    tipo: {type: String, require: true},
    funcion: {type: String, require: true},
    costo: {type: Number, require: false},
    nivel_daño: { type: Number, required: false },
    valor: { type: Number, required: false }
 
});

// implementacion del modelo (esquema)  PERSONAJE
const Inventario= mongoose.model('Inventario',inventarioSchema, 'Inventario');


/////////////////// POST ////////////////////////////////////

// ingresar datos PERSONAJE en la mongodb 
router.post('/inventario', async(req, res)=> {
    const newinventario =  Inventario(req.body)
    try {
      const result = await newinventario.save();
      res.status(201).json({ ok: true, data: result });
     } catch (err) {
      console.error(err);
      res.status(400).json({ ok: false, error: err.message });
    }
});


/////////////////// GET ////////////////////////////////////

// leer todos los datos de PERSONAJE en mongo  

router.get("/inventario",(req, res)=> {
  Inventario.find()
  .then((data)=> 
      res.json(data))
  .catch((error)=>  res.json({message: "no se conecto"}))
});

// leer PERSONAJE especifico 

router.get("/inventario/:nombre",(req, res)=> {
  const {nombre}=req.params;
  Inventario.findOne({nombre: nombre})
  .then((inventario)=> {
    if (inventario){
      res.json(inventario)
    }else {
      res.json({message:"No se encontro ningun objeto"})
    }
  })
  .catch((error)=>  res.json({message: "no se encontro objeto con este nombre"}))
});

/////////////////// UPDATE ////////////////////////////////////

// actualizar personaje

router.put("/inventario/:id",(req, res)=> {
  const {id}=req.params;
  const {nombre, tipo, funcion, costo, nivel_daño, valor}= req.body;
  Inventario.updateOne({_id:id},{$set:{nombre, tipo, funcion, costo, nivel_daño, valor}})
  .then((data)=> 
      res.json(data))
  .catch((error)=>  res.json({message: "no se conecto"}))
});


/////////////////// DELETE ////////////////////////////////////
router.delete("/inventario/:id",(req, res)=> {
  const {id}=req.params;
  Inventario.deleteOne({_id: id})
  .then((data) => {
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "objeto no encontrado" });
    }
    res.status(200).json({ message: "objeto eliminado con éxito" });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el objeto" });
});
});



module.exports= router;