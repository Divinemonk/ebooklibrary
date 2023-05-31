---
layout: default
title: eBook Library
---

<style>
.search-bar {
  margin-top: 20px;
  text-align: center;
}

.book-list {
  margin-top: 20px;
}

.book {
  margin-bottom: 20px;
}
</style>

# Free eBook Library

Welcome to our Free eBook Library, where you can find a collection of downloadable eBooks on various topics.

## Search

<div class="search-bar">
  <input type="text" id="searchInput" onkeyup="searchBooks()" placeholder="Search for book titles...">
</div>

## Table of Contents

<div class="book-list">
  {% for category in site.data.categories %}
  <h3>{{ category.name }}</h3>
  {% for book in category.books %}
  <div class="book">
    <h4><a href="{{ book.cover | relative_url }}" target="_blank">{{ book.title }}</a></h4>
    <a href="{{ book.cover | relative_url }}" target="_blank">
      <img src="{{ book.cover | relative_url }}" alt="{{ book.title }}" style="max-width: 300px;">
    </a>
    <p>Author: {{ book.author }}</p>
    <p>Description: {{ book.description }}</p>
    <p><a href="{{ book.download_link | relative_url }}">Download {{ book.title }}</a></p>
  </div>
  {% endfor %}
  {% endfor %}
</div>

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
