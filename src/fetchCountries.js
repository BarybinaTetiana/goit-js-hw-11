export function fetchCountries(country) {
    const endPoint = 'https://restcountries.com/v3.1/name';

  return fetch(
    `${endPoint}/${country}?fields=name,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

// const endpoint = 'https://restcountries.com/v3.1/name/{name}';
// const filter = '?fields=name,capital,population,flags,languages';

// export function fetchCountries(name) {
//   return fetch(`${endpoint}${name}${filter}`).then(res => {
//     if (!res.ok) {
//       throw new Error(res.status);
//     }
//     return res.json();
//   });
// }
