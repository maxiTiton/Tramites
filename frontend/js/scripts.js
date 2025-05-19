const apiUrl = 'http://localhost:4000/tramites'; // Reemplaza con la URL de tu API

// Función para cargar la grilla de paquetes
const Filtrar = () => {
    const titul = document.getElementById('buscar-input').value;
    const tableBody = document.getElementById('lista-carnets');
    tableBody.innerHTML = '';
    // const url = apiUrl + '/titulares?' + titul;
    let url = `http://localhost:4000/tramites/titulares?titular=${titul}`;
    fetch(url).then(res => {
       return res.json();
    }).then(data => {
       cargarGrilla(data);
    })
    .catch(error => console.log("Error al buscar: ", error));
};


// función para mostrar grilla al cargar
const tramites = () => {
    fetch(apiUrl).then(res => {
        return res.json();
    }).then(data => {
        cargarGrilla(data);
    })
};

const cargarGrilla = (data) => {
    const tableBody = document.getElementById('lista-carnets');
    tableBody.innerHTML = '';

    for (let i = 0; i < data.length; i ++) {
        let fila = `
        <tr>
            <td>${data[i].titular}</td>
            <td>${data[i].dni}</td>
            <td>${data[i].tipo}</td>
            <td>${data[i].fechaInicio}</td>
            <td>${data[i].fechaCierre}</td>
            <td>${data[i].prioritario}</td>
            <td>${data[i].osbservaciones}</td>
        </tr>`

        tableBody.innerHTML += fila;
    }
};

// Cargar la lista de paquetes al cargar la página
tramites();
