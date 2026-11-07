
/* =================================
   MUAMUVA WEBSITE
   JavaScript Functionality
================================= */

const modal = document.getElementById("authModal");

const form = document.getElementById("authForm");

const title = document.getElementById("modalTitle");

const subtitle = document.getElementById("modalSub");

const submitBtn = document.getElementById("submitBtn");

const switchText = document.getElementById("switchText");

const message = document.getElementById("formMessage");

const password = document.getElementById("password");

let isSignup = false;


// Current Year

document.getElementById("year").textContent =
    new Date().getFullYear();


// Open Login / Signup Modal

function openAuth(signup = false) {

    isSignup = signup;

    title.textContent = signup
        ? "Create Your Account"
        : "Welcome Back";

    subtitle.textContent = signup
        ? "Join the Muamuva community."
        : "Log in to continue to your Muamuva space.";

    submitBtn.textContent = signup
        ? "Create Account"
        : "Log In";

    switchText.innerHTML = signup
        ? 'Already have an account? <a href="#" id="switchMode">Log In</a>'
        : 'New to Muamuva? <a href="#" id="switchMode">Create an Account</a>';

    message.textContent = "";

    modal.classList.add("open");

    document.getElementById("email").focus();

    document.getElementById("switchMode")
        .addEventListener("click", function(event) {

            event.preventDefault();

            openAuth(!isSignup);

        });

}


// Close Modal

function closeAuth() {

    modal.classList.remove("open");

    form.reset();

    message.textContent = "";

    password.type = "password";

    document.getElementById("togglePassword").textContent = "Show";

}


// Navigation Buttons

document.getElementById("loginOpen")
    .addEventListener("click", function() {

        openAuth(false);

    });


document.getElementById("signupOpen")
    .addEventListener("click", function() {

        openAuth(true);

    });


document.getElementById("heroSignup")
    .addEventListener("click", function() {

        openAuth(true);

    });


// Close Button

document.getElementById("closeModal")
    .addEventListener("click", closeAuth);


// Close Modal by Clicking Outside

modal.addEventListener("click", function(event) {

    if (event.target === modal) {

        closeAuth();

    }

});


// Close Modal with Escape Key

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeAuth();

    }

});


// Password Show / Hide

document.getElementById("togglePassword")
    .addEventListener("click", function() {

        const isHidden = password.type === "password";

        password.type = isHidden ? "text" : "password";

        this.textContent = isHidden ? "Hide" : "Show";

    });


// Forgot Password

document.getElementById("forgotLink")
    .addEventListener("click", function(event) {

        event.preventDefault();

        message.textContent =
            "Password recovery requires a backend and email service.";

    });


// Login / Signup Form

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();

    const username = email.split("@")[0] || "Member";


    /*
       FRONTEND DEMO ONLY

       This does not authenticate a real user.
       Real authentication will be implemented
       using Django and a database.
    */


    if (isSignup) {

        message.textContent =
            "Demo registration successful!";

    } else {

        message.textContent =
            "Demo login successful!";

    }


    // Show Dashboard

    setTimeout(function() {

        closeAuth();

        document.querySelector(".hero").style.display = "none";

        document.querySelector(".features").style.display = "none";

        document.querySelector(".contact-section").style.display = "none";

        document.querySelector("footer").style.display = "none";


        document.getElementById("welcomeText").textContent =
            `Hello, ${username}. Welcome to Muamuva!`;


        document.getElementById("dashboard")
            .classList.add("show");


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }, 700);

});


// Logout Function

document.getElementById("logoutBtn")
    .addEventListener("click", function() {

        document.getElementById("dashboard")
            .classList.remove("show");


        document.querySelector(".hero").style.display = "";

        document.querySelector(".features").style.display = "";

        document.querySelector(".contact-section").style.display = "";

        document.querySelector("footer").style.display = "";


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });
