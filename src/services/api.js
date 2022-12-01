import axios from 'axios';

async function fetchData(search, page) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${search
      .split(' ')
      .join(
        '+'
      )}&page=${page}&key=30059252-fce911be355cbdd889b3b7d8d&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits.map(img => {
    return {
      id: img.id,
      webformatURL: img.webformatURL,
      largeImageURL: img.largeImageURL,
    };
  });
}

export { fetchData };
