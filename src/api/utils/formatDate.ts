// Sanani formatlash uchun funksiya
export const formatDate = (date: string, locale: string = "uz-UZ"): string => {
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date");
      }
  
      return parsedDate.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };
  
  // Sanani vaqt bilan birga formatlash (ixtiyoriy)
  export const formatDateTime = (date: string, locale: string = "uz-UZ"): string => {
    try {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        throw new Error("Invalid date");
      }
  
      return parsedDate.toLocaleString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date and time:", error);
      return "Invalid Date";
    }
  };