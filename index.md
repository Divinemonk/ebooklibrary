---
layout: default
title: Free eBook Library
---

# Free eBook Library

Welcome to our Free eBook Library, where you can find a collection of downloadable eBooks on various topics.

## Table of Contents

{% for category in site.data.categories %}
### {{ category.name }}

{% for book in category.books %}
#### [{{ book.title }}]({{ book.cover | relative_url }})

[![{{ book.title }}]({{ book.cover | relative_url }})]({{ book.cover | relative_url }})

Author: {{ book.author }}

Description: {{ book.description }}

[Download {{ book.title }}]({{ book.download_link | relative_url }})

{% endfor %}
{% endfor %}

<script>
function searchBooks() {
  var input = document.getElementById("searchInput");
  var filter = input.value.toUpperCase();
  var books = document.getElementsByClassName("book");
  
  for (var i = 0; i < books.length; i++) {
    var title = books[i].getElementsByTagName("h4")[0].innerText;
    if (title.toUpperCase().indexOf(filter) > -1) {
      books[i].style.display = "";
    } else {
      books[i].style.display = "none";
    }
  }
}
</script>

## Search

<input type="text" id="searchInput" onkeyup="searchBooks()" placeholder="Search for book titles...">

