document.addEventListener("DOMContentLoaded", function () {
    const circleNodes = document.querySelectorAll(".circle-node");

    // Log all circle nodes to ensure they are detected
    console.log("Circle Nodes:", circleNodes);

    // Smooth scroll on circle-node click
    circleNodes.forEach(node => {
        node.addEventListener("click", function () {
            const targetId = node.getAttribute("data-scroll");
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                console.log(`Scrolling to: ${targetId}`);
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            } else {
                console.error(`Target section not found for: ${targetId}`);
            }
        });
    });
});
