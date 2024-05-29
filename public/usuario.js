/////  ///// coleccion niveles //////////////////////


/////////////////// formulario parara enviar elementos a la base de datos ///////////////////


document.getElementById('addObjeto').addEventListener('click', function() {
    const objetosContainer = document.getElementById('probContainer');
    const newObjeto = document.createElement('div');
    newObjeto.classList.add('proviciones');
    newObjeto.innerHTML = `
        <input type="text" placeholder="Nombre del objeto" required>
        <input type="number" placeholder="Cantidad" required>
    `;
    objetosContainer.appendChild(newObjeto);
});

document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre_P').value;
    const edad = document.getElementById('edad_P').value;
    const personaje_selec = document.getElementById('per_P').value;
    const nivel_actual = document.getElementById('nivel_P').value;
    const monedas = document.getElementById('mon_P').value;
    const can_compras = document.getElementById('com_P').value;

    const proviciones = Array.from(document.querySelectorAll('#probContainer .proviciones')).map(objeto => {
        const nombre = objeto.children[0].value.trim();
        const cantidad = objeto.children[1].value.trim();
        return nombre && cantidad ? { nombre, cantidad: parseInt(cantidad) } : null;
    }).filter(objeto => objeto !== null);

    const data = {
        nombre,
        edad,
        personaje_selec,
        nivel_actual,
        monedas,
        can_compras,
        proviciones
    };

    try {
        const response = await fetch('/api/usuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.ok) {
            alert('Usuario creado exitosamente');
            document.getElementById('userForm').reset(); // Limpiar el formulario después de enviarlo con éxito
        } else {
            alert('Error al crear el Usuario: ' + result.error);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Hubo un error al crear el Usuario.');
    }
});
/////////////////////// ver niveles /////////////////////////////////////////////////////

document.getElementById('form_ver_usuario').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
    const nombre = document.getElementById('nombre_V').value;

    // Llama al endpoint con el nombre proporcionado
    fetch(`/api/usuario/${nombre}`)
    .then(response => response.json())
    .then(data => {
        const resultadoDiv = document.getElementById('resultado');
        if (data && data._id && data.nombre ) {
            // Crear HTML para los objetos
            let objetosHTML = '';
            if (data.proviciones && data.proviciones.length > 0) {
                objetosHTML = '<p><strong>Proviciones:</strong></p><ul>';
                data.proviciones.forEach(proviciones => {
                    objetosHTML += `<li>Nombre: ${proviciones.nombre}, Cantidad: ${proviciones.cantidad}</li>`;
                });
                objetosHTML += '</ul>';
            } else {
                objetosHTML = '<p><strong>Proviciones:</strong> No hay objetos</p>';
            }

            // Actualizar el contenido del div resultado
            resultadoDiv.innerHTML = `
                <p><strong>ID:</strong> ${data._id}</p>
                <p><strong>Nombre:</strong> ${data.nombre}</p>
                <p><strong>Edad:</strong> ${data.edad}</p>
                <p><strong>Personaje seleccionado:</strong> ${data.personaje_selec}</p>
                <p><strong>Nivel:</strong> ${data.nivel_actual}</p>
                <p><strong>Monedas:</strong> ${data.monedas}</p>
                <p><strong>Compras:</strong> ${data.can_compras}</p>
                ${objetosHTML}
            `;
        } else {
            resultadoDiv.textContent = 'No se encontraron datos para el nombre proporcionado';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('resultado').textContent = 'Hubo un error al buscar el usuario.';
    });
});
////////////////////// eliminar elementos en la base de datos /////////////////////////////

const eliminar_id= document.querySelector('#id')
const button3 = document.getElementById('eliminar_N');

button3.addEventListener('click', (e)=>{
    const id= eliminar_id.value;
    fetch(`/api/usuario/${id}`, {
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
        alert('usuario eliminado con éxito');
    })
    .catch((error) => {
        console.error('Error:', error.message);
        alert(`Error al eliminar usuario: ${error.message}`);
    });
});



/////////////////////////// actualizar elementos en la base de datos ////////////////////////////
document.getElementById('canObjeto').addEventListener('click', function() {
    const objetosContainer_1 = document.getElementById('probContainer_1');
    const newObjeto_1 = document.createElement('div');
    newObjeto_1.classList.add('proviciones_1');
    newObjeto_1.innerHTML = `
        <input type="text" placeholder="Nombre del objeto" required>
        <input type="number" placeholder="Cantidad" required>
    `;
    objetosContainer_1.appendChild(newObjeto_1);
});

document.getElementById('mod_userform').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('id_M').value;
    const nombre = document.getElementById('nombre_M').value;
    const edad = document.getElementById('edad_M').value;
    const personaje_selec = document.getElementById('per_M').value;
    const nivel_actual = document.getElementById('nivel_M').value;
    const monedas = document.getElementById('mon_M').value;
    const can_compras = document.getElementById('com_M').value;

    const proviciones = Array.from(document.querySelectorAll('#probContainer_1 .proviciones_1')).map(objeto => {
        const nombre = objeto.children[0].value.trim();
        const cantidad = objeto.children[1].value.trim();
        return nombre && cantidad ? { nombre, cantidad: parseInt(cantidad) } : null;
    }).filter(objeto => objeto !== null);

    const data = {
        nombre,
        edad,
        personaje_selec,
        nivel_actual,
        monedas,
        can_compras,
        proviciones
    };

    try {
        const response = await fetch(`/api/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (result.ok) {
            alert('Usuario modificado exitosamente');
            document.getElementById('mod_userform').reset(); // Limpiar el formulario después de enviarlo con éxito
        } else {
            alert('Error al modificar el Usuario: ' + result.error);
        }
    } catch (err) {
        console.error('Error:', err);
        alert('Hubo un error al modificar el Usuario.');
    }
});