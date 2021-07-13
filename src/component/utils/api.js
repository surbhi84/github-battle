export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=star:>1+language:${language}&sort=star&order=desc&type=Repositories`
  );
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(endpoint, data.items);
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
