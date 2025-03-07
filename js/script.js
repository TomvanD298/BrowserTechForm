// https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today
datePickerId.max = new Date().toISOString().split("T")[0];

document.querySelectorAll("#pagina-selectie a").forEach(link => {
    link.addEventListener("click", function () {
      document.querySelectorAll("#pagina-selectie a").forEach(a => a.removeAttribute("aria-current"));
      this.setAttribute("aria-current", "page");
    });
  });