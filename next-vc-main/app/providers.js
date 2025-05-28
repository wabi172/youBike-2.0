'use client'


// 載入swr-devtools使用
import { SWRDevTools } from 'swr-devtools'

export function Providers({ children }) {
  return (
    <SWRDevTools>
     {children}
    </SWRDevTools>
  )
}
