const form = document.getElementById("user-form");
const firstNameError = document.getElementById("firstname-error");
const lastNameError = document.getElementById("lastname-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");
const genderError = document.getElementById("gender-error");

function validateForm() {
  let error = false;

  firstNameError.textContent = "";
  lastNameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  genderError.textContent = "";

  // firstname
  const firstname = document.getElementById("firstname").value;
  if (firstname === "") {
    error = true;
    firstNameError.textContent = "Please enter your firstname";
  } else if (firstname.length < 2) {
    error = true;
    firstNameError.textContent = "firstname should be more thatn 2 letter";
  }

  // lastname
  const lastname = document.getElementById("lastname").value;
  if (lastname === "") {
    error = true;
    lastNameError.textContent = "Please enter your lastname";
  } else if (lastname.length < 2) {
    error = true;
    lastNameError.textContent = "Lastname should be more than 2 letters";
  }

  // email
  const email = document.getElementById("email").value;
  if (email === "") {
    error = true;
    emailError.textContent = "Please enter your Email";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    error = true;
    emailError.textContent = "Please enter a valid email";
  }

  // phone
  const phone = document.getElementById("phone").value;
  if (phone === "") {
    error = true;
    phoneError.textContent = "Please enter your phone number";
  } else if (phone.length < 1) {
    error = true;
    phoneError.textContent = "Please enter your phone number";
  }

  // gender
  const gender = document.getElementById("gender").value;
  if (gender === "") {
    error = true;
    genderError.textContent = "Please select your gender";
  }

  return error;
}

form.addEventListener("submit", (e) => {
  //   e.preventDefault();
  validateForm();
});
