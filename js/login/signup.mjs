const userName = document.getElementById("username2");
const usernameError = document.getElementById("username2Error");
const email = document.getElementById("email2");
const emailError = document.getElementById("email2Error");
const password = document.getElementById("password2");
const passwordError = document.getElementById("password2Error");
const showPw1 = document.getElementById("showPw2");

export function signUp(noroffBaseUrl, e) {
  e.preventDefault();
  if (validateLength(userName.value, 5) === true) {
    usernameError.classList.replace("d-flex", "d-none");
  } else {
    usernameError.classList.replace("d-none", "d-flex");
  }

  if (validateUsername(userName.value) === true) {
    usernameError.classList.replace("d-flex", "d-none");
  } else {
    usernameError.classList.replace("d-none", "d-flex");
  }

  if (validateEmail(email.value) === true) {
    emailError.classList.replace("d-flex", "d-none");
  } else {
    emailError.classList.replace("d-none", "d-flex");
  }

  if (validateLength(password.value, 6) === true) {
    passwordError.classList.replace("d-flex", "d-none");
  } else {
    passwordError.classList.replace("d-none", "d-flex");
  }

  if (
    validateLength(userName.value, 5) === true &&
    validateEmail(email.value) === true &&
    validateLength(password.value, 8) === true
  ) {
    const bodyData = {
      name: userName.value,
      email: email.value,
      password: password.value,
    };

    submitRegistration(bodyData, noroffBaseUrl).then((res) => {
      console.log(res);
      if (res.errors) {
        document.querySelector(
          "#signupError"
        ).innerHTML = `<h5>${res.errors[0].message}</h5>`;
      } else {
        document.querySelector(
          ".signup-form"
        ).innerHTML = `<h3>You are successfully registered</h3>`;
        setTimeout(() => {
          location.reload();
        }, 3000);
      }
    });
  }
}

function validateLength(value, len) {
  if (value.trim().length >= len) {
    return true;
  } else {
    return false;
  }
}
function validateUsername(userName) {
  const regEx = /^[a-zåøæA-ZÅØÆÑ_]{5,40}$/;
  const patternMatches = regEx.test(userName);
  return patternMatches;
}

function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9._%+-]+@(stud\.noroff|noroff)\.no$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

async function submitRegistration(bodyData, noroffBaseUrl) {
  const res = await fetch(noroffBaseUrl + "/social/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  return res.json();
}

showPw1.addEventListener("click", function () {
  if (showPw1.checked) {
    document.getElementById("password2").type = "text";
  } else {
    document.getElementById("password2").type = "password";
  }
});
