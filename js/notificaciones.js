// notificaciones.js — Notification API
// Esta es la API del NAVEGADOR (no el sistema push completo, que necesitaría
// un servidor con claves VAPID). Sirve para mostrar avisos del lado del cliente
// y para entender el permiso que el usuario debe conceder.

const ICONO_NOTIFICACION = "img/icon-192.png";

// Muestra una notificación SOLO si el usuario ya dio permiso.
// carrito.js la usa para avisar "Pedido agregado" y "Carrito sincronizado".
function mostrarNotificacion(titulo, cuerpo) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;

  const opciones = { body: cuerpo, icon: ICONO_NOTIFICACION, badge: ICONO_NOTIFICACION };

  // En celulares (Android) "new Notification()" no funciona: hay que pedirle al
  // Service Worker que la muestre. En computadora sirve cualquiera de las dos.
  const mostrarDirecto = () => {
    try {
      new Notification(titulo, opciones);
    } catch (error) {
      console.warn("No se pudo mostrar la notificación:", error);
    }
  };

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .getRegistration()
      .then((registro) => {
        if (registro && registro.active) registro.showNotification(titulo, opciones);
        else mostrarDirecto();
      })
      .catch(mostrarDirecto);
  } else {
    mostrarDirecto();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("btn-notificar");
  const mensaje = document.getElementById("notificaciones-mensaje");
  if (!boton) return;

  // Si el permiso ya se concedió o se bloqueó antes, lo mostramos desde el inicio
  if ("Notification" in window) {
    if (Notification.permission === "granted") mensaje.textContent = "Notificaciones activadas.";
    if (Notification.permission === "denied") {
      mensaje.textContent = "Las notificaciones están bloqueadas: actívalas desde el candado de la barra de direcciones.";
    }
  }

  boton.addEventListener("click", () => {
    // "Notification" no existe en todos los navegadores/contextos; lo comprobamos primero
    if (!("Notification" in window)) {
      mensaje.textContent = "Este navegador no soporta notificaciones.";
      return;
    }

    // Notification.requestPermission() abre el diálogo del navegador
    // ("bloquear" / "permitir"). Devuelve una promesa con la respuesta del usuario.
    Notification.requestPermission().then((permiso) => {
      if (permiso === "granted") {
        mostrarNotificacion("La Labora Mariscos", "¡Listo! Te avisaremos cuando tu pedido se agregue o tu carrito se sincronice.");
        mensaje.textContent = "Notificaciones activadas.";
      } else {
        mensaje.textContent = "No diste permiso para notificaciones.";
      }
    });
  });
});
