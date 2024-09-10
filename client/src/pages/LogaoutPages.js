import Swal from 'sweetalert2';
import { clearCurrentUser } from '../main.js';

const loadLogoutPage = async () => {
    clearCurrentUser();
    Swal.fire('Cierre de Sesión', 'Has cerrado sesión exitosamente', 'success').then(() => {
        window.location.hash = '/login';
    });
};

export default loadLogoutPage;
