import Swal from 'sweetalert2';

export const showSuccessLoginAlert = (user) => {
  Swal.fire({
    icon: 'success',
    title: 'Bienvenido',
    text: `Hola, ${user.nombre || user.email}!`,
    position: 'center', 
    timer: 2000,
    showConfirmButton: false,
    allowOutsideClick: true,
    didOpen: (popup) => {
      popup.addEventListener('click', () => {
        Swal.close();
      });
    },
  });
};



export const showErrorAlert = () => {
  Swal.fire({
    icon: 'error',
    text: 'Email o contraseña incorrectos.',
    toast: true,
    position: 'bottom-end',  
    timer: 3000,    
    timerProgressBar: true, 
    showConfirmButton: false,
    background: '#ffff',   
    color: 'black',         
    customClass: {
      popup: 'colored-toast'
    }
  });
};


export const confirmLogout = (theme) => {
  return Swal.fire({
    title: '¿Esta seguro de querer cerrar sesión?',
    icon: 'warning',
    confirmButtonColor: theme.palette.secondary.main, 
    cancelButtonColor: theme.palette.grey[400],      
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'No',
    reverseButtons: true,
  });
};