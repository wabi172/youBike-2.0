import { Suspense } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './page.scss'

//react-bootstrap只是元件不包含css樣式 要引入
// 載入context
import { Providers } from './providers'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<div>Loading...</div>}>
          <Providers>
            <Suspense fallback={<div>Loading...</div>}>
            {children}
            </Suspense>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
