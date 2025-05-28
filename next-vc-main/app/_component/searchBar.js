import React, { useState } from 'react'

export default function SearchBar({ getWord,onReset }) {
  const [searchWord, setSearchWord] = useState('')

  const sendWord = () => {
    getWord(searchWord)
  }

  const change = (e) => {
    setSearchWord(e.target.value)
  }

  const clear = () => {
    getWord('')
    setSearchWord('')
    onReset() //呼叫清除的回乎函數
  }

  function filtereData(data) {
    data.filter((item) =>
      item.name.toLowerCase().includes(searchWord.toLocaleLowerCase())
    )
  }

  return (
    <>
      <div className="src">
        <input
          type="text"
          placeholder="請輸入站名"
          value={searchWord}
          onChange={change}
        />
        <button id="checkButton" onClick={sendWord}>確定</button>
        <button id="refreshButton" onClick={clear}>返回</button>
      </div>
    </>
  )
}
