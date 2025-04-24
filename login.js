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
  // Dummy localStorage "users" for demo
  let users = JSON.parse(localStorage.getItem('users')) || {};

  function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value;
    const signupError = document.getElementById('signupError');
    if (users[email]) {
      signupError.textContent = "User already exists. Please log in.";
      showTab('login');
      return false;
    }
    users[email] = { name, email, password };
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify({ name, email }));
    // window.location.href = "div.html";
    return false;
  }

  function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const loginError = document.getElementById('loginError');
    if (!users[email]) {
      loginError.textContent = "No account found with this email. Please sign up first.";
      return false;
    }
    // If found, log in without password (as per your requirement)
    localStorage.setItem('user', JSON.stringify({ name: users[email].name, email }));
    // window.location.href = "div.html";
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
        window.location.href = "div.html";
      }
    });
    google.accounts.id.renderButton(
      document.querySelector(".g_id_signin"),
      { theme: "outline", size: "large" }
    );
  };
  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }