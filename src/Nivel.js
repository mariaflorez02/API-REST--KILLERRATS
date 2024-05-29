const express = require('express');
const router = express.Router();
const { error } = require('console');
const mongoose= require('mongoose');


// esquema (constructor) de la base de datos PERSONAJE  en mongo db //

// sub esquema enemigos 
const enemigoSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true }
},{ _id: false });
// sub esquema objetos 
const objetoSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true }
},{ _id: false });

const NivelesSchema= mongoose.Schema({
    nombre:{type: String, require: true},
    descripcion: {type: String, require: true},
    enemigos: [enemigoSchema],
    objetos: [objetoSchema]
});

// implementacion del modelo (esquema)  PERSONAJE
const Nivel= mongoose.model('Nivel',NivelesSchema, 'Nivel');


/////////////////// POST ////////////////////////////////////

// ingresar datos PERSONAJE en la mongodb 
router.post('/nivel', async(req, res)=> {
    const newnivel = Nivel(req.body)
    try {
      const result = await newnivel.save();
      res.status(201).json({ ok: true, data: result });
     } catch (err) {
      console.error(err);
      res.status(400).json({ ok: false, error: err.message });
    }
});


/////////////////// GET ////////////////////////////////////

// leer todos los datos de PERSONAJE en mongo  

router.get("/nivel",(req, res)=> {
  Nivel.find()
  .then((data)=> 
      res.json(data))
  .catch((error)=>  res.json({message: "no se conecto"}))
});

// leer PERSONAJE especifico 

router.get("/nivel/:nombre",async (req, res)=> {
  try {
    const nombre = req.params.nombre;
    const nivel = await Nivel.findOne({ nombre: nombre });
    if (nivel) {
        res.json(nivel);
    } else {
        res.status(404).json({ error: 'Nivel no encontrado' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
});

/////////////////// UPDATE ////////////////////////////////////

// actualizar personaje

router.put("/nivel/:id",async (req, res)=> {
  const {id}=req.params;
  const {nombre, descripcion, enemigos, objetos}= req.body;
  try {
    const result = await Nivel.updateOne({_id:id},{$set:{nombre, descripcion, enemigos, objetos}});
    res.status(201).json({ ok: true, data: result });
   } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: err.message });
  }
});


/////////////////// DELETE ////////////////////////////////////
router.delete("/nivel/:id",(req, res)=> {
  const {id}=req.params;
  Nivel.deleteOne({_id: id})
  .then((data) => {
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "Nivel no encontrado" });
    }
    res.status(200).json({ message: "Nivel eliminado con éxito" });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el nivel" });
});
});



module.exports= router;