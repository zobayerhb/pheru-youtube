// time management
function getVideosLength(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = parseInt(time % 3600);
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return ` ${hour}hr ${minute}mi ${remainingSeconds}sec `;
}

// remove active class button
const removeActiveButton = () => {
  const buttons = document.getElementsByClassName("category-btn");
  console.log(buttons);

  for (const button of buttons) {
    console.log(button);
    button.classList.remove("active");
  }
};

// show categories buttons
function showCategories() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
}

// show all videos
function showVideos(videoSearch = "") {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${videoSearch}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

// show categories section videos when i click buttons
const showCategoriesSection = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveButton();
      // active id class
      const activeBtn = document.getElementById(`categoriesBtn-${id}`);
      activeBtn.classList.add("active");

      displayVideos(data.category);
    })
    .catch((err) => console.log("ERROR", err));
};

// show videos details
const videosDetails = async (videoId) => {
  console.log(videoId);
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  const res = await fetch(uri);
  const data = await res.json();
  displayDetails(data.video);
};

const displayDetails = (video) => {
  const modalContainer = document.getElementById("modal-content");

  modalContainer.innerHTML = `
  <img src=${video.thumbnail} />
  <p>${video.description}</p>
  `;

  // way 1
  document.getElementById("modalData").click();
  // way 2
  // document.getElementById('modalContainer').showModal();
};

// display videos
function displayVideos(videos) {
  const videosContainer = document.getElementById("videos-container");
  videosContainer.innerHTML = "";

  // check is video load or not
  if (videos.length == 0) {
    videosContainer.classList.remove("grid");
    videosContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col justify-center items-center">
    <img src="./assets/Icon.png" />
    <p class="font-bold text-[18px] text-gray-500 pt-3">NO CONTENT HERE</p>
    </div>
    `;
    return;
  } else {
    videosContainer.classList.add("grid");
  }

  // loop every elements
  videos.forEach((video) => {
    console.log(video);
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

            <button onclick="videosDetails('${
              video.video_id
            }')" class="btn btn-error text-white btn-xs">show details</button>
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
      <button id="categoriesBtn-${item.category_id}" onclick="showCategoriesSection(${item.category_id})" class="btn font-bold text-gray-700 text-[16px] category-btn">${item.category}</button>
    `;
    categoriesContainer.appendChild(buttonContainer);
  });
}

document.getElementById("search-input").addEventListener("keyup", (e) => {
  showVideos(e.target.value);
});

showCategories();
showVideos();
