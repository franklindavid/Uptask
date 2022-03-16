import Swal from 'sweetalert2';
export const actualizarAvance = () => {
    const tareas = document.querySelectorAll('li.tarea');
    if (tareas.length){
        const tareasCompletas = document.querySelectorAll('i.completo');

        const avance = Math.round((tareasCompletas.length / tareas.length)*100);
        const porcentaje= document.querySelector('#porcentaje');
        porcentaje.style.width = avance + '%';
        if (avance === 100){
            Swal.fire(
                'Felicidades!',
                'Completaste el Proyecto',
                'success'
              );
        }
    }
}