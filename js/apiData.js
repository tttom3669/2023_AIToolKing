const apiPath = 'https://2023-engineer-camp.zeabur.app/api/v1/works';

const data = {
  type: '', // 作品類型
  sort: 0, // 0：作品由新到舊排列，1：作品由舊到新排列
  page: 1, // 作品頁數
  search: '', // 作品名稱搜尋
};

let worksData = [];
let pagesData = {};

const list = document.querySelector("[data-id='aiToolCard-List']");
const page = document.querySelector("[data-id='pagination']");

//取得作品資料
function getData({ type, sort, page, search }) {
  const apiUrl = `${apiPath}?sort=${sort}&page=${page}&${
    type ? `type=${type}&` : ''
  }${search ? `search=${search}` : ''}`;

  axios.get(apiUrl).then((res) => {
    worksData = res.data.ai_works.data;
    pagesData = res.data.ai_works.page;

    renderWorks();
    renderPages();
    if (worksData.length === 0) {
      data.search = '';
      list.innerHTML =
        '<li class="col-12 mt-24 mt-md-12 text-align-center fs-3 fs-6-md">查詢不到資料</li>';
    }
  });
}

// 渲染 AI 工具
function renderWorks() {
  //   console.log(worksData);
  let workContent = '';

  worksData.forEach((item) => {
    workContent += `<li class="col-4 col-lg-6 col-md-12 mt-24 mt-md-12 ">
        <div class="l-aiToolCard rounded">
          <div class="overflow-hidden">
            <img
              src="${item.imageUrl}"
              alt="${item.title}"
              class="aiToolCard-img"
            />
          </div>
          <div class="content">
            <a href="${item.link}" target="_blank" class="h6">${item.title}</a>
            <p>
                ${item.description}
            </p>
          </div>
          <div class="info">
            <h4 class="fw-bold">AI 模型</h4>
            <span>${item.discordId}</span>
          </div>
          <div class="tag">
            <span>#${item.type}</span>
            <button type="button" class="shareBtn">
              <img
                src="https://github.com/hexschool/2022-web-layout-training/blob/main/2023web-camp/icons/share.png?raw=true"
                alt="分享按鈕"
              />
            </button>
          </div>
        </div>
      </li>`;
  });

  list.innerHTML = workContent;
}
// 渲染 頁數
function renderPages() {
  //   console.log(pagesData);
  let pageContent = '';
  const currentPage = Number(pagesData.current_page);
  let startPage = 1;
  let endPage = 5;

  if (pagesData.total_pages > 5) {
    startPage = currentPage;
    endPage = currentPage + 4;
  } else {
    startPage = 1;
    endPage = 5;
  }

  if (pagesData.has_pre) {
    pageContent += `<li><a href="#" class="rounded page-link" data-page="pre"><i class="bi bi-chevron-left" data-page="pre"></i></a></li>`;
  }

  for (let i = startPage; i <= endPage; i++) {
    if (i > pagesData.total_pages) {
      break;
    }
    pageContent += `<li><a href="#" class="${
      currentPage === i ? 'active' : ''
    } rounded page-link" data-page="${i}">${i}</a></li>`;
  }
  if (pagesData.has_next) {
    pageContent += `<li><a href="#" class="rounded page-link" data-page="next"><i class="bi bi-chevron-right" data-page="next"></i></a></li>`;
  }

  page.innerHTML = pageContent;
  paginationListener();
}
let pageId = '';
// 頁數變換監聽
function paginationListener() {
  const pageLinks = document.querySelectorAll('a.page-link');
  const curPage = Number(pagesData.current_page);

  pageLinks.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      if (pageId !== e.target.dataset.page) {
        if (e.target.dataset.page === 'next') {
          pageId = curPage + 1;
        } else if (e.target.dataset.page === 'pre') {
          pageId = curPage - 1;
        } else {
          pageId = e.target.dataset.page;
        }
        data.page = Number(pageId);
        getData(data);
      }
    });
  });
}

getData(data);

//---事件監聽---

// 切換作品排序
const desc = document.querySelector('.new-to-old');
const asc = document.querySelector('.old-to-new');
const btnSort = document.querySelector('.dropdown-btnText');

//  由新到舊 -> sort = 0
desc.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 0;
  $(`[data-id="dropdown-menu"]`).toggleClass('d-block');
  btnSort.textContent = '由新到舊';
  getData(data);
});
//  由舊到新 -> sort = 1
asc.addEventListener('click', (e) => {
  e.preventDefault();
  data.sort = 1;
  $(`[data-id="dropdown-menu"]`).toggleClass('d-block');
  btnSort.textContent = '由舊到新';
  getData(data);
});

// 切換作品類型
const filterBtns = document.querySelector('[data-btn="filter-btn"]');
const filterTagBtns = document.querySelectorAll('[data-btn="filterTag-btn"]');

// 篩選按鈕監聽
filterBtns.addEventListener('click', (e) => {
  e.preventDefault();
  console.log(e.target);
  if (e.target.textContent === '所有類型') {
    data.type = '';
  } else {
    data.type = e.target.textContent;
  }

  filterTagBtns.forEach((btn) => {
    if (btn.classList.contains('active')) {
      btn.removeAttribute('class', 'active');
    }
    if (btn.textContent === e.target.textContent) {
      btn.setAttribute('class', 'active');
    }
  });

  $(`[data-id="filter-dropdown-menu"]`).toggleClass('d-block');
  getData(data);
});

// 篩選標籤監聽
filterTagBtns.forEach((item) => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.textContent === '所有類型') {
      data.type = '';
    } else {
      data.type = e.target.textContent;
    }

    filterTagBtns.forEach((btn) => {
      if (btn.classList.contains('active')) {
        btn.removeAttribute('class', 'active');
      }
    });

    item.setAttribute('class', 'active');

    getData(data);
  });
});

// 搜尋
const search = document.querySelector('[data-type="search"]');
search.addEventListener('keydown', (e) => {
  e.preventDefault();
  // 接受到  Enter 鍵時
  if (e.keyCode === 13) {
    data.search = search.value;
    data.page = 1;
    getData(data);
  }
  search.value = '';
});
