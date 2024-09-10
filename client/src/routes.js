<<<<<<< HEAD:frontend/src/routes.js
import loadRegisterPage from './pages/RegistroPages.js';
import loadLoginPage from './pages/LoginPages.js';
import loadLogoutPage from './pages/LogoutPages.js';
=======
// router.js
import loadRegisterPage from './pages/RegisterPages.js';
import loadLoginPage from './pages/LoginPages.js';
import loadLogoutPage from './pages/LogaoutPages.js';
>>>>>>> f0d762672f7e301ad14ba0f2cdbcd4a953d6d818:client/src/routes.js
import loadAboutPage from './pages/AboutPages.js';
import Swal from 'sweetalert2';

let isLoggedIn = false;

export const setLoginStatus = (status) => {
    isLoggedIn = status;
};

const routes = {
    '/register': loadRegisterPage,
    '/login': loadLoginPage,
    '/logout': loadLogoutPage,
    '/about': loadAboutPage,
};

export const initRouter = () => {
    window.addEventListener('hashchange', () => {
        navigateTo(window.location.hash.slice(1));
    });
    navigateTo(window.location.hash.slice(1) || '/register');
};

const navigateTo = (path) => {
    if (isLoggedIn && (path === '/register' || path === '/login')) {
        Swal.fire('Ya estás logueado', 'No puedes acceder a esta página', 'warning');
        window.location.hash = '/about';
        return;
    }

    const page = routes[path];
    if (page) {
        page();
    } else {
        document.getElementById('app').innerHTML = '<p class="text-red-500">Página no encontrada</p>';
    }
};
