const form = document.getElementById("myForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const otherNamesInput = document.getElementById("otherNames");
const emailInput = document.getElementById("email");
const phoneNumberInput = document.getElementById("phoneNumber");
const genderSelect = document.getElementById("gender");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const phoneNumberError = document.getElementById("phoneNumberError");
const genderError = document.getElementById("genderError");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission

  // Reset error messages
  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  phoneNumberError.textContent = "";
  genderError.textContent = "";

  let isValid = true;

  // Validate first name
  if (firstNameInput.value.trim().length < 1) {
    firstNameError.textContent = "First name is required";
    isValid = false;
  } else if (/\d/.test(firstNameInput.value.trim())) {
    firstNameError.textContent = "First name cannot contain numbers";
    isValid = false;
  }

  // Validate last name
  if (lastNameInput.value.trim().length < 1) {
    lastNameError.textContent = "Last name is required";
    isValid = false;
  } else if (/\d/.test(lastNameInput.value.trim())) {
    lastNameError.textContent = "Last name cannot contain numbers";
    isValid = false;
  }

  // Validate email
  if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
    emailError.textContent = "Invalid email format";
    isValid = false;
  }

  // Validate phone number
  if (phoneNumberInput.value.trim().length !== 10) {
    phoneNumberError.textContent = "Phone number must be 10 digits";
    isValid = false;
  }

  // Validate gender
  if (genderSelect.value === "") {
    genderError.textContent = "Gender is required";
    isValid = false;
  }

  if (isValid) {
    const formData = {
      firstName: firstNameInput.value.trim(),
      lastName: lastNameInput.value.trim(),
      otherNames: otherNamesInput.value.trim(),
      email: emailInput.value.trim(),
      phoneNumber: phoneNumberInput.value.trim(),
      gender: genderSelect.value,
    };

    // Submit form data to 'database.json'
    submitFormData(formData);
  }
});

function submitFormData(formData) {
  // Code to submit form data to 'database.json'
  // You can use JavaScript's Fetch API or an AJAX library like Axios
  // For this example, I'll simply log the form data to the console
  console.log("Form Data:", formData);
}
