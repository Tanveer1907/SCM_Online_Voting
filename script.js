// Function to check if user is logged in and update UI accordingly
  function updateLoginUI() {
    const navRight = document.getElementById('navRight');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (user) {
      // User is logged in, show profile picture
      const userName = user.name || user.email || '1906tanveer@gmail.com';
      const userPic = user.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=0D47A1&color=fff`;
      
      navRight.innerHTML = `
        <div class="profile-container">
          <img src="${userPic}" alt="Profile" class="profile-img">
          <div class="dropdown-menu">
            <div class="user-info">
              <h4>${userName}</h4>
              <p>${user.email || '1906tanveer@gmail.com'}</p>
            </div>
            <a href="div.html">Dashboard</a>
            <a href="#" class="logout" onclick="logout()">Logout</a>
          </div>
        </div>
      `;
    } else {
      // User is not logged in, show sign in button
      navRight.innerHTML = `<a href="login.html" class="sign-in-btn">Sign In</a>`;
    }
    
    // Update "Get Started" button behavior
    const getStartedBtn = document.querySelector('.get-started-btn');
    if (getStartedBtn) {
      getStartedBtn.onclick = function() {
        if (user) {
          window.location.href = "div.html"; // Redirect to main page if logged in
        } else {
          window.location.href = "login.html"; // Redirect to login if not logged in
        }
      };
    }
  }
  
  // Function to handle logout
  function logout() {
    localStorage.removeItem('user');
    window.location.reload(); // Reload the page to update UI
  }
  
  // Run on page load
  window.addEventListener('DOMContentLoaded', updateLoginUI);



// Animate stats
function animateValue(id, start, end, duration) {
  let current = start;
  const stepTime = Math.abs(Math.floor(duration / (end - start)));
  const obj = document.getElementById(id);

  const timer = setInterval(() => {
    current++;
    obj.textContent = current;
    if (current === end) {
      clearInterval(timer);
    }
  }, stepTime);
}

// Scroll to About Us
document.querySelectorAll('a[href^="#about-us"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animate stats on load
window.addEventListener("load", () => {
  animateValue("votes", 0, 10895, 2000);
  animateValue("polls", 0, 342, 2000);
  animateValue("users", 0, 1004, 2000);
});
function handleCredentialResponse(response) {
  const data = parseJwt(response.credential);
  localStorage.setItem('user', JSON.stringify(data));
  window.location.href = "new_voting_page.html"; // Redirect after login
}
function handleManualLogin(event) {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  
  if (name && email && password) {
    localStorage.setItem('user', JSON.stringify({ name, email }));
    window.location.href = "new_voting_page.html"; // Redirect after login
  }
}
function goToLogin() {
  window.location.href = "login.html";
}
function logout() {
  localStorage.removeItem('user');
  window.location.href = "login.html";
}
