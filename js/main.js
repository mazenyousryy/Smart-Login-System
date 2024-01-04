var loginEmail = document.querySelector(".login-email");
var loginPassword = document.querySelector(".login-pswrd");
var loginBtn = document.querySelector(".login-a");
var userName = document.querySelector(".username");
var registrationEmail = document.querySelector(".email-registration");
var registrationPassword = document.querySelector(".registration-pass");
var registrationConfirmPassword = document.querySelector(".confirm-pass");
var registrationCreateAccount = document.querySelector(".account-create");
var welcomeHome = document.querySelector(".welcome-msg");

var accountsArr = [];
var currentUser;

if (localStorage.getItem("accounts") !== null) {
    accountsArr = JSON.parse(localStorage.getItem("accounts"));
}

function createAccount() {
    userAccount = {
        username: userName.value,
        email: registrationEmail.value,
        pass: registrationPassword.value,
    };
    accountsArr.push(userAccount);
    localStorage.setItem("accounts", JSON.stringify(accountsArr));
    console.log(accountsArr);
}

// Validation
function validateName() {
    let regex = /^[A-Za-z]{5,}$/;
    return regex.test(userName.value);
}

function validateEmail() {
    let regex = /^[A-Za-z]{1,}[A-Za-z0-9_\-\.]{1,}[a-zA-Z0-9]{1,}(@)(gmail|yahoo|outlook)\.(com)$/;
    return regex.test(registrationEmail.value);
}

function validatePass() {
    let regex = /[a-zA-Z0-9@_#]{8,}$/;
    return regex.test(registrationPassword.value);
}

function confirmPass() {
    return registrationPassword.value === registrationConfirmPassword.value;
}

function isAccountExist() {
    for (let i = 0; i < accountsArr.length; i++) {
        if (registrationEmail.value === accountsArr[i].email) {
            return true;
        }
    }
}

function displayMsg(element, msg) {
    document.querySelector(element).innerHTML = msg;
}

function showPass(passType, iconHide, iconShow) {
    if (passType.type === "password") {
        passType.type = "text";
        document.querySelector(iconShow).classList.replace("d-inline-block", "d-none");
        document.querySelector(iconHide).classList.replace("d-none", "d-inline-block");
    }
}

function hidePass(passType, iconHide, iconShow) {
    if (passType.type === "text") {
        passType.type = "password";
        document.querySelector(iconHide).classList.replace("d-inline-block", "d-none");
        document.querySelector(iconShow).classList.replace("d-none", "d-inline-block");
    }
}

// Login
if (loginPassword !== null) {
    document.querySelector(".show-pass").addEventListener("click", function () {
        showPass(loginPassword, ".hide-pass", ".show-pass");
    });
    document.querySelector(".hide-pass").addEventListener("click", function () {
        hidePass(loginPassword, ".hide-pass", ".show-pass");
    });
}

if (loginBtn !== null) {
    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (loginEmail.value == "" || loginPassword.value == "") {
            displayMsg(".not-exist-msg", "Fill all the inputs to login");
        } else if (localStorage.getItem("accounts") !== null) {
            accountsArr = JSON.parse(localStorage.getItem("accounts"));
            e.preventDefault();
            for (let i = 0; i < accountsArr.length; i++) {
                if (accountsArr[i].email !== loginEmail.value) {
                    displayMsg(".not-exist-msg", "Sorry, this user does not exist");
                } else if (accountsArr[i].email === loginEmail.value) {
                    displayMsg(".not-exist-msg", "");
                    if (accountsArr[i].email === loginEmail.value && accountsArr[i].pass === loginPassword.value) {
                        currentUser = i;
                        localStorage.setItem("currentUser", JSON.stringify(currentUser));
                        displayMsg(".not-exist-msg", "");
                        window.open("home.html", "_self");
                    } else {
                        displayMsg(".not-exist-msg", "Incorrect Email or Password");
                    }
                }
            }
        } else {
            displayMsg(".not-exist-msg", "User does not exist");
        }
    });
}

// Registration
if (registrationPassword !== null) {
    document.querySelector(".show-pass-reg").addEventListener("click", function () {
        showPass(registrationPassword, ".hide-pass-reg", ".show-pass-reg");
    });
    document.querySelector(".hide-pass-reg").addEventListener("click", function () {
        hidePass(registrationPassword, ".hide-pass-reg", ".show-pass-reg");
    });
    document.querySelector(".show-pass-conf").addEventListener("click", function () {
        showPass(registrationConfirmPassword, ".hide-pass-conf", ".show-pass-conf");
    });
    document.querySelector(".hide-pass-conf").addEventListener("click", function () {
        hidePass(registrationConfirmPassword, ".hide-pass-conf", ".show-pass-conf");
    });
}

if (registrationCreateAccount !== null) {
    registrationCreateAccount.addEventListener("click", function (event) {
        if (validateName() === true && validateEmail() === true && validatePass() === true && confirmPass() === true) {
            console.log("Here");
            if (isAccountExist() === true) {
                event.preventDefault();
                displayMsg(".email-registration", `Exist Email, please enter another one`);
            } else if (isAccountExist() !== true) {
                displayMsg(".email-registration", ``);
                createAccount();
                registrationCreateAccount.setAttribute("href", "../index.html");
            }
        } else {
            event.preventDefault();
            if (validateName() !== true) {
                displayMsg(".error-name", `Your Username should be at least 5 characters, accepting uppercase & lowercase letters, space and _`);
            } else if (validateName() === true) {
                displayMsg(".error-name", ``);
            }
            if (validateEmail() !== true) {
                displayMsg(".error-email", `Invalid Email.`);
            } else if (validateEmail() === true) {
                displayMsg(".error-email", ``);
            }
            if (validatePass() !== true) {
                displayMsg(".error-pass", `Your Password must be at least 8 characters, accepting letters, special character (@ or _ or # only) or numbers.`);
            } else if (validatePass() === true) {
                displayMsg(".error-pass", ``);
            }
            if (confirmPass() !== true) {
                displayMsg(".error-confirm", `Unmatched passwords, please re-enter your password to confirm.`);
            } else if (confirmPass() === true) {
                displayMsg(".error-confirm", ``);
            }
        }
    });
}

// Home
if (welcomeHome !== null) {
    accountsContainer = JSON.parse(localStorage.getItem("accounts"));
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    displayMsg(".welcome-msg", `Welcome ${accountsContainer[currentUser].username}`);
}
