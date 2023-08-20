function getTheme() {
    return localStorage.getItem("theme") ?? "light";
}
const themes = ["light", "dark"]
function changeTheme(theme) {
    if(!theme || !themes.includes(theme)) throw new Error("No 'light' or 'dark' specified");
    localStorage.setItem("theme", theme);
    return theme;
}
function toggleFavoriteItem(recipe) {
    const items = JSON.parse(localStorage.getItem("favorites"));
    if (!items || !items.length) localStorage.setItem("favorites", [recipe])
    if(items.some(item => item._id === recipe._id)) {
        items.filter((item, i) => {
            if (item._id === recipe._id) items.slice(i, 1)
        })
    } else items.push(recipe);
    localStorage.setItem("favorites", items);
}
function getFavoriteItems(){
    return localStorage.getItem("favorites");
}
export {
    getTheme,
    changeTheme,
    toggleFavoriteItem,
    getFavoriteItems
}