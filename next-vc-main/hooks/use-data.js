import React, { useEffect, useState } from 'react'

export default function useData() {
  const [data, setData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error, setError] = useState(null)
  const url = 'http://localhost:3005/proxy'

  useEffect(()=>{
  const fetchData = async () => {
    setLoading(true)

    try {
      const res = await fetch(url)
         if (!res.ok) throw Error(`Fetch error!!`);
      const result = await res.json()
      setData(result)
      // console.log(result)
    } catch(err) {
      setError(err)
      console.error("error:",err)
    }
    setLoading(false)
  }
  fetchData()
  },[])

  return { data, loading, error }
}
