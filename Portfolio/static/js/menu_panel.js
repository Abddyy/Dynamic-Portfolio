document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id$='-section']");
    const sidebarMenuLinks = document.querySelectorAll(".menu-ticket .menu-link");
    const overlayMenuLinks = document.querySelectorAll(".menu-overlay .menu-link");
    const menuOverlay = document.getElementById("menuOverlay");
    const menuButton = document.getElementById("menuButton");
    const closeButton = document.getElementById("closeButton");

    // IntersectionObserver for desktop sidebar active links
    const sectionMap = {};
    sidebarMenuLinks.forEach(link => {
        const targetId = link.getAttribute("href").substring(1);
        sectionMap[targetId] = link;
    });

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                sidebarMenuLinks.forEach(link => link.classList.remove("active"));
                const currentLink = sectionMap[entry.target.id];
                currentLink.classList.add("active");
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Open overlay menu on small screens
    menuButton.addEventListener("click", () => {
        menuOverlay.classList.add("show");
    });

    // Close overlay menu
    closeButton.addEventListener("click", () => {
        menuOverlay.classList.remove("show");
    });

    // Close overlay menu when clicking on an item and scroll to the section
    overlayMenuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // Scroll to the target section smoothly
            targetSection.scrollIntoView({ behavior: "smooth" });

            // Close the overlay menu smoothly after a short delay
            setTimeout(() => {
                menuOverlay.classList.remove("show");
            }, 10); // Adjust delay time if needed for a smoother effect
        });
    });
});
