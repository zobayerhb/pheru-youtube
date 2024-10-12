// show categories buttons
function showCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// display categories
function displayCategories(categories) {
  const categoriesContainer = document.getElementById("categories");

  // loop every categories buttons
  categories.forEach((item) => {
    const button = document.createElement("button");
    button.classList = "btn font-bold text-gray-700 text-[16px]";

    button.innerHTML = `
        ${item.category}
        `;
    categoriesContainer.appendChild(button);
  });
}

showCategories();
