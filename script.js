// --- NEW: PEXELS API CONFIGURATION ---
const PEXELS_API_KEY = 'yy626vOjK7RjgKgjAn4SL2JZLC2v23KaWtnLdPlQM9i9MEhUGG7y0ikv'; // Get one at pexels.com/api
const videoElement = document.getElementById("featuredVideo");

async function loadAestheticVideo() {
    try {
        const query = "rain tokyo street";

        const response = await fetch(
            `https://api.pexels.com/videos/search?query=${query}&per_page=1&orientation=landscape`,
            {
                headers: { Authorization: PEXELS_API_KEY }
            }
        );

        const data = await response.json();

        if (data.videos && data.videos.length > 0) {
            // Pick the HD file from the list
            const videoFile =
                data.videos[0].video_files.find(file => file.width === 1920) ||
                data.videos[0].video_files[0];

            videoElement.src = videoFile.link;
            videoElement.load();
        }
    } catch (error) {
        console.error("Failed to fetch video:", error);

        // Fallback to a local video if API fails
        videoElement.src = "assets/video.mp4";
    }
}

// Call the function
loadAestheticVideo();


// --- UPDATED: MOUSE EVENTS ---
// We remove the manual color changes so they don't override our beautiful CSS gradients
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        // You can add sounds here later, but leave the colors to the CSS!
    });
});


// --- REST OF YOUR EXISTING CODE ---
// (Keep your Parallax, Sidebar, and IntersectionObserver as they are)


// PARALLAX SCROLL EFFECT
window.addEventListener("scroll", () => {
    const parallax = document.querySelector(".parallax");
    const scrollPosition = window.pageYOffset;

    if (parallax) {
        parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});


// SIDEBAR TOGGLE
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

menuBtn.addEventListener("click", event => {
    event.stopPropagation();
    sidebar.classList.toggle("active");
});


// CLOSE SIDEBAR WHEN CLICK OUTSIDE
document.addEventListener("click", event => {
    if (!sidebar.contains(event.target) && event.target !== menuBtn) {
        sidebar.classList.remove("active");
    }
});


// CLOSE SIDEBAR WITH ESC KEY
document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        sidebar.classList.remove("active");
    }
});


// ARROW KEY NAVIGATION
const sections = document.querySelectorAll("section");
let currentSection = 0;

document.addEventListener("keydown", event => {
    if (event.key === "ArrowDown") {
        currentSection = Math.min(currentSection + 1, sections.length - 1);
        sections[currentSection].scrollIntoView({ behavior: "smooth" });
    }

    if (event.key === "ArrowUp") {
        currentSection = Math.max(currentSection - 1, 0);
        sections[currentSection].scrollIntoView({ behavior: "smooth" });
    }
});


// INTERSECTION OBSERVER FOR VIDEO
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        });
    },
    { threshold: 0.5 }
);

observer.observe(videoElement);


// MOUSE EVENTS FOR PROJECT CARDS
projectCards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        card.style.backgroundColor = "#ccc";
    });

    card.addEventListener("mouseleave", () => {
        card.style.backgroundColor = "#eee";
    });
});


// RESPONSIVE SIDEBAR RESET ON RESIZE
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove("active");
    }
});
