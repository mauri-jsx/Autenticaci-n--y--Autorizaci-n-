import loadRegisterPage from './pages/RegistroPages.js';
import loadLoginPage from './pages/LoginPages.js';
import loadAboutPage from './pages/AboutPages.js';


const routes = {
    '/register': loadRegisterPage,
    '/login': loadLoginPage,
    "/about": loadAboutPage
};


export const initRouter = () => {
    window.addEventListener('hashchange', () => {
        navigateTo(window.location.hash.slice(1));
    });
    navigateTo(window.location.hash.slice(1) || '/register');
};

const navigateTo = (path) => {
    const page = routes[path];
    if (page) {
        page();
    } else {
        document.getElementById('app').innerHTML = '<p class="text-red-500">Página no encontrada</p>';
    }
};
