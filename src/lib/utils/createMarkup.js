export function createMarkup(data, propertyName) {
  return data.map(e => `<li class="categorie-items">${e[propertyName]}</li>`).join('');
}
