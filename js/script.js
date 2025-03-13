// ------------------------------------------------------------- //
// ------------------------- Max Date -------------------------- //
// ------------------------------------------------------------- //

// https://stackoverflow.com/questions/32378590/set-date-input-fields-max-date-to-today
datePickerId.max = new Date().toISOString().split("T")[0];

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
function saveFormData() {
  // Get all input elements from the acquirer-1 fieldset
  const inputs = document.querySelectorAll('#formUser input');

  // Create an object to store the form data
  const formData = {};

  // Loop through each input and save its value
  inputs.forEach(input => {
      // For radio buttons, only save if checked
      if (input.type === 'radio') {
          if (input.checked) {
              formData[input.name] = input.id;
          }
      } else {
          // For text inputs, save the value
          formData[input.name] = input.value;
      }
  });

  // Save the form data to localStorage
  localStorage.setItem('Real-NS-Tax-Form', JSON.stringify(formData));
}

// Function to load form data from localStorage
function loadFormData() {
  // Get the saved form data from localStorage
  const savedData = localStorage.getItem('NSFormData');

  // If there's no saved data, exit the function
  if (!savedData) return;

  // Parse the saved data
  const formData = JSON.parse(savedData);

  // Get all input elements from the acquirer-1 fieldset
  const inputs = document.querySelectorAll('#formUser input');

  // Loop through each input and set its value from the saved data
  inputs.forEach(input => {
      if (input.type === 'radio') {
          // For radio buttons, check if the ID matches the saved value
          if (formData[input.name] === input.id) {
              input.checked = true;
          }
      } else if (input.name in formData) {
          // For text inputs, set the value
          input.value = formData[input.name];
      }
  });
}

// Function to attach event listeners to all form inputs
function setupFormPersistence() {
  // Get all input elements from the acquirer-1 fieldset
  const inputs = document.querySelectorAll('#formUser input');

  // Add change event listener to each input
  inputs.forEach(input => {
      input.addEventListener('input', saveFormData);
      // For radio buttons, also listen for the change event
      if (input.type === 'radio') {
          input.addEventListener('change', saveFormData);
      }
  });

  // Load saved form data when the page loads
  loadFormData();
}

// Initialize form persistence when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', setupFormPersistence);