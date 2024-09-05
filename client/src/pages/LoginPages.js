// pages/LoginPages.js
import Swal from 'sweetalert2';
import { setCurrentUser } from '../main.js';

const loadLoginPage = () => {
    document.getElementById('app').innerHTML = `
        <form id="loginForm" class="bg-white p-6 rounded shadow-md mb-4">
            <h2 class="text-xl font-semibold mb-4">Iniciar Sesión</h2>
            <input type="text" id="loginUsername" placeholder="Nombre de usuario" class="border p-2 w-full mb-2">
            <input type="password" id="loginPassword" placeholder="Contraseña" class="border p-2 w-full mb-4">
            <button type="submit" class="bg-green-500 text-white p-2 rounded w-full">Iniciar Sesión</button>
        </form>
    `;

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include',
            });

            const data = await response.json();

            if (response.ok) {
                setCurrentUser(username);
                Swal.fire('Inicio de Sesión', data.message, 'success').then(() => {
                    window.location.hash = '/about';
                });
            } else {
                Swal.fire('Error', data.message, 'error');
            }
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error durante el inicio de sesión', 'error');
        }
    });
};

export default loadLoginPage;
