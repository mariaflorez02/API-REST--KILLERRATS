
/////  ///// coleccion inventario  //////////////////////


/////////////////// formulario parara enviar elementos a la base de datos ///////////////////
const nombre_P= document.querySelector('#nombre_P')
const tipo_P= document.querySelector('#tipo_P')
const funcion_P= document.querySelector('#funcion_P')
const costo_P= document.querySelector('#costo_P')
const valor_P= document.querySelector('#valor_P')
const daño_P= document.querySelector('#daño_P')


const button1 = document.getElementById('crear_I');
button1.addEventListener('click', (e)=>{  
    const nombre= nombre_P.value
    const tipo= tipo_P.value
    const funcion= funcion_P.value
    const costo= costo_P.value
    const valor= valor_P.value
    const nivel_daño= daño_P.value

   if (tipo== "compra"){
    fetch('/api/inventario', {
        method:'POST', 
        headers:{
        'content-Type': 'application/json' },
    body: JSON.stringify({
        nombre,
        tipo,
        funcion,
        costo,
        nivel_daño
    
    }),
    })    
    }else if(tipo== "compra y recoleccion"){
        fetch('/api/inventario', {
            method:'POST', 
            headers:{
            'content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            tipo,
            funcion,
            valor,
            costo
        
        }),
        })
        }else{
        fetch('/api/inventario', {
            method:'POST', 
            headers:{
            'content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            tipo,
            funcion
        
        }),
        })
    }

});

/////////////////////// ver personajes /////////////////////////////////////////////////////

document.getElementById('form_ver_objeto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
    const nombre = document.getElementById('nombre_V').value;
    

    // Llama al endpoint con el ID proporcionado
    fetch(`/api/inventario/${nombre}`)
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        if (data && data._id && data.nombre && data.tipo) {
          resultadoDiv.innerHTML = `
            <p><strong>ID:</strong> ${data._id}</p>
            <p><strong>Nombre:</strong> ${data.nombre}</p>
            <p><strong>Tipo:</strong> ${data.tipo}</p>
            <p><strong>Funcion:</strong> ${data.funcion}</p>
            <p><strong>Costo:</strong> ${data.costo}</p>
            <p><strong>Valor:</strong> ${data.valor}</p>
            <p><strong>Nivel de daño:</strong> ${data.nivel_daño}</p>
          `;
        } else {
          resultadoDiv.textContent = 'No se encontraron datos para el Nombre proporcionado';
        }
      })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado').textContent = 'Hubo un error al buscar el objeto.';
    });
});
////////////////////// eliminar elementos en la base de datos /////////////////////////////

const eliminar_id= document.querySelector('#id')
const button3 = document.getElementById('eliminar_I');

button3.addEventListener('click', (e)=>{
    const id= eliminar_id.value;
    fetch(`/api/inventario/${id}`, {
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
                throw new Error(errorData.message || 'Error al eliminar el inventario');
            });
        }
        // Si la respuesta es ok, devolvemos el JSON
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('inventario eliminado con éxito');
    })
    .catch((error) => {
        console.error('Error:', error.message);
        alert(`Error al eliminar inventario: ${error.message}`);
    });
});



/////////////////////////// actualizar elementos en la base de datos ////////////////////////////
const id_M=document.querySelector('#id_M')
const nombre_M= document.querySelector('#nombre_M')
const tipo_M= document.querySelector('#tipo_M')
const funcion_M= document.querySelector('#funcion_M')
const costo_M= document.querySelector('#costo_M')
const valor_M= document.querySelector('#valor_M')
const daño_M= document.querySelector('#daño_M')


const button4 = document.getElementById('modificar_I');
button4.addEventListener('click', (e)=>{  
    const id= id_M.value
    const nombre= nombre_M.value
    const tipo= tipo_M.value
    const funcion= funcion_M.value
    const costo= costo_M.value
    const valor= valor_M.value
    const nivel_daño= daño_M.value

   if (tipo== "compra"){
    fetch(`/api/inventario/${id}`, {
        method:'PUT', 
        headers:{
        'content-Type': 'application/json' },
    body: JSON.stringify({
        nombre,
        tipo,
        funcion,
        costo,
        nivel_daño
    
    }),
    })
    }else if (tipo== "compra y recoleccion"){
        fetch(`/api/inventario/${id}`, {
            method:'PUT', 
            headers:{
            'content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            tipo,
            funcion,
            valor,
            costo
        
        }),
        })
        }else{
        fetch(`/api/inventario/${id}`, {
            method:'PUT', 
            headers:{
            'content-Type': 'application/json' },
        body: JSON.stringify({
            nombre,
            tipo,
            funcion
        
        }),
        })
    }

});
