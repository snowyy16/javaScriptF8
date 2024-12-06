const url =
  "https://vi.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const formDOM = document.querySelector(".form");
const inputDOM = document.querySelector(".form-input"); // Đảm bảo chọn đúng lớp
const resultDOM = document.querySelector(".result");  // Đảm bảo đây là đúng

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const value = inputDOM.value;
  if (!value) {
    resultDOM.innerHTML = '<div class="error">Please enter a valid search term</div>';
    return;
  }
  fetchPages(value);
});

const fetchPages = async (searchValue) => {
  resultDOM.innerHTML = '<div class="loading">Loading...</div>';
  try {
    const response = await fetch(`${url}${searchValue}`);
    const data = await response.json();
    const results = data.query.search;
    if (results.length < 1) {
      resultDOM.innerHTML = '<div class="error">No results found</div>';
      return;
    }
    renderResults(results);
  } catch (error) {
    resultDOM.innerHTML = '<div class="error">An error occurred</div>';
  }
};

const renderResults = (results) => {
  const cardsList = results
    .map((item) => {
      const { title, snippet, pageid } = item;
      return `
        <a href="https://vi.wikipedia.org/?curid=${pageid}" target="_blank">
          <h4>${title}</h4>
          <p>${snippet}</p>
        </a>
      `;
    })
    .join("");

  resultDOM.innerHTML = `<div class="articles">
    ${cardsList}
  </div>`;
};
