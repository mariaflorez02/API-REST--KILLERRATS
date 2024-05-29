const express = require('express');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Cambia los servidores DNS a Google
const path = require('path');
const app = express();
const port = 3000;
const mongoose= require('mongoose');
const P_router= require("./Personajes");
const I_router= require("./Inventario");
const N_router= require("./Nivel");
const U_router= require("./Usuario");



// coneccion con la base de datos mongo db atlas  
mongoose.connect('mongodb+srv://Valentina:Unad_123@cluster0.zfmqjox.mongodb.net/KillerRats?retryWrites=true&w=majority&appName=Cluster0')
   .then(result => {
    // Inicia el servidor en el puerto 3000
    app.listen(port, () => {
        console.log(`Servidor corriendo en http://localhost:${port}`);
    });
    console.log('conexion exitosa a la Base de Datos')
    })
    .catch(err => console.log(err))

// Define la carpeta de archivos estáticos (por ejemplo, HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

 // Maneja todas las solicitudes y envía el archivo HTML
app.get('/KILLERRATS', function(req, res) {
res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// midelware
app.use(express.json());
app.use('/api', P_router)
app.use('/api', I_router)
app.use('/api', N_router)
app.use('/api', U_router)

