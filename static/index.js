document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const img = document.getElementById("logo");
  const navigation = document.getElementById("navigation");

  const anchor = document.getElementById("graphic");
  const rect = anchor.getBoundingClientRect();
  const anchorX = rect.left + rect.width / 2;
  const anchorY = rect.top + rect.height / 2;

  const button = document.getElementById("image");
  const email = document.getElementById("email");

  button.addEventListener("click", function () {
    button.classList.add("animate");
    email.classList.add("disable");

    setTimeout(() => {
      button.classList.remove("animate");
      email.classList.remove("disable");
    }, 1000);
  });

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const moveX = -(anchorX - mouseX);
    const moveY = -(anchorY - mouseY);

    anchor.style.transform = `translate(${moveX / 25}px, ${
      moveY / 25
    }px) scaleX(-1) scale(1.7)`;
  });

  applyCardHoverEffects(
    "#left-card",
    "#middle-card",
    "60",
    "#right-card",
    "60"
  );
  applyCardHoverEffects(
    "#middle-card",
    "#left-card",
    "-60",
    "#right-card",
    "60"
  );
  applyCardHoverEffects(
    "#right-card",
    "#middle-card",
    "-60",
    "#left-card",
    "-60"
  );

  hidePreloader(preloader, img, navigation);
  smoothScroll();
});

function hidePreloader(preloader, img, navigation) {
  if (preloader) {
    setTimeout(function () {
      preloader.classList.add("hidden");
      img.style.opacity = "1";
      navigation.style.opacity = "1";

      setTimeout(function () {
        preloader.style.display = "none";
        document.body.style.overflow = "auto";
      }, 500);
    }, 1300);
  }
}

function smoothScroll() {
  document.querySelectorAll("nav a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        window.scrollTo({
          top:
            targetElement.offsetTop -
            document.querySelector("nav").offsetHeight / 2,
          behavior: "smooth",
        });
      }
    });
  });
}

function applyCardHoverEffects(mainCard, sideCard1, move1, sideCard2, move2) {
  $(mainCard).hover(
    function () {
      $(this).css("transform", "scale(1.4)");
      $(this).find(".price").css("transform", "scale(1.3)");
      $(this).find(".price").css("color", "rgb(255, 126, 0)");

      $(sideCard1).css("transform", `translateX(${move1}px)`);
      $(sideCard2).css("transform", `translateX(${move2}px)`);
    },
    function () {
      $(this).css("transform", "none");
      $(this).find(".price").css("transform", "none");
      $(this).find(".price").css("color", "#8a8a8a");

      $(sideCard1).css("transform", "none");
      $(sideCard2).css("transform", "none");

      $("#middle-card").css("transform", "scale(1.4)");
    }
  );
}
