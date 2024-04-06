// src/utils/generate-slug.ts
function generateSlug(text) {
  const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const slug2 = normalizedText.replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-").toLowerCase();
  return slug2;
}
var title = "T\xEDtulo com Acentua\xE7\xE3o e S\xEDmbolos @$%";
var slug = generateSlug(title);
console.log(slug);

export {
  generateSlug
};
