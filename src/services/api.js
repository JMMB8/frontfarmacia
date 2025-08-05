export const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(`http://localhost:3000/productos/search?query=${query}`);
      if (!response.ok) {
        throw new Error("Error fetching search results");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };