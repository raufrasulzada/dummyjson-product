let url = "https://dummyjson.com/products",
  urllimit = "https://dummyjson.com/products/?limit=30";
(listEl = document.querySelector(".list")),
  (productDetailsEl = document.querySelector(".product-details"));

let thisPage = 1;
let limit = 6;

function loadItem() {
  let beginGet = limit * (thisPage - 1);
  let endGet = limit * thisPage - 1;

  document.querySelectorAll(".item").forEach((item, key) => {
    if (key >= beginGet && key <= endGet) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
  listPage();
}

function listPage() {
  let count = Math.ceil(document.querySelectorAll(".item").length / limit);
  document.querySelector(".pagination").innerHTML = "";

  if (thisPage != 1) {
    let prev = document.createElement("li");
    prev.innerText = "PREV";
    prev.setAttribute("onclick", "changePage(" + (thisPage - 1) + ")");
    document.querySelector(".pagination").appendChild(prev);
  }

  for (i = 1; i <= count; i++) {
    let newPage = document.createElement("li");
    newPage.innerText = i;
    if (i == thisPage) {
      newPage.classList.add("active");
    }
    newPage.setAttribute("onclick", "changePage(" + i + ")");
    document.querySelector(".pagination").appendChild(newPage);
  }
  if (thisPage != count) {
    let next = document.createElement("li");
    next.innerText = "NEXT";
    next.setAttribute("onclick", "changePage(" + (thisPage + 1) + ")");
    document.querySelector(".pagination").appendChild(next);
  }
}

function changePage(i) {
  thisPage = i;
  loadItem();
}

fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let products = data.products;

    products.forEach((product) => {
      const productEl = document.createElement("div");
      productEl.classList.add("item");

      productEl.innerHTML = `
      <div class="img">
        <img class="thumbnail" src="${product.thumbnail}" alt="${
        product.title
      }">
      </div>
      <div class="content">
        <div class="title">${product.title}</div>
        <div class="price">Price: $${product.price}</div>
        <div class="discount">Discount: ${product.discountPercentage}%</div>
        <div class="category">Category: ${
          product.category.charAt(0).toUpperCase() + product.category.slice(1)
        }</div>
        <div class="stock">Stock: ${product.stock}</div>
        <button onclick="window.location.href='details.html?id=${
          product.id
        }'" class="btn">More Details</button>


      `;
      listEl.appendChild(productEl);
    });

    loadItem();
  })
  .catch((error) => console.log(error));
