// ------------------------------------------------------------- //
// ------------------------- Max Date -------------------------- //
// ------------------------------------------------------------- //

// https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today
datePickerId.max = new Date().toISOString().split("T")[0];


// ------------------------------------------------------------- //
// ---------------------- Huidige pagina ----------------------- //
// ------------------------------------------------------------- //
document.querySelectorAll("#pagina-selectie a").forEach(link => {
    link.addEventListener("click", function () {
      document.querySelectorAll("#pagina-selectie a").forEach(a => a.removeAttribute("aria-current"));
      this.setAttribute("aria-current", "page");
    });
  });

// ------------------------------------------------------------- //
// ------------------------- Save Form ------------------------- //
// ------------------------------------------------------------- //
// Function to save form data to localStorage
// Dit stukje code is medemogelijk gemaakt door Chris.

function saveFormData() {
    const inputs = document.querySelectorAll('#formUser input, #formUser select, #formUser textarea');
    const formData = {};

    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (input.checked) {
                formData[input.name] = input.nextElementSibling ? input.nextElementSibling.textContent : input.id;
            }
        } else if (input.type === 'checkbox') {
            formData[input.name] = input.checked ? "✔" : "✘";
        } else {
            formData[input.name] = input.value;
        }
    });

    localStorage.setItem('Real-NS-Tax-Form', JSON.stringify(formData));
}

// ------------------------------------------------------------- //
// ------------------------- Load data ------------------------- //
// ------------------------------------------------------------- //
// Function to load form data from localStorage
function loadFormData() {
    const savedData = localStorage.getItem('Real-NS-Tax-Form');
    if (!savedData) return;

    const formData = JSON.parse(savedData);
    const inputs = document.querySelectorAll('#formUser input, #formUser select, #formUser textarea');

    inputs.forEach(input => {
        if (input.type === 'radio') {
            if (formData[input.name] === (input.nextElementSibling ? input.nextElementSibling.textContent : input.id)) {
                input.checked = true;
            }
        } else if (input.type === 'checkbox') {
            input.checked = formData[input.name] === "✔";
        } else if (input.name in formData) {
            input.value = formData[input.name];
        }
    });
}

// Function to attach event listeners to form inputs
function setupFormPersistence() {
    const inputs = document.querySelectorAll('#formUser input, #formUser select, #formUser textarea');
    
    inputs.forEach(input => {
        input.addEventListener('input', saveFormData);
        if (input.type === 'radio' || input.type === 'checkbox') {
            input.addEventListener('change', saveFormData);
        }
    });

    loadFormData();
}

// ------------------------------------------------------------- //
// ------------------------ Generate PDF ----------------------- //
// ------------------------------------------------------------- //
// Gemaakt met hulp van GPT, het werkt alleen niet omdat het een NPM pakketje is, dus ik heb het geprobeerd
// het te verwerken voor dit. het werkt soort van.


// Function to generate a PDF with form data
function generatePdf() {
    const savedData = JSON.parse(localStorage.getItem('Real-NS-Tax-Form'));
    if (!savedData) {
        alert("No data to generate PDF!");
        return;
    }

    // Create a new printable section
    let pdfContent = document.createElement('div');
    pdfContent.style.fontFamily = "Arial, sans-serif";
    pdfContent.style.padding = "20px";

    pdfContent.innerHTML = `<h2>NS Erfbelasting 2023</h2>`;
    
    // Format and add each field to the PDF content
    Object.keys(savedData).forEach(key => {
        pdfContent.innerHTML += `<p><b>${key}:</b> ${savedData[key]}</p>`;
    });

    // Set up the options to remove margins and improve layout
    const options = {
        margin: [-20, 10, 100, 10],  // Adjust margins if needed
        filename: "NS-Erfbelasting-2023.pdf",
        html2canvas: {
            scale: 2,               // Higher scale for better quality
            logging: true           // Enable logging to troubleshoot rendering issues
        }
    };

    // Convert this dynamically created content to a PDF with custom options
    html2pdf().from(pdfContent).set(options).save();
}


// ------------------------------------------------------------- //
// ------------------------- clear Form ------------------------ //
// ------------------------------------------------------------- //
// Function to clear the form and localStorage
function clearFormData() {
    localStorage.removeItem('Real-NS-Tax-Form'); // Remove saved form data
    document.querySelector('#formUser').reset(); // Reset the form
    window.location.href = "index.html"; // Redirect to home page
}

// Initialize form persistence on DOM load
document.addEventListener('DOMContentLoaded', setupFormPersistence);



// ------------------------------------------------------------- //
// ---------------------- verkrijger knop ---------------------- //
// ------------------------------------------------------------- //


// -------- knop verkrijger 1

document.getElementById("showBtn1").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById("acquirer-2").style.display = "block";
});

// -------- knop verkrijger 2

document.getElementById("showBtn2").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById("acquirer-3").style.display = "block";
});

document.getElementById("hideBtn2").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById("acquirer-2").style.display = "none";
});


// -------- knop verkrijger 3

document.getElementById("hideBtn3").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default link behavior
    document.getElementById("acquirer-3").style.display = "none";
});