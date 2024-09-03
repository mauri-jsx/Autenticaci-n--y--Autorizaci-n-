// pages/AboutPages.js

const loadAboutPage = () => {
    document.getElementById('app').innerHTML = `
        <div class="bg-white p-6 rounded shadow-md">
            <h2 class="text-xl font-semibold mb-4">Acerca de</h2>
            <p class="text-gray-700">Esta aplicación es un ejemplo de autenticación usando sesiones en Express.</p>
        </div>
    `;
};

export default loadAboutPage;
