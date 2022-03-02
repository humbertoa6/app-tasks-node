import axios from "axios";
import Swal from 'sweetalert2';

const tasks = document.querySelector('.listado-pendientes');

if (tasks) {
  tasks.addEventListener('click', e => {
    if (e.target.classList.contains('fa-check-circle')) {
      const icon = e.target;
      const taskId = icon.parentElement.parentElement.dataset.task;
      const url = `${location.origin}/tasks/${taskId}`
      axios.patch(url, { taskId })
        .then(function(answer){
          icon.classList.toggle('completo');
        })
    }

    if(e.target.classList.contains('fa-trash')){
      const taskHtml = e.target.parentElement.parentElement;
      const taskId = taskHtml.dataset.task;

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${location.origin}/tasks/${taskId}`
          axios.delete(url, { params: taskId })
            .then(function(answer) {
              if(answer.status == 200){
                taskHtml.parentElement.removeChild(taskHtml);
              }
              Swal.fire(
                'Deleted!',
                answer.data,
                'success'
              );
            })
        }
      })
    }
  });
}
export default tasks;