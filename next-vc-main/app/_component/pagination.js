import React, { useCallback, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import styles from './pagination.module.css'
import AccordionList from './accordion'
import SearchBar from './searchBar'

export default function Pagination(props) {
  // 從props導入資料、顯示分頁數、每頁資料數
  const { data, dataLimit } = props
  // 紀錄排序
  const [rentSort, setRentSort] = useState({
    order: '',
    text: '',
    type: '',
  })
  const [returnSort, setReturnSort] = useState({
    order: '',
    text: '',
    type: '',
  })
  // 儲存所在頁面
  const [currentPage, setCurrentPage] = useState(1)
  // 搜尋內容
  const [search, setSearch] = useState('')
  // 總分頁
  const pages = Math.ceil(
    data.filter((item) => item.sna.includes(search)).length / dataLimit
  )
  // const pageLimit=Math.ceil(data.filter((item) => item.sna.includes(search)).length / 10)
  const pageLimit = 5
  // 下一頁 上一頁
  const NextPage = () => {
    setCurrentPage((page) => page + 1)
  }
  const PreviousPage = () => {
    setCurrentPage((page) => page - 1)
  }
  // 跳至該頁面
  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent)
    if (isNaN(pageNumber)) {
      return
    }
    console.log(pageNumber)
    setCurrentPage(pageNumber)
  }
  // 載入當頁資料
  // const getPaginatedData = () => {
  //   const startIndex = currentPage * dataLimit - dataLimit //1.計算起始索引
  //   const endIndex = startIndex + dataLimit // 2. 計算結束索引

  //   if (rentSort.order == '' && returnSort.order == '') {
  //     return data
  //     .filter((item) => item.sna.includes(search))
  //     .slice(startIndex, endIndex)
  //   }
  //   if (rentSort.order != '' && rentSort.order == 'ASC') {
  //     const dataSort = data.sort(
  //       (a, b) => a.available_rent_bikes - b.available_rent_bikes
  //     )
  //     return dataSort.filter((item) => item.sna.includes(search))
  //     .slice(startIndex, endIndex)
  //   }
  //   if (rentSort.order != '' && rentSort.order == 'DESC') {
  //     const dataSort = data.sort(
  //       (a, b) => b.available_rent_bikes - a.available_rent_bikes
  //     )
  //     return dataSort.filter((item) => item.sna.includes(search))
  //     .slice(startIndex, endIndex)
  //   }
  //   if (returnSort.order != '' && returnSort.order == 'ASC') {
  //     const dataSort = data.sort(
  //       (a, b) => a.available_return_bikes - b.available_return_bikes
  //     )
  //     return dataSort.filter((item) => item.sna.includes(search))
  //     .slice(startIndex, endIndex)
  //   }
  //   if (returnSort.order != '' && returnSort.order == 'DESC') {
  //     const dataSort = data.sort(
  //       (a, b) => b.available_return_bikes - a.available_return_bikes
  //     )
  //     return dataSort.filter((item) => item.sna.includes(search))
  //     .slice(startIndex, endIndex)
  //   }
  //   // return data
  //   //   .filter((item) => item.sna.includes(search))
  //   //   .slice(startIndex, endIndex)
  //   // 3. 提取經篩選的子陣列
  // }
  
  //還車排序有問題
  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit
    //1.計算起始索引
    const endIndex = startIndex + dataLimit
    // 2. 計算結束索引
    switch (true) {
      case rentSort.order == '' && returnSort.order == '':
        break

      case rentSort.order == 'ASC':
        data.sort((a, b) => a.available_rent_bikes - b.available_rent_bikes)
        break

      case rentSort.order == 'DESC':
        data.sort((a, b) => b.available_rent_bikes - a.available_rent_bikes)
        break

      case returnSort.order == 'ASC':
        data.sort((a, b) => a.available_return_bikes - b.available_return_bikes)
        break
      case returnSort.order == 'DESC':
        data.sort((a, b) => b.available_return_bikes - a.available_return_bikes)
        break
    }
    return data
      .filter((item) => item.sna.includes(search))
      .slice(startIndex, endIndex).map(item => ({
        ...item,
        sna:item.sna.replace('YouBike2.0_','')
      }))
    // 3. 提取經篩選的子陣列
  }

  // 計算目前分頁的數字是哪幾個分頁(產生頁碼陣列)
  const pageGroup = () => {
    const pageNums = []

    let startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2))
    let endPage = Math.min(pages, startPage + pageLimit - 1)
    //總頁數不足上限
    if (pages <= pageLimit) {
      startPage = 1
      endPage = pages
    }
    //改變起始頁碼、總頁數超過上限處理
    // if (startPage > 1) {
    //   pageNums.push('...')
    // }
    for (let i = startPage; i <= endPage; i++) {
      pageNums.push(i)
    }
    if (endPage < pages) {
      pageNums.push('...')
    }

    return pageNums
  }
  //處理currentPage大於pages時資料無法顯示的錯誤
  useEffect(() => {
    if (currentPage > pages && pages > 0) {
      setCurrentPage(1)
    }
  }, [pages, setCurrentPage])
  //獲取搜尋內容
  const searchcontent = (getWord) => {
    setSearch(`${getWord}`)
    // console.log(getWord);
  }
  //返回btn的狀態清除
  const backReset = ()=>{
    window.location.reload()
  } 
  // 不會觸發重新渲染
  // const backReset = useCallback(() => {
  //    setRentSort({
  //     order: '',
  //     text: '',
  //     type: '',
  //   })
  //     setReturnSort({
  //     order: '',
  //     text: '',
  //     type: '',
  //   })
  // },[rentSort,returnSort])
  // 排序切換
  const renttoggleSort = (e) => {
    setReturnSort({
      order: '',
      text: '',
      type: '',
    })
    const type = e.target.dataset.type
    setRentSort((currentSort) => ({
      text: currentSort.text == '↑' || currentSort.text == '' ? '↓' : '↑',
      order:
        currentSort.order == 'ASC' || currentSort.order == '' ? 'DESC' : 'ASC',
      type: type,
    }))
    console.log(rentSort)
    //函數式更新
  }
  const returntoggleSort = (e) => {
    setRentSort({
      order: '',
      text: '',
      type: '',
    })
    const type = e.target.dataset.type
    setReturnSort((currentSort) => ({
      text: currentSort.text == '↑' || currentSort.text == '' ? '↓' : '↑',
      order:
        currentSort.order == 'ASC' || currentSort.order == '' ? 'DESC' : 'ASC',
      type: type,
    }))
    console.log(returnSort)
    //函數式更新
  }

  return (
    <>
      <SearchBar getWord={searchcontent} onReset={backReset}></SearchBar>
      <div className="row">
        <div className={styles.col}>區域</div>
        <div className={styles.col}>站名</div>
        <div
          className={styles.col}
          data-type="rent"
          onClick={renttoggleSort}
        >
          可借車{rentSort.text != '' ? rentSort.text : ''}
        </div>
        <div
          className={styles.col}
          data-type="return"
          onClick={returntoggleSort}
        >
          可還車{returnSort.text != '' ? returnSort.text : ''}
        </div>
        <div className={styles.col}>座標</div>
      </div>
      <div className="dataContainer">
        <Row>
          {getPaginatedData().map((d, idx) => (
            <AccordionList key={idx} data={d}></AccordionList>
          ))}
        </Row>
      </div>
      <div className={styles.pagination}>
        <button
          onClick={PreviousPage}
          className={`${styles.prev} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
        >
          prev
        </button>
        {pageGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`${styles.paginationItem} ${
              currentPage === item ? styles.active : null
            }`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={NextPage}
          className={`${styles.next} ${
            currentPage === pages || pages === 0 ? styles.disabled : ''
          }`}
        >
          next
        </button>
      </div>
    </>
  )
}
