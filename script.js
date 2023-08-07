var bookmarkArray = []

// this is run when the page has fully loaded
function init() {
	if (localStorage.getItem("bookmarkJSON") === null) {
		localStorage.setItem("bookmarkJSON", "[]");
	} else {
		addQuickAccessToPage();
	}
	// add event listener to searchbox
	document.getElementById("searchbox").addEventListener("keydown", function(event) {
		if (event.keyCode === 13) {
			search(document.getElementById("searchbox").value);
		}
	});
}

function search(searchQuery) {
	switch (searchQuery.slice(1)) {
		case "!":
			switch (searchQuery.slice(2)) {
				case "!y":
					window.open("https://youtube.com/results?search_query=" + searchQuery.slice(3), "_self");
				break;
				case "!w":
					window.open("https://wikipedia.org/wiki/Special:Search?search=" + searchQuery.slice(3), "_self");
				break;
				case "!r":
					window.open("https://reddit.com/search/?q=" + searchQuery.slice(3), "_self");
				break;
				default:
					window.open("https://duckduckgo.com/?q=" + searchQuery.replace(" ", "+"), "_self");
			}
		break;
		case "r":
			if (searchQuery.slice(2) === "r/") {
				window.open("https://reddit.com/" + searchQuery, "_self")
			}
		break;
		default:
			window.open("https://duckduckgo.com/?q=" + searchQuery.replace(" ", "+"), "_self");
	}
}

function addPageToQuickAccess(url, name) {
	let bookmarkArray = JSON.parse(localStorage.getItem("bookmarkJSON"));
	bookmarkArray.push({"name": name, "url": url});
	localStorage.setItem("bookmarkJSON", JSON.stringify(bookmarkArray));
}

function addQuickAccessToPage() {
	let i = 0;
	let quickAccessBox = document.getElementById("quickaccess-box");
	let bookmarkArray = JSON.parse(localStorage.getItem("bookmarkJSON"))
	bookmarkArray.forEach(element => {
		// this is the main bookmark div
		let quickaccessLinkBox = document.createElement("div");
		quickaccessLinkBox.setAttribute("class", "quickaccess-link");
		quickaccessLinkBox.setAttribute("tr-bookmark-link", element.url);
		quickaccessLinkBox.setAttribute("tr-bookmark-purpose", "link");
		quickaccessLinkBox.setAttribute("onclick", "openBookmark(this)")
		// this is used for animations, mostly
		let quickaccessLinkBackground = document.createElement("div");
		quickaccessLinkBackground.setAttribute("class", "quickaccess-link-background");
		// this is the text displaying the bookmark name
		let quickaccessLinkText = document.createElement("p")
		quickaccessLinkText.setAttribute("class", "quickaccess-link-text");
		quickaccessLinkText.innerHTML = element.name;
		// now add everything into the quickaccessLinkBox
		quickaccessLinkBox.insertBefore(quickaccessLinkBackground, quickaccessLinkBox.firstChild);
		quickaccessLinkBackground.insertBefore(quickaccessLinkText, quickaccessLinkBackground.firstChild);
		// insert the bookmark into the page
		quickAccessBox.insertBefore(quickaccessLinkBox, quickAccessBox.lastChild);
	});
}

function dialog_quickaccess_add_dialog_submit() {
	let bookmarkUrl = document.getElementById("quickaccess-add-dialog-urlinput").value;
	let bookmarkName = document.getElementById("quickaccess-add-dialog-nameinput").value;
	if (bookmarkUrl != "" && bookmarkName != "") {
		document.getElementById("quickaccess-box").innerHTML = '<div class="quickaccess-link" onclick="dialog_quickaccess_add_dialog_show()" tr-bookmark-purpose="add-bookmark"><div class="quickaccess-link-background"><img class="quickaccess-link-image" src="assets/plus.png" width=64 height=64><p class="quickaccess-link-text">Add Bookmark</p></div></div>';
		addPageToQuickAccess(bookmarkUrl, bookmarkName);
		addQuickAccessToPage();
	}
	document.getElementById("dialogbox").style.display = "none";
}

function dialog_quickaccess_add_cancel() {
	document.getElementById("quickaccess-add-dialog-urlinput").value = "";
	document.getElementById("quickaccess-add-dialog-nameinput").value = "";
	document.getElementById("dialogbox").style.display = "none";
}

init();

function dialog_quickaccess_add_dialog_show() {
	document.getElementById("dialogbox").style.display = "initial";
}

function openBookmark(htmlElement) {
	window.open(htmlElement.attributes[1].value, "_self");
}
