// time management
function getVideosLength(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = parseInt(time % 3600);
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return ` ${hour}hr ${minute}mi ${remainingSeconds}sec `;
}

// show categories buttons
function showCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// show all videos
function showVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

// show categories section when i click buttons
const showCatagoriesSection = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res => res.json())
  .then(data => displayVideos(data.category))
  .catch(err => console.log("ERROR", err))
};

// display videos
function displayVideos(videos) {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML ="";
  // loop every elements
  videos.forEach((video) => {
    // console.log(video);
    const div = document.createElement("div");
    div.innerHTML = `

    <figure class="h-[200px] relative">
        <img
        class="w-full h-full object-cover rounded-md"
        src=${video.thumbnail}
        alt="Shoes" />
        <div class="absolute bottom-2 right-2 bg-black text-white font-bold px-2 rounded">
       
          ${
            video.others.posted_date?.length === 0
              ? ""
              : getVideosLength(video.others.posted_date)
          }
        </div>
    </figure>
    <div class="py-2 flex gap-4">
        <div class="w-8 h-8">
            <img class="w-full h-full object-cover rounded-full" src=${
              video.authors[0].profile_picture
            } />
        </div>
        <div class="space-y-1">
            <h4 class="font-bold text-[18px]">${video.title}</h4>
            <div class="flex gap-2 items-center justify-between">
                <p class="text-gray-600 font-semibold text-[14px]">${
                  video.authors[0].profile_name
                }</p>
                ${
                  video.authors[0].verified
                    ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>`
                    : ""
                }
            </div>
            <p class="text-gray-600 font-semibold text-[12px] tracking-wide">${
              video.others.views
            } views</p>
        </div>

    </div>
    
    `;

    videosContainer.append(div);
  });
}

// display categories
function displayCategories(categories) {
  const categoriesContainer = document.getElementById("categories");
  // loop every categories buttons
  categories.forEach((item) => {
    console.log(item);
    const buttonContainer = document.createElement("div");

    buttonContainer.innerHTML = `
      <button onclick="showCatagoriesSection(${item.category_id})" class="btn font-bold text-gray-700 text-[16px]">${item.category}</button>
    `;
    categoriesContainer.appendChild(buttonContainer);
  });
}

showCategories();
showVideos();
