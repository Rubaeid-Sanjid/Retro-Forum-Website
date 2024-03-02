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
    div.classList = "card card-side bg-base-100 shadow-xl";
    div.innerHTML = `
    <figure><img src="https://daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg" alt="Movie"/></figure>
    <div class="card-body">
        <div class="flex gap-5">
            <h3>#Music</h3>
            <h3>Author:</h3>
        </div>
      <h2 class="card-title">10 Kids Unaware of Their Halloween Costume</h2>
      <p class="mb-5">It’s one thing to subject yourself to ha Halloween costume mishap because, hey that’s your prerogative</p>
      <div class="card-actions justify-between items-center border-t-2 border-dashed pt-5">
        <div class="flex gap-6">
            <h3><i class="fa-regular fa-message mr-3"></i><span>560</span></h3>
            <h3><i class="fa-regular fa-eye mr-3"></i><span>560</span></h3>
            <h3><i class="fa-regular fa-clock mr-3"></i><span>560</span></h3>
        </div>
        <button class="btn btn-circle bg-[#10B981] text-white"><i class="fa-solid fa-envelope-open"></i></button>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
};

loadPost();
