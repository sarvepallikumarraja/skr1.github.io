/* ==================== NAVBAR & SCROLL ==================== */
$(document).ready(function () {
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
      $('#scroll-top').addClass('active');
    } else {
      $('#scroll-top').removeClass('active');
    }
  });
});

/* ==================== TAB VISIBILITY ==================== */
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Kumararaja S ";
    $("#favicon").attr("href", "/assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "/assets/images/favhand.png");
  }
});

/* ==================== CERTIFICATIONS ==================== */
$(document).ready(function () {

  const $container = $(".cert-container");
  if ($container.length === 0) return;

  const isHomePage = !window.location.pathname.includes("/certification");
  const isMobile = window.innerWidth <= 768;
  const HOME_LIMIT = isMobile ? 3 : 6;

  let $grid = null;

  /* ---------- LOAD NORMAL CERTIFICATES ---------- */
  $.getJSON("./certifications.json", function (data) {

    if (data && data.length) {
      $.each(data, function (i, cert) {

        const categoryClass = cert.category
          ? cert.category.charAt(0).toUpperCase() + cert.category.slice(1)
          : "Others";

        const description = cert.desc || "";

        const card = `
          <div class="grid-item cert-card ${categoryClass}">
            <div class="box">
              <a href="${cert.link}" target="_blank" rel="noopener noreferrer">
                <img
                  src="../assets/images/certifications/${cert.image}.png"
                  alt="${cert.name}"
                  class="cert-img"
                  draggable="false"
                  onerror="this.src='../assets/images/Tababhi.png'"
                />
              </a>
              <div class="cert-info">
                <h3>${cert.name}</h3>
                <p>${description}</p>
                <a href="${cert.link}" class="btn" target="_blank">
                  <i class="fas fa-eye"></i> View Certificate
                </a>
              </div>
            </div>
          </div>
        `;
        $container.append(card);
      });
    }

    /* ---------- LOAD CREDLY BADGES ---------- */
    $.getJSON("../assets/badges.json", function (badges) {

      if (badges && badges.length) {
        $.each(badges, function (i, badge) {

          const card = `
            <div class="grid-item cert-card Credly">
              <div class="box">
                <a href="${badge.url}" target="_blank" rel="noopener noreferrer">
                  <img
                    src="${badge.image}"
                    alt="${badge.name}"
                    class="cert-img"
                    draggable="false"
                    onerror="this.src='../assets/images/Tababhi.png'"
                  />
                </a>
                <div class="cert-info">
                  <h3>${badge.name}</h3>
                  <p>Verified Digital Credential</p>
                  <a href="${badge.url}" class="btn" target="_blank">
                    <i class="fas fa-shield-alt"></i> View Credential
                  </a>
                </div>
              </div>
            </div>
          `;
          $container.append(card);
        });
      }

      /* ---------- INIT ISOTOPE AFTER ALL CARDS LOADED ---------- */
      if ($.fn.isotope) {
        $grid = $container.isotope({
          itemSelector: ".cert-card",
          layoutMode: "fitRows"
        });

        const $filters = $("#filters");

        if ($filters.length) {
          $filters.on("click", "button", function () {
            const filterValue = $(this).attr("data-filter");
            $grid.isotope({ filter: filterValue });

            $filters.find("button").removeClass("is-checked");
            $(this).addClass("is-checked");
          });
        }
      }

      /* ---------- HOME PAGE LIMIT ---------- */
      setTimeout(() => {
        if (isHomePage) {
          $(".cert-card").hide();
          $(".cert-card").slice(0, HOME_LIMIT).show();
        } else {
          $(".cert-card").show();
        }

        if ($grid) $grid.isotope("layout");
      }, 200);

    }).fail(function () {
      console.error("Failed to load badges.json");
    });

  }).fail(function () {
    console.error("Failed to load certifications.json");
  });

});

/* ==================== CHAT WIDGET ==================== */
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
      s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "https://embed.tawk.to/69c337b3f9f0211c36fde7c1/default";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();

/* ==================== SECURITY ==================== */
document.onkeydown = function (e) {
  if (e.keyCode == 123) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 67) return false;
  if (e.ctrlKey && e.shiftKey && e.keyCode == 74) return false;
  if (e.ctrlKey && e.keyCode == 85) return false;
};