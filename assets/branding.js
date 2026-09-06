(() => {
  const replacements = [
    [/Nare & Philippine/g, "M&M"],
    [/Nare and Philippine/g, "M&M"],
    [/NARE & PHILIPPINE/g, "M&M"],
    [/Nare%20%26%20Philippine/g, "M%26M"],
  ];

  const replaceBrand = (value) => replacements.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), value);

  const updateBranding = () => {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    let node = walker.nextNode();

    while (node) {
      textNodes.push(node);
      node = walker.nextNode();
    }

    textNodes.forEach((textNode) => {
      const updatedValue = replaceBrand(textNode.nodeValue);
      if (updatedValue !== textNode.nodeValue) textNode.nodeValue = updatedValue;
    });

    document.querySelectorAll("[aria-label], [alt], [href]").forEach((element) => {
      ["aria-label", "alt", "href"].forEach((attribute) => {
        const value = element.getAttribute(attribute);
        if (!value) return;
        const updatedValue = replaceBrand(value);
        if (updatedValue !== value) element.setAttribute(attribute, updatedValue);
      });
    });
  };

  updateBranding();
  new MutationObserver(updateBranding).observe(document.body, { childList: true, subtree: true });
})();