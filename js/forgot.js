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
 * This function sumbits the form to send a Email to the User.
 * 
 */
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const emailMatching = await sendMail();
  if (emailMatching) {
    document.body.classList.add("clicked");
    button.classList.add("clicked");
    await delay(1000);
    form.submit();
  }
});

/**
 * This Eventlistener is used to check if the User is typing in a existing email
 * @returns existing mail true or not
 */
async function sendMail() {
  let email = document.getElementById("email");
  email.classList.remove("border-red");
  error.style = "display:none;";
  if (users[0].email == email.value) {
    return true;
  } else {
    email.classList.add("border-red");
    email.value = "";
    error.style = "display:flex;";
    return false;
  }
}
