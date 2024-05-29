const express = require('express');
const router = express.Router();
const { error } = require('console');
const mongoose= require('mongoose');


// esquema (constructor) de la base de datos PERSONAJE  en mongo db //

// sub esquema proviciones 
const provicionSchema = mongoose.Schema({
    nombre: { type: String, required: true },
    cantidad: { type: Number, required: true }
},{ _id: false });


const UsuariosSchema= mongoose.Schema({
    nombre:{type: String, require: true},
    edad: {type: Number, require: true},
    personaje_selec: {type: String, require: true},
    nivel_actual: {type: Number, require: true},
    monedas: {type: Number, require: true},
    can_compras:{type:Number, require:true},
    proviciones: [provicionSchema]
});

// implementacion del modelo (esquema)  PERSONAJE
const usuario= mongoose.model('Usuario',UsuariosSchema, 'Usuario');


/////////////////// POST ////////////////////////////////////

// ingresar datos PERSONAJE en la mongodb 
router.post('/usuario', async(req, res)=> {
    const newusuario = usuario(req.body)
    try {
      const result = await newusuario.save();
      res.status(201).json({ ok: true, data: result });
     } catch (err) {
      console.error(err);
      res.status(400).json({ ok: false, error: err.message });
    }
});


/////////////////// GET ////////////////////////////////////

// leer todos los datos de PERSONAJE en mongo  

router.get("/usuario",(req, res)=> {
    usuario.find()
  .then((data)=> 
      res.json(data))
  .catch((error)=>  res.json({message: "no se conecto"}))
});

// leer PERSONAJE especifico 

router.get("/usuario/:nombre",async(req, res)=> {
  try {
    const nombre = req.params.nombre;
    const Usuario = await usuario.findOne({ nombre: nombre });
    if (Usuario) {
        res.json(Usuario);
    } else {
        res.status(404).json({ error: 'usuario no encontrado' });
    }
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
  
});

/////////////////// UPDATE ////////////////////////////////////

// actualizar personaje

router.put("/usuario/:id",async (req, res)=> {
  const {id}=req.params;
  const {nombre, edad, personaje_selec,nivel_actual,monedas,can_compras,proviciones}= req.body;
  try {
    const result = await usuario.updateOne({_id:id},{$set:{nombre, edad, personaje_selec,nivel_actual,monedas,can_compras,proviciones}});
    res.status(201).json({ ok: true, data: result });
   } catch (err) {
    console.error(err);
    res.status(400).json({ ok: false, error: err.message });
  }
});


/////////////////// DELETE ////////////////////////////////////
router.delete("/usuario/:id",(req, res)=> {
  const {id}=req.params;
  usuario.deleteOne({_id: id})
  .then((data) => {
    if (data.deletedCount === 0) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }
    res.status(200).json({ message: "usuario eliminado con éxito" });
  })
  .catch((error) => {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el usuario" });
});
});



module.exports= router;