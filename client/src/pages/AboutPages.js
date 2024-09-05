const loadAboutPage = () => {
    document.getElementById('app').innerHTML = `
        <div class="bg-white p-6 rounded shadow-md">
            <h2 class="text-xl font-semibold mb-4">Acerca de Nosotros</h2>
            <p class="text-gray-700 mb-4">
                Esta aplicación fue creada para ayudar a los usuarios a gestionar sus cuentas de manera sencilla y segura
                utilizando autenticación basada en JWT.
            </p>
            <p class="text-gray-700">
                Con funciones de registro, inicio de sesión y manejo de sesiones con JWT, nuestro objetivo es proporcionar
                una experiencia de usuario segura y eficiente.
            </p>
        </div>
    `;
};

export default loadAboutPage;
