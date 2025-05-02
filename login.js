// Tab switching
function showTab(tab) {
  document.getElementById('loginFormDiv').style.display = (tab === 'login') ? 'block' : 'none';
  document.getElementById('signupFormDiv').style.display = (tab === 'signup') ? 'block' : 'none';
  document.getElementById('loginTab').classList.toggle('active', tab === 'login');
  document.getElementById('signupTab').classList.toggle('active', tab === 'signup');
  // Clear errors on tab switch
  document.getElementById('loginError').textContent = '';
  document.getElementById('signupError').textContent = '';
}

// Password show/hide
function togglePassword(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (input.type === "password") {
    input.type = "text";
    btn.innerHTML = "&#128064;"; // open eye
  } else {
    input.type = "password";
    btn.innerHTML = "&#128065;"; // closed eye
  }
}

// Dummy localStorage "users" for demo
let users = JSON.parse(localStorage.getItem('users')) || {};

function handleSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  const signupError = document.getElementById('signupError');

  if (!name || !email || !password || !confirmPassword) {
    signupError.textContent = "All fields are required.";
    return false;
  }
  if (password.length < 8) {
    signupError.textContent = "Password must be at least 8 characters long.";
    return false;
  }
  if (password !== confirmPassword) {
    signupError.textContent = "Passwords do not match.";
    return false;
  }
  if (users[email]) {
    signupError.textContent = "User already exists. Please log in.";
    showTab('login');
    return false;
  }
  users[email] = { name, email, password };
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('user', JSON.stringify({ name, email }));
  // window.location.href = "div.html";
  signupError.textContent = "Registration successful! Please log in.";
  showTab('login');
  return false;
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;
  const loginError = document.getElementById('loginError');

  if (!users[email]) {
    loginError.textContent = "No account found with this email. Please sign up first.";
    return false;
  }
  if (users[email].password !== password) {
    loginError.textContent = "Login failed. Please check your credentials.";
    return false;
  }
  // If found, log in
  localStorage.setItem('user', JSON.stringify({ name: users[email].name, email }));
  // window.location.href = "div.html";
  loginError.textContent = "Login successful!";
  return false;
}

// Google Sign-In (works for both new and existing users)
window.onload = function() {
  google.accounts.id.initialize({
    client_id: "62132248350-0glmrvicu47pltakq9mgt643f5ee7rvv.apps.googleusercontent.com",
    callback: function(response) {
      const data = parseJwt(response.credential);
      // Save as both user and in users list for demo
      users[data.email] = { name: data.name, email: data.email, password: "" };
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify({ name: data.name, email: data.email }));
      // window.location.href = "div.html";
      document.getElementById('loginError').textContent = "Google sign-in successful!";
    },
    cancel_on_tap_outside: false
  });
  google.accounts.id.renderButton(
    document.querySelector(".g_id_signin"),
    { theme: "outline", size: "large" }
  );
};

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
document.addEventListener('DOMContentLoaded', function() {
  const signupPassword = document.getElementById('signupPassword');
  const bar = document.getElementById('passwordStrengthBar');
  const barContainer = document.getElementById('passwordStrengthContainer');
  
  if (signupPassword && bar && barContainer) {
    // Show/hide bar on input
    signupPassword.addEventListener('input', function() {
      const val = signupPassword.value;
      if (val.length > 0) {
        barContainer.style.display = 'block';
        const {percent, color} = getStrengthBar(val);
        bar.style.width = percent;
        bar.style.background = color;
      } else {
        barContainer.style.display = 'none';
        bar.style.width = '0%';
      }
    });

    // Hide bar when field loses focus and is empty
    signupPassword.addEventListener('blur', function() {
      if (signupPassword.value.length === 0) {
        barContainer.style.display = 'none';
        bar.style.width = '0%';
      }
    });

    // Optional: Show bar on focus if value exists
    signupPassword.addEventListener('focus', function() {
      if (signupPassword.value.length > 0) {
        barContainer.style.display = 'block';
      }
    });
  }
});

