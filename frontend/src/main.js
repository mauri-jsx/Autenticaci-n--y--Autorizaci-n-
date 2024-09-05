import "./style.css";
import { initRouter, setLoginStatus } from './routes.js';

let currentUser = null;

export const updateGreeting = () => {
    const greetingElement = document.getElementById('userGreeting');
    if (currentUser) {
        greetingElement.textContent = `Bienvenido, ${currentUser}`;
    } else {
        greetingElement.textContent = '';
    }
};

const showLogoutButton = () => {
    const navLinks = document.getElementById('navLinks');
    if (!document.getElementById('logoutButton')) {
        const logoutButton = document.createElement('button');
        logoutButton.id = 'logoutButton';
        // Aplicando clases de Tailwind CSS para estilo y transición
        logoutButton.className = 'bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 shadow-md';
        logoutButton.textContent = 'Cerrar Sesión';
        logoutButton.onclick = () => {
            window.location.hash = '/logout'; // Redirige a la página de logout
        };
        navLinks.appendChild(logoutButton);
    }
};


const hideLogoutButton = () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.remove();
    }
};

export const setCurrentUser = (username) => {
    currentUser = username;
    setLoginStatus(true); // Marca al usuario como logueado
    updateGreeting();
    showLogoutButton(); // Muestra el botón de "Cerrar Sesión"
};

export const clearCurrentUser = () => {
    currentUser = null;
    setLoginStatus(false);
    updateGreeting();
    hideLogoutButton();
};

initRouter();
