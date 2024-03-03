const loadPost = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/retro-forum/posts"
  );
  const data = await res.json();

  displayPosts(data.posts);
};

const displayPosts = (allPosts) => {
  const cardContainer = document.getElementById("cardContainer");
  allPosts.forEach((post) => {
    const div = document.createElement("div");
    div.classList = "card card-side bg-base-100 shadow-xl mt-8";
    div.innerHTML = `
    <div class="w-1/3 pl-6 pt-10">
    <img src="${post.image}" alt="Movie"/>
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
};

let count = 0;
const markReadHandler = (postTitle, viewCount) => {
  console.log(postTitle, viewCount);
  const markReadContainer = document.getElementById('markReadContainer');

  const div = document.createElement('div');
  div.classList = "card bg-base-100 mt-4";
  div.innerHTML = `
      <div class="card-body flex-row">
          <h3 class="font-semibold">${postTitle}</h3>
          <h3 class="flex items-center"><i class="fa-regular fa-eye mr-3"></i><span>${viewCount}</span></h3>
      </div>
  `;
  markReadContainer.appendChild(div);
  count++;

  const readCount = document.getElementById('readCount');
  readCount.innerText = count;
}
loadPost();