function getStrengthBar(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {percent: "25%", color: "#d32f2f"};
  } else if (score === 3 || score === 4) {
    return {percent: "60%", color: "#fbc02d"};
  } else {
    return {percent: "100%", color: "#388e3c"};
  }
}
document.addEventListener('DOMContentLoaded', function() {
  const signupPassword = document.getElementById('signupPassword');
  const bar = document.getElementById('passwordStrengthBar');
  const barContainer = document.getElementById('passwordStrengthContainer');
  
  if (signupPassword && bar && barContainer) {
    signupPassword.addEventListener('input', function() {
      const val = signupPassword.value;
      if (val.length > 0) {
        barContainer.style.display = 'block';
        const {percent, color} = getStrengthBar(val);
        bar.style.width = percent;
        bar.style.background = color;
      } else {
        barContainer.style.display = 'none';
        bar.style.width = '0%';
      }
    });
    signupPassword.addEventListener('blur', function() {
      if (signupPassword.value.length === 0) {
        barContainer.style.display = 'none';
        bar.style.width = '0%';
      }
    });
    signupPassword.addEventListener('focus', function() {
      if (signupPassword.value.length > 0) {
        barContainer.style.display = 'block';
      }
    });
  }
});

function getStrengthBar(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) {
    return {percent: "25%", color: "#d32f2f"};
  } else if (score === 3 || score === 4) {
    return {percent: "60%", color: "#fbc02d"};
  } else {
    return {percent: "100%", color: "#388e3c"};
  }
}
function validatePassword(password) {
  // Returns true if password meets all criteria
  const pattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=\S+$).{8,}$/;
  return pattern.test(password);
}
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('signupPassword');
  const errorDiv = document.getElementById('signupError'); // Or create a new div for password errors

  passwordInput.addEventListener('input', function() {
    const pw = passwordInput.value;
    if (pw.length === 0) {
      errorDiv.textContent = '';
    // } else if (!validatePassword(pw)) {
    //   errorDiv.textContent =
    //     "Password must be at least 8 characters, have uppercase and lowercase letters, a number, a special character, and no spaces.";
    // } else {
      errorDiv.textContent = '';
    }
  });
});
document.addEventListener('DOMContentLoaded', function() {
  const passwordInput = document.getElementById('signupPassword');
  const spaceError = document.getElementById('passwordSpaceError');

  // Prevent space on keypress
  passwordInput.addEventListener('keydown', function(e) {
    if (e.key === ' ') {
      e.preventDefault();
      spaceError.textContent = "Spaces are not allowed in the password.";
    } else {
      spaceError.textContent = "";
    }
  });

  // Prevent spaces on paste
  passwordInput.addEventListener('input', function(e) {
    if (/\s/.test(passwordInput.value)) {
      passwordInput.value = passwordInput.value.replace(/\s/g, '');
      spaceError.textContent = "Spaces are not allowed in the password.";
    } else {
      spaceError.textContent = "";
    }
  });
});

// window.location.href = "div_1.html";
// // After successful login
// localStorage.setItem('isLoggedIn', 'true');
// window.location.href = "div_1.html";
// localStorage.removeItem('isLoggedIn');
// window.location.href = "login.html";

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('signupFormDiv');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // --- Add your validation here if needed ---
    // For example:
    // const name = document.getElementById('signupName').value.trim();
    // const identifier = document.getElementById('signupIdentifier').value.trim();
    // const password = document.getElementById('signupPassword').value;
    // const confirmPassword = document.getElementById('signupConfirmPassword').value;
    // if (!name || !identifier || !password || !confirmPassword) {
    //   // show error
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   // show error
    //   return;
    // }
    // --- End of validation ---

    // If validation passes, redirect:
    window.location.href = "div_1.html";
  });
});


