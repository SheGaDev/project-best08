const e={currentUrl:window.location.href,links:document.querySelectorAll(".header-list a, .mobile-menu-list a"),currentHome:document.querySelector("#home-link"),currentMobileHome:document.querySelector("#home-link-mobile")};e.links.forEach(function(r){r.href===e.currentUrl?r.classList.add("current"):r.classList.remove("current")});
//# sourceMappingURL=favorites.d84313dd.js.map
