let MAIN;
let MODAL_POST;
let BTN_SHOW_POST;
let BTN_CANCEL_POST;
let deferredPrompt;
// Funciones
const showPostModal = () => {
  MAIN.style.display = "none"; // Oculta el contenido principal
  MODAL_POST.style.display = "block"; // Muestra el modal
  setTimeout(() => {
    MODAL_POST.style.transform = "translateY(0)"; // Animación para mostrar el modal
  }, 1);
};

const closePostModal = () => {
  MAIN.style.display = "block";
  MODAL_POST.style.transform = "translateY(100vh)"; // Oculta el modal con animación
};

window.addEventListener("beforeinstallprompt", (e) => {
  console.log("Evento por defecto anulado");
  e.preventDefault(); // Previene el comportamiento por defecto
  deferredPrompt = e; // Guarda el evento para usarlo más tarde
});

// Cuando se carga el DOM
window.addEventListener("load", async () => {
  MAIN = document.querySelector("#main");
  MODAL_POST = document.querySelector("#modal-post-section");
  BTN_SHOW_POST = document.querySelector("#btn-upload-post");
  BTN_SHOW_POST.addEventListener("click", showPostModal); // Asigna el evento al botón de mostrar post
  BTN_CANCEL_POST = document.querySelector("#btn-post-cancel");
  BTN_CANCEL_POST.addEventListener("click", closePostModal); // Asigna el evento al botón de cerrar post
  
  await Notification.requestPermission(); //Solicita permisos para notificaciones
  
  if (navigator.serviceWorker) {
    const basePath = location.hostname === "localhost" ? "" : "/PWA_Material-Design";
    try {
      const res = await navigator.serviceWorker.register(`${basePath}/sw.js`);
      if (res) {
        console.log("Service Worker registered successfully.");
        const ready = await navigator.serviceWorker.ready;
        ready.showNotification("ESPE Notes", {
          body: "Notifcaciones Activadas",
          icon: "./src/assets/icons/icon-128x128.png",
          vibrate: [100, 50 , 200],
        });
      }
    } catch (error) {
      console.error("Service Worker registration failed:", error);
    }
  }
  const bannerInstall = document.querySelector("#banner-install");
  bannerInstall.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Muestra el prompt de instalación
      const response = await deferredPrompt.userChoice; // Espera a que el usuario elija
      if (response.outcome === "accepted") {
        console.log("User accepted the installation prompt");
      }
    }
  });
});
