let listaEstudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];

function generadorCodigo(min = 1, max = 99999) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guardarUsuario(nombre, edad, grado) {
    if (edad < 0) {
        alert("La edad no puede ser un número negativo.");
        return;
    }

    if (listaEstudiantes.some(estudiante => estudiante.nombre === nombre)) {
        alert("Este estudiante ya ha sido registrado.");
        return;
    }

    let codigo;
    do {
        codigo = generadorCodigo();
    } while (listaEstudiantes.some(estudiante => estudiante.codigo === codigo));

    const estudiante = { nombre, edad, grado, codigo };
    listaEstudiantes.push(estudiante);

    // Guardar la lista en localStorage
    localStorage.setItem("estudiantes", JSON.stringify(listaEstudiantes));

    alert(`Has sido guardado con éxito: ${JSON.stringify(estudiante)}`);

    window.location.href = 'home.html';
}

// Capturar datos del formulario
document.getElementById("formularioEstudiante").addEventListener("submit", function (event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const edad = parseInt(document.getElementById("edad").value);
    const grado = document.getElementById("grado").value.trim();

    if (!nombre || isNaN(edad) || !grado) {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    guardarUsuario(nombre, edad, grado);

    // Limpiar formulario después del registro
    document.getElementById("formularioEstudiante").reset();
});
