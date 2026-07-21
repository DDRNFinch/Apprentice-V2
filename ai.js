window.AiService = {
  isConfigured: false,
  async improveStatement(text) {
    if (!text || !text.trim()) throw new Error("Add a statement before using AI assistance.");
    return text.trim();
  }
};
