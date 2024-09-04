const loadAboutPage = () => {
    document.getElementById('app').innerHTML = `
        <div class="bg-white p-6 rounded shadow-md">
            <h2 class="text-xl font-semibold mb-4">Acerca de Nosotros</h2>
            <p class="text-gray-700 mb-4">
                Esta aplicación fue creada para ayudar a los usuarios a gestionar sus cuentas de manera sencilla y segura.
                Con funciones de registro, inicio de sesión y manejo de sesiones, nuestro objetivo es facilitar la administración
                de tus datos personales de forma intuitiva.
            </p>
            <p class="text-gray-700 mb-4">
                Además, esta aplicación está diseñada con las últimas tecnologías, incluyendo autenticación de sesiones con Express,
                un diseño estilizado con Tailwind CSS y navegación dinámica a través de rutas en el frontend.
            </p>
            <p class="text-gray-700">
                Esperamos que encuentres esta aplicación útil y fácil de usar. ¡Gracias por visitarnos!
            </p>
        </div>
    `;
};

export default loadAboutPage;
