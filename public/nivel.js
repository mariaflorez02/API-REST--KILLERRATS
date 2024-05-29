/////  ///// coleccion niveles //////////////////////


/////////////////// formulario parara enviar elementos a la base de datos ///////////////////
document.getElementById('addEnemigo').addEventListener('click', function() {
    const enemigosContainer = document.getElementById('enemigosContainer');
    const newEnemigo = document.createElement('div');
    newEnemigo.classList.add('enemigo');
    newEnemigo.innerHTML = `
        <input type="text" placeholder="Nombre del enemigo" required>
        <input type="number" placeholder="Cantidad" required>
    `;
    enemigosContainer.appendChild(newEnemigo);
});

document.getElementById('addObjeto').addEventListener('click', function() {
    const objetosContainer = document.getElementById('objetosContainer');
    const newObjeto = document.createElement('div');
    newObjeto.classList.add('objeto');
    newObjeto.innerHTML = `
        <input type="text" placeholder="Nombre del objeto" required>
        <input type="number" placeholder="Cantidad" required>
    `;
    objetosContainer.appendChild(newObjeto);
});

document.getElementById('nivelForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre_P').value;
    const descripcion = document.getElementById('descripcion_P').value;

    const enemigos = Array.from(document.querySelectorAll('#enemigosContainer .enemigo')).map(enemigo => {
        const nombre = enemigo.children[0].value.trim();
        const cantidad = enemigo.children[1].value.trim();
        return nombre && cantidad ? { nombre, cantidad: parseInt(cantidad) } : null;
    }).filter(enemigo => enemigo !== null);

    const objetos = Array.from(document.querySelectorAll('#objetosContainer .objeto')).map(objeto => {
        const nombre = objeto.children[0].value.trim();
        const cantidad = objeto.children[1].value.trim();
        return nombre && cantidad ? { nombre, cantidad: parseInt(cantidad) } : null;
    }).filter(objeto => objeto !== null);

    const data = {
        nombre,
        descripcion,
        enemigos,
        objetos
    };

    try {
        const response = await fetch('/api/nivel', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.ok) {
            alert('Nivel creado exitosamente');
            document.getElementById('nivelForm').reset(); // Limpiar el formulario después de enviarlo con éxito
        } else {
            alert('Error al crear el nivel: ' + result.error);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Hubo un error al crear el nivel.');
    }
});
/////////////////////// ver niveles /////////////////////////////////////////////////////

document.getElementById('form_ver_nivel').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
    const nombre = document.getElementById('nombre_V').value;

    // Llama al endpoint con el nombre proporcionado
    fetch(`/api/nivel/${nombre}`)
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        if (data && data._id && data.nombre ) {
            // Crear HTML para los enemigos
            let enemigosHTML = '';
            if (data.enemigos && data.enemigos.length > 0) {
                enemigosHTML = '<p><strong>Enemigos:</strong></p><ul>';
                data.enemigos.forEach(enemigo => {
                    enemigosHTML += `<li>Nombre: ${enemigo.nombre}, Cantidad: ${enemigo.cantidad}</li>`;
                });
                enemigosHTML += '</ul>';
            } else {
                enemigosHTML = '<p><strong>Enemigos:</strong> No hay enemigos</p>';
            }

            // Crear HTML para los objetos
            let objetosHTML = '';
            if (data.objetos && data.objetos.length > 0) {
                objetosHTML = '<p><strong>Objetos:</strong></p><ul>';
                data.objetos.forEach(objeto => {
                    objetosHTML += `<li>Nombre: ${objeto.nombre}, Cantidad: ${objeto.cantidad}</li>`;
                });
                objetosHTML += '</ul>';
            } else {
                objetosHTML = '<p><strong>Objetos:</strong> No hay objetos</p>';
            }

            // Actualizar el contenido del div resultado
            resultadoDiv.innerHTML = `
                <p><strong>ID:</strong> ${data._id}</p>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Descripción:</strong> ${data.descripcion}</p>
                ${enemigosHTML}
                ${objetosHTML}
            `;
        } else {
            resultadoDiv.textContent = 'No se encontraron datos para el nombre proporcionado';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado').textContent = 'Hubo un error al buscar el nivel.';
    });
});
////////////////////// eliminar elementos en la base de datos /////////////////////////////

const eliminar_id= document.querySelector('#id')
const button3 = document.getElementById('eliminar_N');

button3.addEventListener('click', (e)=>{
    const id= eliminar_id.value;
    fetch(`/api/nivel/${id}`, {
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
                throw new Error(errorData.message || 'Error al eliminar el nivel');
            });
        }
        // Si la respuesta es ok, devolvemos el JSON
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        alert('nivel eliminado con éxito');
    })
    .catch((error) => {
        console.error('Error:', error.message);
        alert(`Error al eliminar nivel: ${error.message}`);
    });
});



/////////////////////////// actualizar elementos en la base de datos ////////////////////////////
document.getElementById('Enemigo').addEventListener('click', function() {
    const enemigosContainer_1 = document.getElementById('enemigosContainer_1');
    const newEnemigo_1 = document.createElement('div');
    newEnemigo_1.classList.add('enemigo_1');
    newEnemigo_1.innerHTML = `
        <input type="text" placeholder="Nombre del enemigo" required>
        <input type="number" placeholder="Cantidad" required>
    `;
    enemigosContainer_1.appendChild(newEnemigo_1);
});

document.getElementById('canObjeto').addEventListener('click', function() {
    const objetosContainer_1 = document.getElementById('objetosContainer_1');
    const newObjeto_1 = document.createElement('div');
    newObjeto_1.classList.add('objeto_1');
    newObjeto_1.innerHTML = `
        <input type="text" placeholder="Nombre del objeto" required>
        <input type="number" placeholder="Cantidad" required>
    `;
    objetosContainer_1.appendChild(newObjeto_1);
});

document.getElementById('mod_nivelform').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('id_M').value;
    const nombre = document.getElementById('nombre_M').value;
    const descripcion = document.getElementById('descripcion_M').value;

    const enemigos = Array.from(document.querySelectorAll('#enemigosContainer_1 .enemigo_1')).map(enemigo => {
        const nombre = enemigo.children[0].value.trim();
        const cantidad = enemigo.children[1].value.trim();
        return nombre && cantidad ? { nombre, cantidad: parseInt(cantidad) } : null;
    }).filter(enemigo => enemigo !== null);

    const objetos = Array.from(document.querySelectorAll('#objetosContainer_1 .objeto_1')).map(objeto => {
        const nombre = objeto.children[0].value.trim();
        const cantidad = objeto.children[1].value.trim();
        return nombre && cantidad ? { nombre, cantidad: parseInt(cantidad) } : null;
    }).filter(objeto => objeto !== null);

    const data = {
        nombre,
        descripcion,
        enemigos,
        objetos
    };

    try {
        const response = await fetch(`/api/nivel/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.ok) {
            alert('Nivel modificado exitosamente');
            document.getElementById('nivelForm').reset(); // Limpiar el formulario después de enviarlo con éxito
        } else {
            alert('Error al modificar el nivel: ' + result.error);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Hubo un error al modificar el nivel.');
    }
});