const express = require('express');
const router = express.Router();
const { error } = require('console');
const mongoose= require('mongoose');


// esquema (constructor) de la base de datos PERSONAJE  en mongo db //
const personajesSchema= mongoose.Schema({
    nombre:{type: String, require: true},
    tipo: {type: String, require: true},
    velocidad: {type: Number, require: true},
    resistencia: {type: Number, require: true},
    precision_disparo: { type: Number, required: true },
    recarga_vida: { type: Number, required: false },
    historia: { type: String, required: false },
    nivel: { type: Number, required: false }
});

// implementacion del modelo (esquema)  PERSONAJE
const Personaje= mongoose.model('Personaje',personajesSchema, 'Personaje');


/////////////////// POST ////////////////////////////////////

// ingresar datos PERSONAJE en la mongodb 
router.post('/personaje', async(req, res)=> {
    const newpersonaje =  Personaje(req.body)
    try {
      const result = await newpersonaje.save();
      res.status(201).json({ ok: true, data: result });
     } catch (err) {
      console.error(err);
      res.status(400).json({ ok: false, error: err.message });
    }
});


/////////////////// GET ////////////////////////////////////

// leer todos los datos de PERSONAJE en mongo  

router.get("/personaje",(req, res)=> {
  Personaje.find()
  .then((data)=> 
      res.json(data))
  .catch((error)=>  res.json({message: "no se conecto"}))
});

// leer PERSONAJE especifico 

router.get("/personaje/:nombre",(req, res)=> {
  const {nombre}=req.params;
  Personaje.findOne({nombre: nombre})
  .then((personaje)=> {
    if (personaje){
      res.json(personaje)
    }else {
      res.json({message:"Nose encontro ningun perosnaje"})
    }
  })
  .catch((error)=>  res.json({message: "no se encontro personaje con este nombre"}))
});

/////////////////// UPDATE ////////////////////////////////////

// actualizar personaje

router.put("/personaje/:id",(req, res)=> {
  const {id}=req.params;
  const {nombre, tipo, velocidad, resistencia, precision_disparo, recarga_vida, historia, nivel}= req.body;
  Personaje.updateOne({_id:id},{$set:{nombre, tipo, velocidad, resistencia, precision_disparo, recarga_vida, historia,nivel}})
  .then((data)=> 
      res.json(data))
  .catch((error)=>  res.json({message: "no se conecto"}))
});


/////////////////// DELETE ////////////////////////////////////
router.delete("/personaje/:id",(req, res)=> {
  const {id}=req.params;
  Personaje.deleteOne({_id: id})
  .then((data) => {
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "Personaje no encontrado" });
    }
    res.status(200).json({ message: "Personaje eliminado con éxito" });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el personaje" });
});
});



module.exports= router;