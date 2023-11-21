document.addEventListener("DOMContentLoaded", function () {
  const takeURL = new URLSearchParams(window.location.search);
  const productID = takeURL.get("id");

  fetch(`https://dummyjson.com/products/${productID}`)
    .then((response) => response.json())
    .then((data) => {
      const productDetailsContainer = document.getElementById("productDetails");
      productDetailsContainer.innerHTML = `
      <div class="content">
      <h2 class="brand">${data.brand}</h2>
      <p class="title">${data.title}</h2>
      <p class="description">${data.description}</p>
      </content>
      <div class="rating">Rating: ${data.rating}</div>
      <div class="price">Price: $${data.price}</div>
      <div class="gallery"></div>
      <button onclick="window.location.href='index.html'" class="btn">Go Back</button>
    `;
      const galleryContainer =
        productDetailsContainer.querySelector(".gallery");
      data.images.forEach((imageUrl) => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl;
        imgElement.alt = data.title;
        galleryContainer.appendChild(imgElement);
      });
    })
    .catch((error) => console.error("Error fetching product details:", error));
});
