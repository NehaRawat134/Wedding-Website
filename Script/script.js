//Navbar
window.addEventListener('scroll', function () {
  const navbar = document.querySelector('.custom-navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// Hero Section Elements
const reservationBtn = document.getElementById("reservationBtn");
const modal = document.getElementById("reservationModal");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("reservationForm");
const errorMsg = document.getElementById("errorMsg");

// Open Modal safely
if (reservationBtn) {
    reservationBtn.addEventListener("click", function(e) {
        e.preventDefault();
        modal.style.display = "block";
    });
}

// Close Modal via 'x' button
if (closeBtn) {
    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });
}

// Close when clicking outside modal box
window.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Form Validation and Submission Logic
if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        // Retrieve field values dynamically upon submission
        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let date = document.getElementById("date").value.trim(); 

        // Reset previous error text
        errorMsg.textContent = "";

        // 1. Name Check
        if (name === "") {
            errorMsg.textContent = "Name is required.";
            return;
        }

        // 2. Email Check
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;
        if (!emailPattern.test(email)) {
            errorMsg.textContent = "Enter a valid email.";
            return;
        }

        // 3. Phone Check
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(phone)) {
            errorMsg.textContent = "Enter a valid 10-digit phone number.";
            return;
        }

        // 4. Date Check
        if (date === "") {
            errorMsg.textContent = "Please select a date for your reservation.";
            return;
        }

        // Success execution
        alert("Reservation Submitted Successfully!");
        form.reset();
        modal.style.display = "none";
    });
}

// // Story-card
// $(document).ready(function () {

//   $(".story-card").click(function () {
//     let text = $
//       (this).find("h6").text();
//     alert("You clicked: " + text);
//   });
// });

// Our Love Story
$(document).ready(function () {

  // Hover effect using class (better performance)
  $(".story-card").hover(
    function () {
      $(this).addClass("active-card");
    },
    function () {
      $(this).removeClass("active-card");
    }
  );

});

// Blink Image Function (improved)
function blinkImage(img) {

  // Prevent multiple rapid clicks stacking animation
  if (img.classList.contains("blink")) return;

  img.classList.add("blink");

  setTimeout(() => {
    img.classList.remove("blink");
  }, 900);
}

// Hero Wrapper
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".blinkable").forEach(img => {
    img.addEventListener("click", function () {

      this.classList.remove("blink");

      // restart animation trick
      void this.offsetWidth;

      this.classList.add("blink");
    });
  });

});


// Counting Down
const targetDate = new Date();
targetDate.setDate(targetDate.getDate() + 46);
targetDate.setHours(targetDate.getHours() + 12);

function updateCountdown() {
  const now = new Date();
  const difference = targetDate - now;

  if (difference <= 0) {
    document.getElementById('months').innerText = "00";
    document.getElementById('days').innerText = "00";
    document.getElementById('hours').innerText = "00";
    document.getElementById('minutes').innerText = "00";
    document.getElementById('seconds').innerText = "00";
    return;
  }

  // Calculations for months, days, hours, minutes and seconds
  const totalSeconds = Math.floor(difference / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);

  // Approximate calculation for months/days display
  const months = Math.floor(totalHours / (24 * 30.44));
  const days = Math.floor((totalHours / 24) % 30.44);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  // Injecting text with leading zeros
  document.getElementById('months').innerText = String(months).padStart(2, '0');
  document.getElementById('days').innerText = String(days).padStart(2, '0');
  document.getElementById('hours').innerText = String(hours).padStart(2, '0');
  document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
  document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
}

// Run immediately and update every second
updateCountdown();
setInterval(updateCountdown, 1000);


// Our Services
const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  card.classList.add("hide");
  observer.observe(card);
});


