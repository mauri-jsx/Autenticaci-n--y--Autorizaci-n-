// router.js
import loadRegisterPage from './pages/RegistroPages.js';
import loadLoginPage from './pages/LoginPages.js';
import loadLogoutPage from './pages/LogoutPages.js';
import loadAboutPage from './pages/AboutPages.js';

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
    const pages = routes[path];
    if (pages) {
        pages();
    } else {
        document.getElementById('app').innerHTML = '<p class="text-red-500">Página no encontrada</p>';
    }
};
