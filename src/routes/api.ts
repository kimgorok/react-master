export function fetchHome() {
  return fetch(`https://disney_api.nomadcoders.workers.dev/characters`).then(
    (response) => response.json()
  );
}

export function fetchDetail(id: string | undefined) {
  return fetch(
    `https://disney_api.nomadcoders.workers.dev/characters/${id}`
  ).then((response) => response.json());
}
