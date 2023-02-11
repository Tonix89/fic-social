const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const password = document.getElementById("password");
const passwordError = document.getElementById("passwordError");

export function login(noroffBaseUrl, e) {
  e.preventDefault();

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
    validateEmail(email.value) === true &&
    validateLength(password.value, 8) === true
  ) {
    const bodyData = {
      email: email.value,
      password: password.value,
    };

    goLogin(bodyData, noroffBaseUrl).then((res) => {
      console.log(res);
      if (res.errors) {
        document.querySelector(
          "#loginError"
        ).innerHTML = `<h5>${res.errors[0].message}</h5>`;
      } else {
        localStorage.setItem("nat", res.accessToken);
        window.location.href = "home.html";
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

function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9._%+-]+@(stud\.noroff|noroff)\.no$/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

async function goLogin(bodyData, noroffBaseUrl) {
  const res = await fetch(noroffBaseUrl + "/social/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });
  return res.json();
}
