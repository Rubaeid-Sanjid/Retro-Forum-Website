const loadPost = async (searchText) => {
  if (typeof searchText === "undefined") {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts`
    );
    const data = await res.json();

    displayPosts(data.posts);
  } else {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
    );
    const data = await res.json();

    displayPosts(data.posts);
  }
};

const loadLatestPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
  );
  const data = await res.json();

  displayLatestPost(data);
};

const displayPosts = (allPosts) => {
  let activeStatus;
  const cardContainer = document.getElementById("cardContainer");
  cardContainer.textContent = "";

  allPosts.forEach((post) => {
    if (post.isActive) {
      activeStatus = "bg-[#10B981]";
    } else {
      activeStatus = "bg-[#FF3434]";
    }

    const div = document.createElement("div");
    div.classList = "card card-side bg-base-100 shadow-xl mt-8";
    div.innerHTML = `
    <div class="w-1/3 pl-6 pt-10 relative">
      <div class="h-4 w-4 rounded-full ${activeStatus} absolute -right-3 top-9">
      </div>

      <div>       
        <img src="${post.image}" alt="Movie"/>      
      </div>
    </div>
    <div class="card-body">
        <div class="flex gap-5 font-medium">
            <h3># ${post.category}</h3>
            <h3>Author: ${post.author?.name}</h3>
        </div>
      <h2 class="card-title">${post.title}</h2>
      <p class="mb-5">${post.description}</p>
      <div class="card-actions justify-between items-center border-t-2 border-dashed pt-5">
        <div class="flex gap-6">
            <h3><i class="fa-regular fa-message mr-3"></i><span>${post.comment_count}</span></h3>
            <h3><i class="fa-regular fa-eye mr-3"></i><span>${post.view_count}</span></h3>
            <h3><i class="fa-regular fa-clock mr-3"></i><span>${post.posted_time}</span> min</h3>
        </div>
        <button onclick="markReadHandler('${post.title}', ${post.view_count})" class="btn btn-circle bg-[#10B981] text-white"><i class="fa-solid fa-envelope-open"></i></button>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
  toggleLoading(false);
};

let count = 0;
const markReadHandler = (postTitle, viewCount) => {
  const markReadContainer = document.getElementById("markReadContainer");

  const div = document.createElement("div");
  div.classList = "card bg-base-100 mt-4";
  div.innerHTML = `
      <div class="card-body flex-row">
          <h3 class="font-semibold">${postTitle}</h3>
          <h3 class="flex items-center"><i class="fa-regular fa-eye mr-3"></i><span>${viewCount}</span></h3>
      </div>
  `;
  markReadContainer.appendChild(div);
  count++;

  const readCount = document.getElementById("readCount");
  readCount.innerText = count;
};

const displayLatestPost = (latestPosts) => {
  const latestPostContainer = document.getElementById("latestPostContainer");

  latestPosts.forEach((latestPost) => {
    const div = document.createElement("div");
    div.classList = "card bg-base-100 shadow-xl mt-12";
    div.innerHTML = `
    <figure class="px-10 pt-10">
      <img src="${latestPost.cover_image}" alt="" class="rounded-xl" />
    </figure>
    <div class="card-body">
        <h3><i class="fa-regular fa-calendar-plus"></i> ${
          latestPost?.author?.posted_date
            ? latestPost?.author?.posted_date
            : "No publish date"
        }</h3>
        <h2 class="card-title font-bold">${latestPost.title}</h2>
        <p>${latestPost.description}</p>
      <div class="card-actions">
        <div class="w-1/5">
          <img class="rounded-full" src="${latestPost.profile_image}" alt="">
        </div>
        <div>
          <h3 class="font-bold">${latestPost?.author?.name}</h3>
          <p>${
            latestPost?.author?.designation
              ? latestPost?.author?.designation
              : "Unknown"
          }</p>
        </div>
      </div>
    </div>
    `;
    latestPostContainer.appendChild(div);
  });
};

const handleSearch = () => {
  toggleLoading(true);

  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  
  loadPost(searchText);
};

const toggleLoading = (isLoading) =>{
  const loadingBar = document.getElementById('loadingBar');
  if(isLoading){
    loadingBar.classList.remove('hidden');
  }else{
    loadingBar.classList.add('hidden');
  }
}
loadPost();
loadLatestPost();