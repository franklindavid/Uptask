import axios from 'axios';
import Swal from 'sweetalert2';
import {actualizarAvance} from '../funciones/avance';
const tareas = document.querySelector('.listado-pendientes');
if (tareas){
    tareas.addEventListener('click', e =>{
        if(e.target.classList.contains('fa-check-circle')){
            const idTarea= e.target.parentElement.parentElement.dataset.tarea;
            const url = `${location.origin}/tareas/${idTarea}`;
            axios.patch(url,{idTarea}).then(function(respuesta){
                if(respuesta.status==200){
                    e.target.classList.toggle('completo'); 
                    actualizarAvance();
                }
            });
        }
        if(e.target.classList.contains('fa-trash')){
            Swal.fire({
                title: 'Deseas borrar esta tarea?',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borralo!',
                cancelButtonText: 'No, cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                    const idTarea= e.target.parentElement.parentElement.dataset.tarea;
                    const url = `${location.origin}/tareas/${idTarea}`;
                    axios.delete(url,{params: {idTarea}}).then(function(respuesta){
                        if(respuesta.status===200){
                            e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
                            actualizarAvance();
                        }
                      Swal.fire(
                        'borrado!',
                        respuesta.data,
                        'success'
                      );
                    //   setTimeout(()=>{
                    //       window.location.href='/'
                    //   },2000)
                    }).catch(()=>{
                      Swal.fire({
                        type:'error',
                        title: 'Hubo un error',
                        text: 'No se pudo eliminar la tarea'
                      })
                    });
                }
              })











            // const idTarea= e.target.parentElement.parentElement.dataset.tarea;
            // const url = `${location.origin}/tareas/${idTarea}`;
            // axios.patch(url,{idTarea}).then(function(respuesta){
            //     if(respuesta.status==200){
            //         e.target.classList.toggle('completo');
            //     }
            // });
        }
    });
}
export default tareas;