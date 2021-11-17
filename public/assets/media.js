const cookies = navigator.cookieEnabled ? parseCookies(document.cookie) : new Map();
const appearance = cookies.get('appearance') || 'midnight';
const xor = {
    encode(str){
        if (!str) return str;
        return encodeURIComponent(str.toString().split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join(''));
    },
    decode(str){
        if (!str) return str;
        return decodeURIComponent(str).split('').map((char, ind) => ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char).join('');
    },
};

Object.defineProperty(document, 'appearance', {
    get() {
        return document.body.getAttribute('data-appearance');
    },
    set(val) {
        return document.body.setAttribute('data-appearance', val);
    },
});

Object.defineProperty(document, 'engine', {
    get() {
        return document.body.getAttribute('data-engine');
    },
    set(val) {
        return document.body.setAttribute('data-engine', val);
    },
});

Object.defineProperty(document, 'page', {
    get() {
        return document.body.getAttribute('data-page');
    },
});

if (localStorage.getItem('__tab_title')) {
    try {
        document.title = atob(decodeURIComponent(localStorage.getItem('__tab_title')));
    } catch(err) {
        console.error('Could not decode storage property "__tab_title" due to invalid codec.');
    };
};

if (localStorage.getItem('__tab_icon')) {
    try {
        document.querySelector('#favicon').href = atob(decodeURIComponent(localStorage.getItem('__tab_icon')));;
    } catch(err) {
        console.error('Could not decode storage property "__tab_icon" due to invalid codec.');
    };
};

switch(document.page) {
    case 'settings':
        settings();
        break;
    case 'gs':
        gs();
        break;
    case 'home':
        home();
};

function settings() {
  
    tab();
    function tab() {
        const input = document.querySelector('.tab input');
        document.querySelector('.tab button[data-action=title]').addEventListener('click', () => {
            if (!input.value) return false;
            changeTitle(input.value);
        });
        document.querySelector('.tab button[data-action=icon]').addEventListener('click', () => {
            if (!input.value) return false;
            changeFavicon(input.value);
        });
    };
    function appearance() {
        let lastSelected = document.querySelector(`.appearance .options li[data-appearance=${document.appearance}]`);
        document.querySelectorAll('.appearance .options li').forEach(node => 
            node.addEventListener('click', () => {
                lastSelected.removeAttribute('data-selected');
                document.appearance = node.getAttribute('data-appearance') || 'midnight';
                node.setAttribute('data-selected', '')
                lastSelected = node;
                document.cookie = `appearance=${document.appearance}`;
            })
        );
        if (lastSelected) lastSelected.setAttribute('data-selected', '');
    };
    function engine() {
        let lastSelected = document.querySelector(`.search-engine .options li[data-engine=${document.engine}]`);
        document.querySelectorAll('.search-engine .options li').forEach(node => {
            node.addEventListener('click', () => {
                lastSelected.removeAttribute('data-selected');
                node.setAttribute('data-selected', '')
                lastSelected = node;
                document.cookie = `engine=${node.getAttribute('data-engine')}`;
            });
        })
        if (lastSelected) lastSelected.setAttribute('data-selected', '');
    };
};



function changeTitle(val = '') {
    document.title = val;
    return localStorage.setItem('__tab_title', encodeURIComponent(btoa(val)));
};  

function changeFavicon(val) {
    const uri = new URL(/^http(s?):\/\//.test(val) ? val : 'http://' + val);
    document.querySelector('#favicon').href = uri.href;
    return localStorage.setItem('__tab_icon', encodeURIComponent(btoa(uri.href)));
};  

