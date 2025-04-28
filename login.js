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
