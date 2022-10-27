const fetchAPI = async (typeRecipe, mode, type, word) => {
  try {
    const endPoint = `https://www.${typeRecipe}.com/api/json/v1/1/${mode}.php?${type}=${word}`;
    const response = await fetch(endPoint);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export default fetchAPI;
