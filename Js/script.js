// Variables

const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners

cargarEventListeners();

function cargarEventListeners(){
    // Dispara cuando se presiona 'Agregar al carrito'
    cursos.addEventListener('click', comprarCurso);
    // Borrar un curso del carrito
    carrito.addEventListener('click', eliminarCurso);
    // Borrar todos los cursos del carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);
    // al cargar el documento mostrar local storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}




// Funciones

// funcion que añade al carrito
function comprarCurso(e){
    e.preventDefault();
    // Delegation para agregar-carrito
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo : curso.querySelector('h4').textContent,
        precio : curso.querySelector('.precio span').textContent,
        id : curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100px>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" data-id=${curso.id} class="borrar-curso">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    // añadiendo a localStorage
    agregarCursoLocalStorage(curso);
}

// Elimina un curso del carrito
function eliminarCurso(e){
    e.preventDefault();
    let curso;
    let cursoId;
    if(e.target.className === 'borrar-curso'){
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    borrarCursoLocalStorage(cursoId);
}

// Elimina todos los cursos del carrito
function vaciarCarrito(){
    // forma lenta
    // listaCursos.innerHTML = '';
    // forma rapida y recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }

    // vaciar loca storage
    vaciarLocalStorage();

    return false;
}


// almacenando cursos en localStorage
function agregarCursoLocalStorage(curso){
    let cursos;
    cursos = obtenerCursoLocalStorage();
    // añadir el nuevo curso
    cursos.push(curso);
    // convertir de String a arreglo para local storage
    localStorage.setItem('cursos', JSON.stringify(cursos));
};


// comprobar que haya elementos en localStorage, retorna un arreglo
function obtenerCursoLocalStorage(){
    let cursosLS;
    // Revisamos valores de localStorage
    if(localStorage.getItem('cursos') === null){
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}


// imprime los datos de localStorage en localstorage
function leerLocalStorage(){
    let cursosLS;
    cursosLS = obtenerCursoLocalStorage();
    cursosLS.forEach(function(curso){
        // construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width=100px>
            </td>
            <td>${curso.titulo}</td>
            <td>${curso.precio}</td>
            <td>
                <a href="#" data-id=${curso.id} class="borrar-curso">X</a>
            </td>
        `;
        listaCursos.appendChild(row);
    });
}


// Eliminar el curso por el ID de localStorage
function borrarCursoLocalStorage(curso){

    let cursosLS;    
    // obtenemos el arreglo de cursos
    cursosLS = obtenerCursoLocalStorage();
    // iteramos comparando el ID del curso con los del Local Storage
    cursosLS.forEach(function(cursoLS, index){
        if(cursoLS.id === curso){
            cursosLS.splice(index, 1);
        }
    });
    // Añadimos el arreglo actual a Local Storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Elimina todos los cursos de local Storege
function vaciarLocalStorage(){
    localStorage.clear();
}