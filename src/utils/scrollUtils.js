/**
 * Smoothly scrolls to the specified section
 * @param {string} sectionId - The ID of the section to scroll to (without the # symbol)
 */
export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
  }
};

/**
 * Hook up smooth scrolling to all navigation links with hash targets
 */
export const initSmoothScrolling = () => {
  document.addEventListener("click", (e) => {
    // Check if the clicked element is an anchor with a hash
    const target = e.target.closest("a");
    if (target && target.hash && target.hash.startsWith("#")) {
      e.preventDefault();
      const sectionId = target.hash.substring(1); // Remove the # symbol
      scrollToSection(sectionId);
    }
  });
};
