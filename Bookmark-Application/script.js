//Listen when form is submitted
document.getElementById('form').addEventListener('submit', saveBookmark);

//Functions
function saveBookmark(e) {
  //form values
  var siteName = document.getElementById('websiteName').value;
  var siteUrl = document.getElementById('websiteURL').value;

  if (!validateInput(siteName, siteUrl)) {
    return false;
  }
  var bookmarkList = {
    name: siteName,
    url: siteUrl
  }

  //checking if bookmarks are empty and adding bookmarks
  if (localStorage.getItem('bookmarks') === null) {
    var bookmarks = [];
    bookmarks.push(bookmarkList);
    //Saving to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  } else {
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //adding bookmark to array
    bookmarks.push(bookmarkList);
    //set back to storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  }
  //fetch bookmarks again
  fetchBookmarks();
  document.getElementById('form').reset();
  //preventing default behaviour
  e.preventDefault();
}


//deleting bookmarks
function deleteBookmark(url) {
  //getting local bookmarks
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // find url
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url == url) {
      bookmarks.splice(i, 1);
    }
  }
  //set back to storage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  //fetch bookmarks again
  fetchBookmarks();
}



//fetching bookmarks
function fetchBookmarks() {
  //get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  //displaying bookmarks
  var bookmarksDisplay = document.getElementById('boomarkTabs');
  bookmarksDisplay.innerHTML = '';
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksDisplay.innerHTML += "<div class='card purple  accent-4 white-text '> <h4>" + name +
      " <a class='btn waves-effect waves-light blue lighten-1' target='_blank' href='" + url + "'>Visit</a>" +
      " <a class='btn waves-effect waves-light red lighten-1' href='#' onclick='deleteBookmark(\"" + url + "\")'>Remove</a></h4></div>";

  }
}

function validateInput(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert("Please check. One or more text field is empty!");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!siteUrl.match(regex)) {
    alert("Invalid URL entered.")
    return false;
  }


  return true;
}