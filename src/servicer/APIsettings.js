function fetchImages(searchQuery, page) {
  const API_KEY = '25707657-f823508cd497e26effdead719';

  return fetch(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return response;
  });
}

export default fetchImages;
