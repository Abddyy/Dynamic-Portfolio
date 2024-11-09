document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("div[id$='-section']");
    const menuLinks = document.querySelectorAll(".menu-ticket .menu-link");

    // Map section IDs to corresponding menu links
    const sectionMap = {};
    menuLinks.forEach(link => {
        const targetId = link.getAttribute("href").substring(1);
        sectionMap[targetId] = link;
    });

    // IntersectionObserver to detect when a section is in view
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5 // Adjust this to control when a section is considered in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove 'active' class from all links
                menuLinks.forEach(link => link.classList.remove("active"));
                // Add 'active' class to the current section's menu link
                const currentLink = sectionMap[entry.target.id];
                currentLink.classList.add("active");
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
