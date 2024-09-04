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


const showLogoutLink = () => {
    const navLinks = document.getElementById('navLinks');
    if (!document.getElementById('logoutLink')) {
        const logoutLink = document.createElement('a');
        logoutLink.id = 'logoutLink';
        logoutLink.href = '#/logout';
        logoutLink.className = 'text-blue-500 hover:underline';
        logoutLink.textContent = 'Logout';
        navLinks.appendChild(logoutLink);
    }
};


const hideLogoutLink = () => {
    const logoutLink = document.getElementById('logoutLink');
    if (logoutLink) {
        logoutLink.remove();
    }
};

export const setCurrentUser = (username) => {
    currentUser = username;
    setLoginStatus(true);
    updateGreeting();
    showLogoutLink();
};

export const clearCurrentUser = () => {
    currentUser = null;
    setLoginStatus(false);
    updateGreeting();
    hideLogoutLink();
};

initRouter();
