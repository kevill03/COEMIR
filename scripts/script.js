const datosUrl = "data/datos.json";

const colegiadosTable = document.getElementById("colegiados-table");
const colegiadosTBody = document.getElementById("colegiados-tbody");

if (colegiadosTable) {
  colegiadosTable.addEventListener("click", expandTableItem);
}

function expandTableItem(e) {
  const row = e.target.closest(".table-data-row");

  if (row) {
    row.classList.toggle("expanded");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const heroSection = document.querySelector(".hero");
  const prevBtn = document.querySelector(".carousel-control.prev");
  const nextBtn = document.querySelector(".carousel-control.next");
  // Array de imágenes para el carrusel
  const images = [
    "url('https://images.unsplash.com/photo-1598256989800-fea5ce5146f2?auto=format&fit=crop&q=80&w=1920')",
    "url('https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1920')",
    "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=1920')",
  ];

  if (colegiadosTBody) {
    fetch(datosUrl)
      .then((response) => response.json())
      .then((data) => {
        createTableRows(data);
      })
      .catch((error) => console.error("Error al cargar los datos:", error));
  }

  let currentIndex = 0;

  function changeImage(index) {
    if (heroSection) {
      heroSection.style.backgroundImage = images[index];
    }
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    changeImage(currentIndex);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    changeImage(currentIndex);
  }

  // Rotar automáticamente cada 5 segundos (5000ms)
  let carouselInterval = setInterval(nextImage, 5000);

  // Controles manuales
  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextImage();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prevImage();
      resetInterval();
    });
  }

  // Reiniciar el temporizador al interactuar manualmente
  function resetInterval() {
    clearInterval(carouselInterval);
    carouselInterval = setInterval(nextImage, 5000);
  }
});

if (colegiadosTBody) {
  colegiadosTBody.innerHTML = "";
}

function createTableRows(jsonArray) {
  if (!colegiadosTBody) return;
  let tBodyHTML = "";
  jsonArray.forEach((jsonObj) => {
    const { id, names, lastNames, coemirId, profession, university } = jsonObj;
    const htmlRow = `
    <tr class = "table-data-row">
      <td data-label="Nombres y apellidos">${names} ${lastNames}</td>
      <td data-label="Cédula">${id}</td>
      <td data-label="N° COEMIR">${coemirId}</td>
      <td data-label="Profesión/Ocupación">${profession}</td>
      <td data-label="Universidad">${university}</td>
      <td class="mobile-toggle">
        <i class="fas fa-chevron-down"></i>
      </td>
    </tr>
    `;
    tBodyHTML += htmlRow;
  });
  colegiadosTBody.innerHTML = tBodyHTML;
}
