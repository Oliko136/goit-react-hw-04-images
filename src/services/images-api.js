const API_KEY = '30297294-1e452dfa1ea91adc237806f59'

export function fetchImages(query, page) {
    return fetch(`https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => response.json());
}