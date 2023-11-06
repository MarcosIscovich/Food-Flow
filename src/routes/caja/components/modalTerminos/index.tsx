import { component$, } from '@builder.io/qwik';



export const ModalTerminos = component$(() => {



    return (
        <div>
            <dialog id="modal_Terminos" class="modal">
                <div class="modal-box bg-white p-4 shadow-lg rounded-lg">
                    <div class="flex justify-end">
                        <h1>Fecha de última actualización: 8 de Noviembre del 2023</h1>

                    </div>
                    <h1 class="font-bold text-lg">Términos y Condiciones de Uso de FoodFlow</h1>
                    <p class="my-4">
                        Bienvenido a FoodFlow, un sistema gastronómico de uso local. Antes de utilizar nuestro software, te solicitamos que leas y comprendas los siguientes términos y condiciones de uso. El uso de FoodFlow implica la aceptación de estos términos. Si no estás de acuerdo con alguno de los términos a continuación, te recomendamos que no utilices nuestro software.
                    </p>
                    <h3 class="text-lg font-semibold">Uso del Software:</h3>
                    <p class="mb-4">
                        1.1 Licencia de Software: FoodFlow es un software propietario con licencia paga. Al adquirir una licencia para utilizar FoodFlow, se te concede el derecho no exclusivo y no transferible de utilizar el software de acuerdo con los términos y condiciones establecidos en este acuerdo.
                    </p>
                    <p>
                        1.2 Prohibición de Reproducción y Venta: No tienes permitido reproducir, copiar, modificar, distribuir, vender, o sublicenciar el software o cualquier parte de este, sin la autorización previa y por escrito de los propietarios de FoodFlow.
                    </p>
                    <h3 class="text-lg font-semibold">Propiedad Intelectual:</h3>
                    <p class="mb-4">
                        2.1 Imágenes: FoodFlow puede proporcionar imágenes de libre uso para su uso en el software. No obstante, si decides cargar imágenes propias, eres el único responsable de garantizar que tengas los derechos necesarios para su uso. FoodFlow queda exento de cualquier responsabilidad relacionada con el uso de imágenes que no sean de libre uso por parte del usuario.
                    </p>
                    <p class="mb-4">
                        2.2 Base de Datos: La base de datos utilizada en FoodFlow es de uso interno del software. No tienes permiso para acceder, modificar, copiar, o utilizar la base de datos con fines distintos a los previstos en el software.
                    </p>
                    <p class="mb-4">
                        2.3 Derechos de Autor: El código fuente de FoodFlow está protegido por derechos de autor. No tienes permiso para descompilar, realizar ingeniería inversa, modificar o acceder al código fuente del software.
                    </p>
                    <p class="mb-4">
                        2.4 Marca Registrada: El logo de FoodFlow es una marca registrada. No tienes permiso para utilizar nuestra marca registrada de ninguna manera sin nuestra autorización previa y por escrito.
                    </p>

                    <h3 class="text-lg font-semibold">Limitación de Uso:
                    </h3>
                    <p class="mb-4">
                        3.1 Instalación del Software: La instalación de FoodFlow está limitada a las computadoras del local que hayas especificado al adquirir la licencia. No tienes permiso para instalar el software en más computadoras que las autorizadas por tu licencia.
                    </p>
                    <h3 class="text-lg font-semibold">Protección de Datos Personales:
                    </h3>
                    <p class="mb-4">
                        4.1 Registro de Clientes: FoodFlow podrá registrar a los clientes que adquieren el sistema en una base de datos particular con fines publicitarios. Esta base de datos se mantendrá en conformidad con las leyes de protección de datos personales aplicables y será utilizada exclusivamente para fines de marketing y promoción de los productos y servicios relacionados con FoodFlow.
                    </p>
                    <p class="mb-4">
                        4.2 Consentimiento del Cliente: Al utilizar FoodFlow y aceptar estos términos y condiciones, el cliente otorga su consentimiento explícito para que sus datos personales sean registrados en la base de datos mencionada en el punto 4.1 y utilizados con fines publicitarios.
                    </p>
                    <p class="mb-4">
                        4.3 Uso de Datos Personales: Los datos personales recopilados se utilizarán únicamente con fines relacionados con la prestación de servicios de FoodFlow, como la gestión de pedidos y la comunicación con los clientes. No compartiremos ni venderemos datos personales a terceros sin el consentimiento explícito del cliente.
                    </p>
                    <p class="mb-4">
                        4.4 Derechos del Cliente: Los clientes registrados tienen el derecho de acceder, rectificar, suprimir o limitar el procesamiento de sus datos personales. Para ejercer estos derechos, el cliente puede ponerse en contacto con nosotros a través de info@fooflow.com.ar.
                    </p>
                    <p class="mb-4">
                        4.5 Seguridad de los Datos: Implementamos medidas de seguridad adecuadas para proteger los datos personales de los clientes registrados contra el acceso no autorizado y la divulgación. No obstante, no podemos garantizar la seguridad absoluta de los datos en línea.
                    </p>
                    <p class="mb-4">
                        4.6 Cumplimiento Legal: FoodFlow cumple con las leyes de protección de datos personales aplicables y se esfuerza por garantizar la privacidad y la seguridad de los datos personales de los clientes registrados.
                    </p>
                    <h3 class="text-lg font-semibold">Modificaciones de los Términos:</h3>
                    <p class="mb-4">
                        Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. Cualquier modificación se hará efectiva inmediatamente después de la publicación de la versión actualizada en nuestro sitio web. Es tu responsabilidad revisar regularmente estos términos y condiciones para mantenerte informado de cualquier cambio. El uso continuado de FoodFlow después de la publicación de modificaciones constituye tu aceptación de los nuevos términos.
                    </p>
                    <h3 class="text-lg font-semibold">Terminación del Acuerdo:</h3>
                    <p class="mb-4">
                        Nos reservamos el derecho de terminar este acuerdo y tu licencia de uso de FoodFlow en cualquier momento, si se determina que has incumplido alguno de los términos y condiciones establecidos en este acuerdo.
                    </p>
                    <h3 class="text-lg font-semibold">Contacto:</h3>
                    <p class="mb-4">
                        Si tienes alguna pregunta o comentario sobre estos términos y condiciones, por favor contáctanos a través de info@fooflow.com.ar.
                    </p>
                    <p class="mb-4">
                        Al utilizar FoodFlow, aceptas cumplir con estos términos y condiciones. Te agradecemos por elegir nuestro software y esperamos que disfrutes de su uso en tu local gastronómico.
                    </p>
                </div>
                <form method="dialog" class="modal-backdrop">
                    <button class="text-red-500 px-4 py-2 hover:bg-red-100">Cerrar</button>
                </form>
            </dialog>

        </div>

    )
});



