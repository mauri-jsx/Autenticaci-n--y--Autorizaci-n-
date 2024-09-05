import "./style.css";
import { initRouter, setLoginStatus } from './routes.js';

let currentUser = null;
let jwtToken = null;
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

export const setCurrentUser = (username, token) => {
  currentUser = username;
  jwtToken = token;
  setLoginStatus(true);
  updateGreeting();
  showLogoutButton();
};

export const clearCurrentUser = () => {
  currentUser = null;
  jwtToken = null;
  setLoginStatus(false);
  updateGreeting();
  hideLogoutButton();
};

export const getToken = () => jwtToken;

initRouter();
