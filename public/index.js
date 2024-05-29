
/////  ///// coleccion personajes  //////////////////////


/////////////////// formulario parara enviar elementos a la base de datos ///////////////////
const nombre_P= document.querySelector('#nombre_P')
const tipo_P= document.querySelector('#tipo_P')
const velocidad_P= document.querySelector('#velocidad_P')
const resistencia_P= document.querySelector('#resistencia_P')
const precision_disparo_P= document.querySelector('#precision_disparo_P')
const recarga_vida_P= document.querySelector('#recarga_vida_P')
const historia_P= document.querySelector('#historia_P')
const nivel_P= document.querySelector('#nivel_P')


const button1 = document.getElementById('crear_P');
button1.addEventListener('click', (e)=>{  
    const nombre= nombre_P.value
    const tipo= tipo_P.value
    const velocidad=velocidad_P.value
    const resistencia= resistencia_P.value
    const precision_disparo= precision_disparo_P.value
    const recarga_vida= recarga_vida_P.value
    const historia= historia_P.value  
    const nivel= nivel_P.value
   if (tipo== "jugable"){
    fetch('/api/personaje', {
        method:'POST', 
        headers:{
        'content-Type': 'application/json' },
    body: JSON.stringify({
        nombre,
        tipo,
        velocidad,
        resistencia,
        precision_disparo,
        recarga_vida,
        historia
    
    }),
    })
    }else{
        fetch('/api/personaje', {
            method:'POST', 
            headers:{
            'content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            tipo,
            velocidad,
            resistencia,
            precision_disparo,
            nivel
        
        }),
        })
    }

});

/////////////////////// ver personajes /////////////////////////////////////////////////////

document.getElementById('form_ver_personaje').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
    const nombre = document.getElementById('nombre_V').value;
    

    // Llama al endpoint con el ID proporcionado
    fetch(`/api/personaje/${nombre}`)
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        if (data && data._id && data.nombre && data.tipo) {
          resultadoDiv.innerHTML = `
            <p><strong>ID:</strong> ${data._id}</p>
            <p><strong>Nombre:</strong> ${data.nombre}</p>
            <p><strong>Tipo:</strong> ${data.tipo}</p>
            <p><strong>Historia:</strong> ${data.historia}</p>
            <p><strong>Velocidad:</strong> ${data.velocidad}</p>
            <p><strong>Resistencia:</strong> ${data.resistencia}</p>
            <p><strong>Recarga de vida:</strong> ${data.recarga_vida}</p>
            <p><strong>Precisión de disparo:</strong> ${data.precision_disparo}</p>
            <p><strong>Nivel:</strong> ${data.nivel}</p>
          `;
        } else {
          resultadoDiv.textContent = 'No se encontraron datos para el Nombre proporcionado';
        }
      })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado').textContent = 'Hubo un error al buscar el personaje.';
    });
});
////////////////////// eliminar elementos en la base de datos /////////////////////////////

const eliminar_id= document.querySelector('#id')
const button3 = document.getElementById('eliminar_P');

button3.addEventListener('click', (e)=>{
    const id= eliminar_id.value;
    fetch(`/api/personaje/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (!response.ok) {
            // Aquí estamos esperando que el servidor devuelva un objeto JSON con un mensaje de error
            return response.json().then(errorData => {
                // Lanzamos un error con el mensaje del servidor
                throw new Error(errorData.message || 'Error al eliminar el personaje');
            });
        }
        // Si la respuesta es ok, devolvemos el JSON
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('Personaje eliminado con éxito');
    })
    .catch((error) => {
        console.error('Error:', error.message);
        alert(`Error al eliminar personaje: ${error.message}`);
    });
});



/////////////////////////// actualizar elementos en la base de datos ////////////////////////////
const id_M=document.querySelector('#id_M')
const nombre_M= document.querySelector('#nombre_M')
const tipo_M= document.querySelector('#tipo_M')
const velocidad_M= document.querySelector('#velocidad_M')
const resistencia_M= document.querySelector('#resistencia_M')
const precision_disparo_M= document.querySelector('#precision_disparo_M')
const recarga_vida_M= document.querySelector('#recarga_vida_M')
const historia_M= document.querySelector('#historia_M')
const nivel_M= document.querySelector('#nivel_M')


const button4 = document.getElementById('modificar_P');
button4.addEventListener('click', (e)=>{  
    const id= id_M.value
    const nombre= nombre_M.value
    const tipo= tipo_M.value
    const velocidad=velocidad_M.value
    const resistencia= resistencia_M.value
    const precision_disparo= precision_disparo_M.value
    const recarga_vida= recarga_vida_M.value
    const historia= historia_M.value  
    const nivel= nivel_M.value
   if (tipo== "jugable"){
    fetch(`/api/personaje/${id}`, {
        method:'PUT', 
        headers:{
        'content-Type': 'application/json' },
    body: JSON.stringify({
        nombre,
        tipo,
        velocidad,
        resistencia,
        precision_disparo,
        recarga_vida,
        historia
    
    }),
    })
    }else{
        fetch(`/api/personaje/${id}`, {
            method:'PUT', 
            headers:{
            'content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            tipo,
            velocidad,
            resistencia,
            precision_disparo,
            nivel
        
        }),
        })
    }

});
