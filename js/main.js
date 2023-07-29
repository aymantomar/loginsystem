//* Sign in */
var SignUser = document.getElementById("userName");
var SignEmail = document.getElementById("email");
var SignPassword = document.getElementById("password");
var MessageContainer = document.getElementById("msg");
var SignInBtn = document.getElementById("login");
var showPass = document.getElementById("showPassword");
var showPassIcon = document.querySelector("#showPassword i");

console.log(showPassIcon);

// console.log("xxxxxxxxxxxxxxxxxx", SignUser, SignEmail, SignPassword, SignInBtn);

var userArr = [];

if (localStorage.getItem("user") != null) {
  userArr = JSON.parse(localStorage.getItem("user"));
}

if (SignInBtn !== null) {
  SignInBtn.addEventListener(`click`, function () {
    if (
      SignUser.value === "" ||
      SignEmail.value === "" ||
      SignPassword === ""
    ) {
      MessageContainer.innerHTML = "All Inputs is required";
      MessageContainer.classList.add("text-danger", "text-center");
    }
    if (emailAlready() == false) {
      MessageContainer.innerHTML = "Email is have already";
      MessageContainer.classList.add("text-danger", "text-center");
    } else if (validUserName() && validEmailName() && validPassword()) {
      CreateUser();
    }
  });
}

if (showPass !== null) {
  showPass.addEventListener("click", function () {
    const type =
      SignPassword.getAttribute("type") === "password" ? "text" : "password";
    SignPassword.setAttribute("type", type);
    showPassIcon.classList.toggle("view-password");
  });
}

function CreateUser() {
  var user = {
    userName: SignUser.value,
    userEmail: SignEmail.value,
    userPassword: SignPassword.value,
  };
  userArr.push(user);
  localStorage.setItem("user", JSON.stringify(userArr));
  ClrData();
  setTimeout(() => {
    MessageContainer.innerHTML = "Success";
    MessageContainer.classList.add("text-success", "text-center");
    MessageContainer.classList.remove("text-danger");
  }, 4000);
  window.location = "../loginsystem/index.html";
}

function ClrData() {
  SignUser.value = "";
  SignEmail.value = "";
  SignPassword.value = "";
}

function emailAlready() {
  for (let i = 0; i < userArr.length; i++) {
    if (SignEmail.value.toLowerCase() == userArr[i].userEmail.toLowerCase()) {
      return false;
    }
  }
}

function validUserName() {
  var regex = /^[a-zA-Z]+$/g;
  var signUser = SignUser.value;
  if (regex.test(signUser)) {
    MessageContainer.innerHTML = "Success";
    MessageContainer.classList.add("text-success", "text-center");
    MessageContainer.classList.remove("text-danger");
    return true;
  } else {
    MessageContainer.innerHTML = "Invalid User Name";
    MessageContainer.classList.add("text-danger", "text-center");
    MessageContainer.classList.remove("text-success");
    return false;
  }
}

function validEmailName() {
  var regex =
    /^[a-zA-Z0-9.!#$% &’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var signEmail = SignEmail.value;
  if (regex.test(signEmail)) {
    MessageContainer.innerHTML = "Success";
    MessageContainer.classList.add("text-success", "text-center");
    MessageContainer.classList.remove("text-danger");
    return true;
  } else {
    MessageContainer.innerHTML = "Invalid Email Address";
    MessageContainer.classList.add("text-danger", "text-center");
    MessageContainer.classList.remove("text-success");
    return false;
  }
}
/*
Minimum eight characters, at least one letter and one number:-
*/

function validPassword() {
  var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  var signPassword = SignPassword.value;
  if (regex.test(signPassword)) {
    MessageContainer.innerHTML = "Success";
    MessageContainer.classList.add("text-success", "text-center");
    MessageContainer.classList.remove("text-danger");
    return true;
  } else {
    MessageContainer.innerHTML = "Invalid Password ( 8 character )";
    MessageContainer.classList.add("text-danger", "text-center");
    MessageContainer.classList.remove("text-success");
    return false;
  }
}
//* End sign in */

//** Login in */

var email = document.getElementById("Lemail");
var password = document.getElementById("Lpassword");
var loginBtn = document.getElementById("Llogin");
var Message = document.getElementById("LStatusLogin");

if (JSON.parse(localStorage.getItem("user")) !== null) {
  var UserAccess = JSON.parse(localStorage.getItem("user"));
}

// console.log(email, password, loginBtn, Message);

if (loginBtn !== null) {
  loginBtn.addEventListener("click", function () {
    login();
  });
}

function login() {
  if (email.value == " " && password.value == " ") {
    Message.innerHTML = "All input is required";
    Message.classList.add("text-danger", "text-center");
  } else {
    checkMail();
  }
}

function checkMail() {
  for (let i = 0; i < UserAccess.length; i++) {
    if (
      email.value === UserAccess[i].userEmail &&
      password.value === UserAccess[i].userPassword
    ) {
      Message.innerHTML = "Login Successfully";
      Message.classList.remove("text-danger");
      Message.classList.add("text-success", "text-center");
      window.location = "../loginsystem/home.html";
    } else if (
      email.value != UserAccess[i].userEmail &&
      password.value != UserAccess[i].userPassword
    ) {
      Message.innerHTML = "Incorrect Email or Password";
      Message.classList.add("text-danger", "text-center");
    }
  }
}

//* End Login in */

//* Home */

var msg = document.getElementById("Welcome");
var logoutBtn = document.getElementById("logOut");

for (let i = 0; i < UserAccess.length; i++) {
  msg.innerHTML = `Welcome , ${UserAccess[i].userName.toLowerCase()}`;
  msg.classList.add("text-center", "text-white");
}

if (logoutBtn !== null) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("user");
    window.location = "../loginsystem/index.html";
  });
}
//* End Home */
