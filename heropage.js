
    function renderNavRight() {
      const navRight = document.getElementById('navRight');
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        // Use Google profile picture if available, else generate avatar
        const avatar = user.picture ||
          `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || "U")}&background=0D47A1&color=fff&rounded=true`;
        navRight.innerHTML = `
          <div class="profile-menu" style="position: relative; display: inline-block;">
            <img src="${avatar}" alt="Profile" class="profile-pic" id="profilePic" style="width:36px;height:36px;border-radius:50%;object-fit:cover;vertical-align:middle;cursor:pointer;">
            <div class="dropdown-menu" id="dropdownMenu" style="display:none;position:absolute;right:0;top:44px;background:#fff;min-width:160px;box-shadow:0 8px 24px rgba(0,0,0,0.12);border-radius:8px;z-index:1001;padding:0.5rem 0;text-align:left;">
              <div class="dropdown-header" style="padding:0.75rem 1.25rem;font-weight:600;color:#003366;border-bottom:1px solid #f0f0f0;">
                ${user.name || user.email || "Account"}
              </div>
              <button onclick="logout()" class="dropdown-logout" style="width:100%;background:none;border:none;color:#d32f2f;font-size:1rem;padding:0.75rem 1.25rem;text-align:left;cursor:pointer;border-radius:0 0 8px 8px;transition:background 0.2s;">Logout</button>
            </div>
          </div>
        `;
        // Toggle dropdown on click
        document.getElementById('profilePic').onclick = function(e) {
          e.stopPropagation();
          const menu = document.getElementById('dropdownMenu');
          menu.style.display = (menu.style.display === "block") ? "none" : "block";
        };
        // Hide dropdown when clicking outside
        document.addEventListener('click', function() {
          const menu = document.getElementById('dropdownMenu');
          if (menu) menu.style.display = "none";
        });
      } else {
        navRight.innerHTML = `<a href="login.html" class="sign-in-btn">Sign In</a>`;
      }
    }
  
    function logout() {
      localStorage.removeItem('user');
      window.location.href = "login.html";
    }
  
    window.addEventListener('DOMContentLoaded', renderNavRight);
  