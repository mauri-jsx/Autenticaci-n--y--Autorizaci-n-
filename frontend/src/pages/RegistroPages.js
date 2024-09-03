import Swal from 'sweetalert2';

const loadRegisterPage = () => {
    document.getElementById('app').innerHTML = `
        <form id="registerForm" class="bg-white p-6 rounded shadow-md mb-4">
            <h2 class="text-xl font-semibold mb-4">Registro</h2>
            <input type="text" id="registerUsername" placeholder="Nombre de usuario" class="border p-2 w-full mb-2">
            <input type="password" id="registerPassword" placeholder="Contraseña" class="border p-2 w-full mb-4">
            <button type="submit" class="bg-blue-500 text-white p-2 rounded w-full">Registrar</button>
        </form>
    `;

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        try {
            const response = await fetch('http://localhost:4000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            Swal.fire('Registro', data.message, response.ok ? 'success' : 'error');
        } catch (error) {
            Swal.fire('Error', 'Ocurrió un error durante el registro', 'error');
        }
    });
};

export default loadRegisterPage;
