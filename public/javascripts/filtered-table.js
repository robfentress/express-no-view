var options = {
    valueNames: ['name', 'born'],
    page: 3,
    searchDelay: 750,
    pagination: {
        paginationClass: "pagination",
        outerWindow: 2,
        item: function (values) {
            return `<li><a class='page' onclick='updatePage(${values.page},event)' href="#${values.page}">${values.page}</a></li>`;
        }
    }
};

var userList = new List('users', options);
let timeoutID;

const announcement = document.getElementById('announcement');
const name = document.getElementById('name');
let nameHTML = name.outerHTML;
const born = document.getElementById('born');
let bornHTML = born.outerHTML;
const pagination = document.querySelector(".pagination");

let numRecords = userList.matchingItems.length;
let sort, direction, sortLabel;
let pageNum = 1;


const config = { attributes: true, attributeFilter: ["class"] };
announcement.innerHTML = userList.matchingItems.length + ' records displayed';


userList.on('updated', function () {
    if (numRecords != userList.matchingItems.length) {
        announcement.innerHTML = userList.matchingItems.length + ' records displayed';
        numRecords = userList.matchingItems.length;
    }
});

const updateHistory = function () {
    let documentTitle, queryString;
    let query = [];
    let title = ['Filtered Table'];

    if (sort != null) {
        query.push(`sort=${sort}`, `direction=${direction}`);
        title.unshift(`Sorted ${direction} by ${sortLabel}`);
    }
    if (pageNum != null) {
        query.push(`pageNum=${pageNum}`);
        title.unshift(`Page ${pageNum}`);
    }
    if (query.length > 0) {
        queryString = '?' + query.join('&');
        documentTitle = title.join(' | ');
    }
    document.querySelector('title').innerHTML = documentTitle;
    var urlSplit = (window.location.href).split("?");
    var obj = { Title: documentTitle, Url: urlSplit[0] + queryString };
    history.pushState(obj, obj.Title, obj.Url);
}

const initializePage = function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.has('sort') && urlParams.has('direction')) {
        sort = urlParams.get('sort');
        direction = urlParams.get('direction');
        let order = (direction == 'ascending') ? 'asc' : 'desc';
        userList.sort(sort, { dorder: order });
    }
    if (urlParams.has('pageNum')) {
        pageNum = urlParams.get('pageNum');
        userList.show(options.page * pageNum, options.page);
        document.querySelector('h2').innerHTML = `Page ${pageNum}`;
    }
    announcement.innerHTML = '';
}
//updateHistory();

initializePage();

window.onpopstate = function (e) {
    initializePage();
}

const updateAnnouncement = function (msg, page) {
    announcement.innerHTML = msg;
    if (page) {
        let activeLink = document.querySelector('.active a.page');
        activeLink.setAttribute('aria-current', 'page');
        activeLink.focus();
    }
}

function updatePage(pageN, e) {
    document.querySelector('h2').innerHTML = `Page ${pageN}`;
    timeoutID = setTimeout(updateAnnouncement, 250, `Displaying page ${pageN}`, true);
    pageNum = pageN;
    updateHistory();
    e.preventDefault();
}
const updateSort = function (el, dir) {
    let parent = el.parentNode;
    console.log(el.id);
    if (typeof dir !== 'undefined') {
        direction = dir;
        sort = el.id;
        sortLabel = el.textContent;
        parent.setAttribute('aria-sort', direction);
        timeoutID = setTimeout(updateAnnouncement, 250, `Sorted ${direction} by ${sortLabel}`, false);
    } else {
        parent.removeAttribute('aria-sort');
    }
    console.log(`Sort = ${sort}, Direction = ${direction}, Page # = ${pageNum}`);
    updateHistory();
}
const sortList = function (mutationList, observer) {
    for (const mutation of mutationList) {
        let el = mutation.target;
        if (el.classList.contains('asc')) {
            updateSort(el, 'ascending');
        } else if (el.classList.contains('desc')) {
            updateSort(el, 'descending');
        } else {
            updateSort(el);
        }
        updateHistory();
    }
}
//Update aria-sort of Name heading
const changeNameSort = function (mutationList, observer) {
    sortList(mutationList, observer);
};

//Update aria-sort of Year heading
const changeBornSort = function (mutationList, observer) {
    sortList(mutationList, observer);
};

// Create an observer instance linked to the callback function
const nameObserver = new MutationObserver(changeNameSort);
// Start observing the target node for configured mutations
nameObserver.observe(name, config);

const bornObserver = new MutationObserver(changeBornSort);
bornObserver.observe(born, config);
window.onload = function (e) {
    console.log("loaded");
}
