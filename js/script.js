$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });
     
    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init("RdBc-vctuUc_J-ZIe");

        emailjs.sendForm('service_gd2myqm', 'template_1vosqdj', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Form Submitted Successfully,Thankyou Visit Again");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Form Submission Failed! Try Again");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Abinash Sharma";
            $("#favicon").attr("href", "./assets/images/Tababhi.webp");
        }
        else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/abnslogo.webp");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Python Development", "Content Creation", "Technical Support" , "Cloud Technologies", "Artificial Intelligence", "XR Technologies"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->
// ================= FETCH DATA =================

async function fetchData(type = "skills") {
    try {
        let response;

        if (type === "skills") {
            response = await fetch("skills.json");
        } else {
            response = await fetch("./projects/projects.json");
        }

        if (!response.ok) throw new Error("Failed to fetch data");

        return await response.json();

    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


// ================= PROJECTS =================

function showProjects(projects) {

    const container = document.querySelector("#work .box-container");
    if (!container || !projects) return;

    const isProjectsPage = window.location.pathname.includes("/projects");
    const isHomePage = !isProjectsPage;

    const isMobileProject = window.innerWidth <= 768;

    // 🔥 PROJECT LIMIT
    const PROJECT_LIMIT = isMobileProject ? 4 : 7;

    let html = "";

    projects
        .filter(project => project.category !== "android")
        .forEach((project, index) => {

            if (isHomePage && index >= PROJECT_LIMIT) return;

            html += `
            <div class="box tilt">
                <img draggable="false"
                     src="./assets/images/projects/${project.image}.png"
                     alt="${project.name}" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.name}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.desc}</p>
                        <div class="btns">
                            <a href="${project.links.view}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                            <a href="${project.links.code}" class="btn" target="_blank">
                                Code <i class="fas fa-code"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>`;
        });

    container.innerHTML = html;

    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }
}


// ================= CERTIFICATIONS =================

function getCertifications() {
    return fetch("certifications.json")
        .then(res => res.json())
        .catch(err => {
            console.error("Error loading certifications:", err);
            return [];
        });
}

function showCertifications(certificates) {

    const container = document.querySelector(".cert-container");
    if (!container || !certificates) return;

    const isCertificationPage = window.location.pathname.includes("/certification");
    const isHomePage = !isCertificationPage;

    const isMobileCert = window.innerWidth <= 768;

    // 🔥 CERTIFICATION LIMIT
    const CERT_LIMIT = isMobileCert ? 3 : 6;

    let html = "";

    certificates.forEach((cert, index) => {

        if (isHomePage && index >= CERT_LIMIT) return;

        html += `
        <div class="grid-item cert-card ${cert.category}">
            <div class="box tilt">
                <img src="./assets/images/certifications/${cert.image}.png" alt="${cert.name}">
                <div class="content">
                    <div class="tag"><h3>${cert.name}</h3></div>
                    <div class="desc">
                        <p>${cert.desc}</p>
                        <div class="btns">
                            <a href="${cert.link}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    });

    container.innerHTML = html;

    if ($.fn.isotope) {
        const $grid = $('.cert-container').isotope({
            itemSelector: '.cert-card',
            layoutMode: 'fitRows'
        });

        if ($('#cert-filters').length) {
            $('#cert-filters').on('click', 'button', function () {
                $('#cert-filters button').removeClass('is-checked');
                $(this).addClass('is-checked');
                const filterValue = $(this).attr('data-filter');
                $grid.isotope({ filter: filterValue });
            });
        }
    }

    if (typeof VanillaTilt !== "undefined") {
        VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });
    }
}


// ================= LOAD DATA =================

fetchData().then(data => showSkills(data));
fetchData("projects").then(data => showProjects(data));
getCertifications().then(data => showCertifications(data));


// ================= DISABLE DEVELOPER MODE =================

document.onkeydown = function (e) {
    if (e.keyCode == 123) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 67) return false;
    if (e.ctrlKey && e.shiftKey && e.keyCode == 74) return false;
    if (e.ctrlKey && e.keyCode == 85) return false;
};
// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
    var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/685bce4bee661a190cce8ac5/1iuj9rmab';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat


/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

//dark mode particle
function updateParticlesColor(color) {
  if (window.pJSDom && window.pJSDom.length > 0) {
    let pJS = window.pJSDom[0].pJS;
    pJS.particles.color.value = color;
    pJS.particles.line_linked.color = color;
    pJS.fn.particlesRefresh();
  }
}

// 🌗 Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.querySelector("#darkmode-toggle");
  const body = document.body;

  // Apply dark mode
  function setDarkMode(enabled) {
    if (enabled) {
      body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
      toggleSwitch.checked = true;
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
      toggleSwitch.checked = false;
    }
  }

  // Load saved preference on page load
  setDarkMode(localStorage.getItem("dark-mode") === "enabled");

  // Watch for toggle changes
  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", () => {
      setDarkMode(toggleSwitch.checked);
    });
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const username = "abinasharma001";

  // Updated selectors for new layout
  const profileContainer = document.querySelector("#profile");
  const reposContainer = document.querySelector("#repos");
  const readmeContainer = document.querySelector("#readme");

  // Fetch GitHub Profile
  const profileRes = await fetch(`https://api.github.com/users/${username}`);
  const profile = await profileRes.json();

  profileContainer.innerHTML = `
    <img src="${profile.avatar_url}" alt="${profile.name}" class="avatar" />
    <h2>${profile.name || profile.login}</h2>
    <p>${profile.bio || "No bio available"}</p>
    <p>👥 ${profile.followers} followers • ${profile.following} following</p>
    <p>📂 ${profile.public_repos} public repos</p>
    <a href="${profile.html_url}" target="_blank" class="btn">View Profile</a>
  `;

  // Fetch Repositories
  const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
  const repos = await reposRes.json();

reposContainer.innerHTML = repos
  .slice(0, 6)
  .map(
    (repo) => `
      <div class="repo-card fade-in">
        <h3><a href="${repo.html_url}" target="_blank">${repo.name}</a></h3>
        <p>${repo.description || "No description"}</p>
        <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</p>
      </div>
    `
  )
  .join("");

  // Fetch README
  const readmeRes = await fetch(`https://raw.githubusercontent.com/${username}/${username}/main/README.md`);
  const readmeText = await readmeRes.text();

  const converter = new showdown.Converter();
  const readmeHTML = converter.makeHtml(readmeText);

  readmeContainer.innerHTML = `<div class="fade-in">${readmeHTML}</div>`;
  // --- PATCH for Snake Animation in README ---
  setTimeout(() => {
    const imgs = readmeContainer.querySelectorAll("img");

    imgs.forEach(img => {
      if (img.src.includes("github-contribution-grid-snake")) {
        img.setAttribute("loading", "lazy");
        img.style.width = "100%"; 
        img.style.maxWidth = "700px";
        img.style.display = "block";
        img.style.margin = "20px auto"; 
      }
    });
  }, 500);
});
  function showLoader() {
    const loader = document.getElementById("loader");
    loader.style.display = "flex";

    // Disable body scrolling & clicks
    document.body.style.pointerEvents = "none";

    // Hide after GIF duration (4s)
    setTimeout(() => {
      hideLoader();
    }, 4000);
  }

  function hideLoader() {
    const loader = document.getElementById("loader");
    loader.style.display = "none";

    // Re-enable clicks & scrolling
    document.body.style.pointerEvents = "auto";
  }

  // Show loader when clicking buttons/links
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("click", () => {
      showLoader();
    });
  });

// scrollanimate
