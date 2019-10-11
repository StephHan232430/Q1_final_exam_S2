(function () {
  // 組合url，宣告常數並初始化，DOM節點設定
  const BASE_URL = 'https://movie-list.alphacamp.io'
  const INDEX_URL = BASE_URL + '/api/v1/movies/'
  const POSTER_URL = BASE_URL + '/posters/'
  const data = []
  const dataPanel = document.querySelector('#data-panel')
  const genresButtonGroup = document.querySelector('.btn-group-vertical')

  // call API，parse後調用tranlateGenres函式，依genres編號轉為genres字串，新增data資料屬性後，調用displayDataList函式渲染頁面
  axios.get(INDEX_URL).then((response) => {
    data.push(...response.data.results)
    for (let i = 0; i < data.length; i++) {
      data[i].translatedGenres = translateGenres(data[i])
    }
    displayDataList(data)
  }).catch((err) => console.log(err))

  // 版面組合函式
  function displayDataList(inputData) {
    let htmlContent = ''

    inputData.forEach(function (item) {
      htmlContent += `
        <div class="card-wrapper col-3 mb-3">
          <div class="card h-100">
            <img class="card-img-top" src="${POSTER_URL}${item.image}" alt="Card image cap">
            <div class="card-body movie-item-body">
              <h5 class="card-title m-0">${item.title}</h5>
            </div>
              
            <div class="card-footer badge-wrapper">
              <span class="badge badge-light mr-1">${item.translatedGenres.join('</span><span class="badge badge-light mr-1">')}</span>
            </div>
          </div>
        </div>
       `
    })

    dataPanel.innerHTML = htmlContent

    if (!dataPanel.innerHTML.includes('card-wrapper')) {
      htmlContent += `<h2 class="ml-5">No such movies in this category!!!</h2>`
      dataPanel.innerHTML = htmlContent
    }
  }

  // genres編號/字串轉換函式
  function translateGenres(item) {
    const genresArray = item.genres
    const genresNames = []

    for (let i = 0; i < genresArray.length; i++) {
      switch (genresArray[i]) {
        case 1:
          genresNames.push('Action')
          break
        case 2:
          genresNames.push('Adventure')
          break
        case 3:
          genresNames.push('Animation')
          break
        case 4:
          genresNames.push('Comedy')
          break
        case 5:
          genresNames.push('Crime')
          break
        case 6:
          genresNames.push('Documentary')
          break
        case 7:
          genresNames.push('Drama')
          break
        case 8:
          genresNames.push('Family')
          break
        case 9:
          genresNames.push('Fantasy')
          break
        case 10:
          genresNames.push('History')
          break
        case 11:
          genresNames.push('Horror')
          break
        case 12:
          genresNames.push('Music')
          break
        case 13:
          genresNames.push('Mystery')
          break
        case 14:
          genresNames.push('Romance')
          break
        case 15:
          genresNames.push('Science Fiction')
          break
        case 16:
          genresNames.push('TV Movie')
          break
        case 17:
          genresNames.push('Thriller')
          break
        case 18:
          genresNames.push('War')
          break
        case 19:
          genresNames.push('Western')
          break
      }
    }

    return genresNames
  }

  // 架設genres按鈕監聽器，挑選符合條件者另建array，做為調用版面組合函式之引數
  genresButtonGroup.addEventListener('click', event => {
    let groupData = []
    for (let i = 0; i < data.length; i++) {
      if (data[i].translatedGenres.includes(event.target.innerText)) {
        groupData.push(data[i])
      }
    }
    dataPanel.innerHTML = ''
    displayDataList(groupData)
  })
})()