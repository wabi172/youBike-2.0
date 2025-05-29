'use client'
import Pagination from './_component/pagination'
import useData from '../hooks/use-data'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const { data, loading, error } = useData()
  const [totalData, setTotalData] = useState([])

  useEffect(() => {
    if (data && Array.isArray(data) && data.length > 0) {
      // 確保 data 存在、是陣列且不為空
      setTotalData(data) //非同步
      console.log('First station data:', data)
    } else {
      console.log('Data is not available/array.')
    }
  }, [data])

  if (error != null) {
    console.log(error)
    return <h1>Error! reload or contact the engineer</h1>
  }
  if (loading) {
    return <h1>Loading......</h1>
  } else {
    return (
      <>
        <div className="container c-top">
          <div className="row page-row">
            <Pagination
              data={totalData}
              //資料總數除以dataLimit設定的頁數再無條件進位 直接讓所有分頁都顯示
              dataLimit={10}
            ></Pagination>
          </div>
        </div>
      </>
    )
  }
}
