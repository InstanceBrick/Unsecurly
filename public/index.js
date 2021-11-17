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

function changeTitle(val = '') {
    document.title = val;
    return localStorage.setItem('__tab_title', encodeURIComponent(btoa(val)));
};  

function changeFavicon(val) {
    const uri = new URL(/^http(s?):\/\//.test(val) ? val : 'http://' + val);
    document.querySelector('#favicon').href = uri.href;
    return localStorage.setItem('__tab_icon', encodeURIComponent(btoa(uri.href)));
};  
