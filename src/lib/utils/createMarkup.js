export function createLi(data) {
  return data.map(({name}) => `<li class="categorie-items">${name}</li>`).join('');
}

export function createMarkup(data) {
  return data.map(
    ({ title, preview, description }) => `
  <li class="popular-item">
      <img src="${preview}" class="popular-img"/>
    <div class="popular-text-wrapper">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  </li>`
  ).join("");
}
