let users = [];
let username = document.getElementById("name");
let email = document.getElementById("email");
let confirm = document.getElementById("confirmpassword");
let password = document.getElementById("password");
let signup = document.getElementById("signup");

const form = document.getElementById("forgot-form");
const button = document.querySelector(".fly-in-button");
const overlay = document.querySelector(".overlay");

/**
 * This function is used as a delay
 * @param {number} ms wished delay in ms
 * @returns Promise
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * This Eventlistener is used to register User
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const passwordMatching = await addUser();
  if (passwordMatching) {
    document.body.classList.add("clicked");
    button.classList.add("clicked");
    await delay(1000);
    form.submit();
    window.location.href = "index.html";
  }
});

/**
 * This function checks if the User is giving the needed information for a account.
 * @returns returns if the condition for User Registriation are met or not
 */
async function addUser() {
  confirm.classList.remove("border-red");
  error.style = "display: none;";
  if (
    username.value.length >= 1 &&
    email.value.length >= 1 &&
    password.value.length >= 1 &&
    password.value == confirm.value
  ) {
    setUser();
    return true;
  } else {
    showError();
    return false;
  }
}

/**
 * This function creates the User and saves the Data in the Backend.
 */
async function setUser() {
  users.push({
    name: username.value,
    email: email.value,
    password: password.value,
  });
  await setItem("users", JSON.stringify(users));
  resetForm();
}

/**
 * This function is used to desplay an error if the passwords are not matching
 */
function showError() {
  confirm.classList.add("border-red");
  error.style = "display: flex;";
  confirm.value = "";
}

/**
 * This function resets the Form 
 */
function resetForm() {
  username.value = "";
  email.value = "";
  confirm.value = "";
  password.value = "";
  signup.disabled = false;
}
