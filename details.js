document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  fetch(`https://dummyjson.com/products/${productId}`)
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
