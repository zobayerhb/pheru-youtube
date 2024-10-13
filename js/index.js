// time management
function getVideosLength(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = parseInt(time % 3600);
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return ` ${hour}hr ${minute}mi ${remainingSeconds}sec `
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

// {
//   "category_id": "1003",
//   "video_id": "aaaf",
//   "thumbnail": "https://i.ibb.co/5LRQkKF/stick-and-stones.jpg",
//   "title": "Sticks & Stones",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/rdTZrCM/dev.jpg",
//           "profile_name": "Dave Chappelle",
//           "verified": true
//       }
//   ],
//   "others": {
//       "views": "113K",
//       "posted_date": ""
//   },
//   "description": "Dave Chappelle's 'Sticks & Stones' has garnered 113K views and remains a controversial yet highly engaging piece of stand-up comedy. Known for his fearless approach, Dave dives into a wide range of topics, delivering his unique perspective with wit and sharp humor. As a verified artist, Dave's comedy is raw, honest, and unapologetically funny."
// }


// display videos
function displayVideos(videos) {
  const videosContainer = document.getElementById("videos-container");
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
       
          ${ video.others.posted_date?.length === 0 ? "" : getVideosLength(video.others.posted_date)}
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
    const button = document.createElement("button");
    button.classList = "btn font-bold text-gray-700 text-[16px]";
    button.innerHTML = `
        ${item.category}
        `;
    categoriesContainer.appendChild(button);
  });
}

showCategories();
showVideos();
