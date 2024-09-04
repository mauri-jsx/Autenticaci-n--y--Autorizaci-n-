// pages/LogoutPages.js
import Swal from 'sweetalert2';
import { clearCurrentUser } from '../main.js';

const loadLogoutPage = async () => {
    try {
        const response = await fetch('http://localhost:4000/logout', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json();

        if (response.ok) {
            clearCurrentUser();
            Swal.fire('Cierre de Sesión', data.message, 'success').then(() => {
                window.location.hash = '/login';
            });
        } else {
            Swal.fire('Error', data.message, 'error');
        }
    } catch (error) {
        Swal.fire('Error', 'Ocurrió un error al cerrar la sesión', 'error');
    }
};

export default loadLogoutPage;
