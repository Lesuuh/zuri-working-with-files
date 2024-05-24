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

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const hasErrors = validateForm();

  if (hasErrors) {
    return;
  }

  const formData = {
    firstname: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    othernames: document.getElementById("othernames").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    gender: document.getElementById("gender").value,
  };

  try {
    // sending the data to the server
    const response = await fetch("/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    // if the response is not ok
    if (!response.ok) {
      // and if the data object contains the errors
      if (data.errors) {
        console.log(data.errors);
        // set the error message to its respective span tag
        Object.keys(data.errors).forEach((key) => {
          const span = document.getElementById(`${key}-error`);
          span.textContent = data.errors[key];
        });
      } else {
        console.error("error", data);
      }
    } else {
      console.log({ data: data });
        alert("Form submitted successfully and its been sent to database");
      // clear the form field
      form.reset();
      // clearing the errors if the response is now ok
      document.querySelectorAll(".error").forEach((span) => {
        span.textContent = "";
      });
    }
  } catch (error) {
    console.error("Error", error);
  }
});
