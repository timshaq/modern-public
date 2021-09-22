export default function () {

    const ACTIVE_CLASS = 'mob-open';
    
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchOpen = document.getElementById('search-open');
    const searchClose = document.getElementById('search-close');

    searchOpen.addEventListener("click", function() {
        searchForm.classList.add(ACTIVE_CLASS);
        searchInput.focus();
    })
    searchClose.addEventListener("click", function() {
            searchForm.classList.remove(ACTIVE_CLASS)
    })




    
    function disableScroll() {
        html.style.overflowX = 'hidden';
        html.style.overflowY = 'hidden';
    };

    function enableScroll() {
        html.style.overflowX = 'hidden';
        html.style.overflowY = 'scroll';
    };

    function closeEl(el) {
        el.classList.remove(ACTIVE_CLASS);
        enableScroll();
    }

    function openEl(el) {
        el.classList.add(ACTIVE_CLASS);
        disableScroll();
    }
    const burger = document.getElementById('burger');
    const mobMenu = document.getElementById('mob-menu');
    const navClose = document.getElementById('nav-close');

    burger.addEventListener('click', function() {
        openEl(mobMenu);
    })
    navClose.addEventListener('click', function() {
        closeEl(mobMenu);
    })
	
}