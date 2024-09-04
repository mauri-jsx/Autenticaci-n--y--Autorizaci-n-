import "./style.css"
import { initRouter } from './routes.js';

let currentUser = null;
export const updateGreeting = () => {
    const greetingElement = document.getElementById('userGreeting');
    if (currentUser) {
        greetingElement.textContent = `Bienvenido, ${currentUser}`;
    } else {
        greetingElement.textContent = '';
    }
};

export const setCurrentUser = (username) => {
    currentUser = username;
    updateGreeting();
};

export const clearCurrentUser = () => {
    currentUser = null;
    updateGreeting();
};

initRouter();
