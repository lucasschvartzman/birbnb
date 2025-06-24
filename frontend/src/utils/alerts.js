import Swal from 'sweetalert2';

export const showSuccessLoginAlert = (user) => {
  Swal.fire({
    icon: 'success',
    title: 'Bienvenido',
    text: `Hola, ${user.nombre || user.email}!`,
    position: 'center', 
    timer: 1000,
    showConfirmButton: false,
    allowOutsideClick: true,
    didOpen: (popup) => {
      popup.addEventListener('click', () => {
        Swal.close();
      });
    },
  });
};

export const showSuccessReservation = (theme) => {
  Swal.fire({
    icon: 'success',
    title: 'Reserva guardada correctamente en estado PENDIENTE',
    text: `El anfitrión se comunicará en breve para definir los detalles`,
    position: 'center', 
    showConfirmButton: true,
    confirmButtonColor: theme.palette.secondary.main,
    showCloseButton: true,
    allowOutsideClick: true,
    didOpen: (popup) => {
      popup.addEventListener('click', () => {
        Swal.close();
      });
    },
  });
};

export const showSuccessAlterReservation = (theme) => {
  Swal.fire({
    icon: 'success',
    title: 'Reserva modificada correctamente',
    position: 'center', 
    showConfirmButton: true,
    confirmButtonColor: theme.palette.secondary.main,
    showCloseButton: true,
    allowOutsideClick: true,
    didOpen: (popup) => {
      popup.addEventListener('click', () => {
        Swal.close();
      });
    },
  });
};

export const showErrorReservation = (theme) => {
  Swal.fire({
    icon: 'error',
    title: 'Error guardando formulario',
    text: `Lo sentimos, su reserva no pudo ser procesada, vuelva a intentarlo en unos minutos`,
    position: 'center', 
    showConfirmButton: true,
    confirmButtonColor: theme.palette.secondary.main,
    showCloseButton: true,
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
    title: '¿Está seguro que quiere cerrar sesión?',
    icon: 'warning',
    confirmButtonColor: theme.palette.secondary.main, 
    cancelButtonColor: theme.palette.primary.light,      
    showCancelButton: true,
    confirmButtonText: 'Sí, cerrar sesión',
    cancelButtonText: 'No',
    reverseButtons: true,
    showCloseButton: true,
  });
};

export const confirmDropReservation = (theme) => {
  return Swal.fire({
    title: '¿Está seguro que quiere cancelar su reserva?',
    icon: 'warning',
    confirmButtonColor: theme.palette.error.main, 
    cancelButtonColor: theme.palette.primary.light,      
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No, aun la quiero',
    showCloseButton: true,
    reverseButtons: true,
  });
};

export const confirmCancelReservationForm = (theme) => {
  return Swal.fire({
    title: '¿Está seguro que quiere cancelar el proceso de reservación?',
    icon: 'warning',
    confirmButtonColor: theme.palette.secondary.main, 
    cancelButtonColor: theme.palette.primary.light,      
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No, quiero continuar',
    reverseButtons: true,
  });
};