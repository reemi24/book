// Selectors
var bookmarkForm = document.getElementById("bookmarkForm");
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var bookmarkList = document.getElementById("bookmarkList");
var errorModal = document.getElementById("errorModal");
var bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
function isValidUrl(url) {
    var regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\/?$/;
    return regex.test(url);
}
bookmarkForm.onsubmit = function () {
    var name = siteName.value;
    var url = siteUrl.value;

    while (name.startsWith(" ")) {
        name = name.substring(1);
    }
    while (name.endsWith(" ")) {
        name = name.substring(0, name.length - 1);
    }
    while (url.startsWith(" ")) {
        url = url.substring(1);
    }
    while (url.endsWith(" ")) {
        url = url.substring(0, url.length - 1);
    }

    if (name.length < 3 || !isValidUrl(url)) {
        showModal();
        return false;
    }
    if (!url.toLowerCase().includes(name.toLowerCase())) {
        alert("The site URL must contain the site name!");
        return false;
    }

    bookmarks.push({ name: name, url: url });
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();

    bookmarkForm.reset();
    return false;
};

function displayBookmarks(filtered) {
    if (!filtered) filtered = bookmarks;

    bookmarkList.innerHTML = "";

    for (var i = 0; i < filtered.length; i++) {
        var bookmark = filtered[i];
        bookmarkList.innerHTML += `
         <tr>
    <td>${i + 1}</td>
    <td>${bookmark.name}</td>
    <td>
        <a href="${bookmark.url}" target="_blank" class="visit-btn btn-success">
            <span class="btn-icon px-"><i class="fa-solid fa-eye pe-2"></i></span> Visit
        </a>
    </td>
    <td>
        <button class="delete-btn btn-danger" onclick="deleteBookmark(${i})">
            <span class="btn-icon"><i class="fa-solid fa-trash-can"></i></span> Delete
        </button>
    </td>
</tr>
        `;
    }
}
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    displayBookmarks();
}

searchInput.oninput = function () {
    var query = searchInput.value.toLowerCase();

    if (query.length >= 3) {

        var filtered = bookmarks.filter(function (bookmark) {
            return (
                bookmark.name.toLowerCase().startsWith(query) ||
                bookmark.url.toLowerCase().startsWith(query)
            );
        });
        displayBookmarks(filtered);
    } else {
        displayBookmarks();
    }
};
function showModal() {
    errorModal.classList.add("active");
}

function closeModal() {
    errorModal.classList.remove("active");
}
