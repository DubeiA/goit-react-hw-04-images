const API_KEY = '31092155-fdd6914219543248b658a821f';

export const fetchPictures = (query, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`We don't have pictures with ${query} word`)
    );
  });
};
