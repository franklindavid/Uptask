import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');


if (btnEliminar){
    btnEliminar.addEventListener('click',(e)=>{
        const urlProyecto = e.target.dataset.proyectoUrl;
        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borralo!',
            cancelButtonText: 'No, cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
                const url=`${location.origin}/proyectos/${urlProyecto}`;
                axios.delete(url,{params: {urlProyecto}}).then(function(respuesta){
                  Swal.fire(
                    'borrado!',
                    respuesta.data,
                    'success'
                  );
                  setTimeout(()=>{
                      window.location.href='/'
                  },2000)
                }).catch(()=>{
                  Swal.fire({
                    type:'error',
                    title: 'Hubo un error',
                    text: 'No se pudo eliminar el proyecto'
                  })
                });
            }
          })
    })
}

export default btnEliminar;