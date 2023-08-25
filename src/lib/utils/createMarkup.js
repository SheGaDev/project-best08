export function createLi(data) {
  return data.map(({ name }) => `<li class="categorie-items"><a href="#">${name}</a></li>`).join('');
}

export function createMarkup(data) {
  return data
    .map(
      ({ title, preview, description, _id }) => `
  <li class="popular-item">
      <a href="" recipe-id="${_id}">
      <img src="${preview}" class="popular-img"/>
    <div class="popular-text-wrapper">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
    </a>
  </li>`
    )
    .join('');
}
