document.addEventListener("DOMContentLoaded", function () {
    const sidebarMenuLinks = document.querySelectorAll(".menu-ticket .menu-link");
    const sections = document.querySelectorAll("div[id$='-section']");
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let activeSectionIndex = 0; // Track the currently active section index
    let decryptionInProgress = false; // Flag to handle multiple clicks gracefully

    // Function for fast decryption effect with random characters before revealing the correct one
    function decryptText(element, speed = 20) { // Faster speed by reducing interval time
        const originalText = element.textContent;
        let currentText = Array(originalText.length).fill(" "); // Start with spaces

        return new Promise(resolve => {
            let index = 0;

            const interval = setInterval(() => {
                if (index < originalText.length) {
                    let cycles = 0;
                    const charInterval = setInterval(() => {
                        if (cycles < 7) { // Reduced cycles for faster effect
                            currentText[index] = characters[Math.floor(Math.random() * characters.length)];
                            element.textContent = currentText.join("");
                            cycles++;
                        } else {
                            // After cycles, reveal the correct character
                            currentText[index] = originalText[index];
                            element.textContent = currentText.join("");
                            clearInterval(charInterval); // Stop individual character cycling
                            index++; // Move to the next character
                        }
                    }, speed); // Faster speed for each random character cycle
                } else {
                    clearInterval(interval);
                    element.textContent = originalText; // Ensure final text is correct
                    resolve();
                }
            }, speed * 2); // Move to the next character after 3 times the character speed
        });
    }

    // Function to decrypt items in range from current section to the target
    function decryptInRange(fromIndex, toIndex, speed) {
        if (decryptionInProgress) return;
        decryptionInProgress = true;

        const itemsToDecrypt = fromIndex < toIndex
            ? Array.from(sidebarMenuLinks).slice(fromIndex + 1, toIndex + 1)
            : Array.from(sidebarMenuLinks).slice(toIndex, fromIndex).reverse();

        itemsToDecrypt.reduce((promise, item) => {
            return promise.then(() => decryptText(item, speed));
        }, Promise.resolve()).then(() => {
            decryptionInProgress = false;
        });
    }

    // Attach click event to each menu item
    sidebarMenuLinks.forEach((link, index) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            if (decryptionInProgress) return;

            const targetId = link.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);
            targetSection.scrollIntoView({ behavior: "smooth" });

            const speed = 10; // Faster speed for decryption effect

            if (index !== activeSectionIndex) {
                decryptInRange(activeSectionIndex, index, speed);
                activeSectionIndex = index;
            }
        });
    });

    // IntersectionObserver to update active section based on scroll
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleSectionIndex = Array.from(sections).indexOf(entry.target);
                if (visibleSectionIndex !== activeSectionIndex) {
                    decryptInRange(activeSectionIndex, visibleSectionIndex, 20);
                    activeSectionIndex = visibleSectionIndex;
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
});
