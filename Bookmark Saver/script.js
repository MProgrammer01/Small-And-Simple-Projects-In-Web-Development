"use strict";
let bookmarkNameInput = document.getElementById("bookmark-name");
let bookmarkUrlInput = document.getElementById("bookmark-url");
let addBookmarkButton = document.getElementById("add-bookmark");
let bookmarkItemsContainer = document.getElementById("Bookmark-items");
function loadArrayOfBookmarkObjs(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
}
function addBookmark(key) {
    const name = bookmarkNameInput.value.trim();
    const url = bookmarkUrlInput.value.trim();
    if (name === "" || url === "") {
        alert("Please enter both name and URL");
        return;
    }
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        alert("Please enter a valid URL starting with http:// or https://");
        return;
    }
    const items = loadArrayOfBookmarkObjs(key) || [];
    items.push({ name, url });
    localStorage.setItem(key, JSON.stringify(items));
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
    displayBookmarks(key);
}
function displayBookmarks(key) {
    const items = loadArrayOfBookmarkObjs(key) || [];
    bookmarkItemsContainer.innerHTML = "";
    items.forEach((item) => {
        bookmarkItemsContainer.appendChild(createBookmarkItem(item.name, item.url, items, key));
    });
}
function createBookmarkItem(name, url, items, key) {
    const bookmarkItem = document.createElement("div");
    bookmarkItem.className = "bookmark-item";
    const bookmarkName = document.createElement("a");
    bookmarkName.className = "bookmark-name";
    bookmarkName.textContent = name;
    bookmarkName.href = url;
    bookmarkName.target = "_blank";
    const removeBookmarkButton = document.createElement("button");
    removeBookmarkButton.className = "remove-bookmark";
    removeBookmarkButton.textContent = "Remove";
    removeBookmarkButton.addEventListener("click", () => {
        const index = items.findIndex((bookmark) => bookmark.name === name && bookmark.url === url);
        if (index !== -1) {
            deleteBookmarkItem(index, items, key);
        }
    });
    bookmarkItem.appendChild(bookmarkName);
    bookmarkItem.appendChild(removeBookmarkButton);
    return bookmarkItem;
}
function deleteBookmarkItem(index, items, key) {
    items.splice(index, 1);
    localStorage.setItem(key, JSON.stringify(items));
    displayBookmarks(key);
}
addBookmarkButton.addEventListener("click", () => addBookmark("bookmarks"));
window.addEventListener("load", () => displayBookmarks("bookmarks"));
