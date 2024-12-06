const toggleBtn = document.querySelector(".btn");
const articlesContainer = document.querySelector(".articles");

// Khi nút toggle được nhấn, thêm/xóa lớp 'dark-mode' vào thẻ <html>
toggleBtn.addEventListener("click", function () {
  document.documentElement.classList.toggle("dark-mode");
});

// Dữ liệu bài viết (articles) để hiển thị trên trang
const articlesData = articles
  .map(function (article) {
    const { title, date, length, snippet } = article;
    const formatDate = moment(date).format("MMMM Do, YYYY");
    return `<article class="post">
          <h2>${title}</h2>
          <div class="post-info">
            <span>${formatDate}</span>
            <span>${length} min read</span>
          </div>
          <p>
            ${snippet}
          </p>
        </article>`;
  })
  .join("");

// Chèn các bài viết vào phần tử container
articlesContainer.innerHTML = articlesData;
