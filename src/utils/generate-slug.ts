export function generateSlug(text: string): string {
    // Normaliza o texto removendo acentos
    const normalizedText = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Remove caracteres não alfanuméricos exceto espaços, substitui espaços por hífens, e converte para minúsculo
    const slug = normalizedText
        .replace(/[^a-zA-Z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .toLowerCase();

    return slug;
}

// Exemplo de uso:
const title = "Título com Acentuação e Símbolos @$%";
const slug = generateSlug(title);
console.log(slug); // Saída esperada: "titulo-com-acentuacao-e-simbolos"
