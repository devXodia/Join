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
 * This function is used to submit the Form
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const passwordMatching = await resetPassword();
  if (passwordMatching) {
    document.body.classList.add("clicked");
    button.classList.add("clicked");
    await delay(1000);
    form.submit();
    window.location.href = "index.html";
  }
});


/**
 *  This function resets the password
 * @returns if the user is allowed to reset the password or not 
 */
async function resetPassword() {
  let password = document.getElementById("password");
  let confirmedPass = document.getElementById("confirmpassword");
  let error = document.getElementById("error");
  confirmedPass.classList.remove("border-red");
  error.style = "display:none;";
  if (confirmedPass.value == password.value) {
    users[0].password = password.value;
    await setItem("users", JSON.stringify(users));
    return true;
  } else {
    showErrorForReset(confirmedPass, error);
    return false;
  }
}

/**
 * This function shows an error if the password is not matching
 * @param {string} confirmedPass - confirmed password string
 * @param {HTMLElement} error - HTMLElement
 */
function showErrorForReset(confirmedPass, error){
  confirmedPass.classList.add("border-red");
  confirmedPass.value = "";
  error.style = "display:flex;";
}