// Stats Section
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const duration = 2000; 

  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    let startTime = null;

    const updateCounter = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = currentTime - startTime;

      const progressRatio = Math.min(progress / duration, 1);

      const currentCount = Math.floor(progressRatio * target);

      counter.innerText = currentCount;

      if (progressRatio < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = target; 
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observerOptions = {
    root: null,
    threshold: 0.2 
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  counters.forEach(counter => observer.observe(counter));
});


// Testimonial Section
const track = document.querySelector(".marquee-track");

track.innerHTML += track.innerHTML;

const marquee = document.querySelector(".marquee");

marquee.addEventListener("mouseenter", () => {
  track.style.animationPlayState = "paused";
});

marquee.addEventListener("mouseleave", () => {
  track.style.animationPlayState = "running";
});


//  Contact Section 
document.getElementById('messageForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Stop standard page reload

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('emailAddress').value;

  if (firstName && lastName && email) {
    alert(`Thank you, ${firstName}! Your message has been sent successfully.`);
    this.reset(); // Clear the form input elements
  }
});

// Map section
document.addEventListener("DOMContentLoaded", function () {
  const box = document.querySelector(".contact-box");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        box.classList.add("show");
      }
    });
  });

  observer.observe(box);
});

// Footer Section
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Message sent successfully!");
});


// ////////////////////////////////////////////////////////////////////////////////////////////////////////

// About-Section

document.addEventListener("DOMContentLoaded", () => {
  const heroContent = document.querySelector(".hero .content");
  const aboutSection = document.querySelector(".about-section");

  heroContent.style.opacity = 0;
  aboutSection.style.opacity = 0;

  heroContent.style.transform = "translateY(20px)";
  aboutSection.style.transform = "translateY(20px)";

  setTimeout(() => {
    heroContent.style.transition = "1s ease";
    heroContent.style.opacity = 1;
    heroContent.style.transform = "translateY(0)";
  }, 300);

  setTimeout(() => {
    aboutSection.style.transition = "1s ease";
    aboutSection.style.opacity = 1;
    aboutSection.style.transform = "translateY(0)";
  }, 600);
});

// /////////////////////////////////////////////////////////////////////////////////////////////////

// Wedding Plans

// Gallery
function openLightbox(element) {
  const imgSrc = element.querySelector('img').getAttribute('src');

  document.getElementById('lightboxImage').setAttribute('src', imgSrc);

  const myModal = new bootstrap.Modal(document.getElementById('lightboxModal'));
  myModal.show();
}

// //////////////////////////////////////////////////////////////////////////////////////////////

// Contact Us

document.addEventListener("DOMContentLoaded", function () {
  const heroContent = document.querySelector('.hero-banner .container');
  heroContent.style.opacity = 0;
  heroContent.style.transition = "opacity 1s ease-in-out";

  setTimeout(() => {
    heroContent.style.opacity = 1;
  }, 100);
});

// Contact Section

document.addEventListener("DOMContentLoaded", () => {
  const contactCards = document.querySelectorAll(".contact-card");

  contactCards.forEach(card => {
    card.addEventListener("click", (e) => {
      if (e.target.tagName === 'A') return;

      const targetLink = card.getAttribute("data-link");
      if (targetLink) {
        if (card.getAttribute("target") === "_blank") {
          window.open(targetLink, '_blank');
        } else {
          window.location.href = targetLink;
        }
      }
    });
  });
});

// Contact form

document.getElementById('contactForm').addEventListener('submit', function(event) {
      event.preventDefault(); // Stop page reload
      
      // Simple validation check
      if (!this.checkValidity()) {
        event.stopPropagation();
        alert('Please fill out all fields correctly.');
        this.classList.add('was-validated');
        return;
      }

      // Collect data values
      const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('emailAddress').value,
        message: document.getElementById('textareaMessage').value
      };

      // Mock submit action
      console.log('Form Submitted Successfully:', formData);
      alert(`Thank you, ${formData.firstName}! Your message has been sent.`);
      
      // Reset form
      this.reset();
      this.classList.remove('was-validated');
    });