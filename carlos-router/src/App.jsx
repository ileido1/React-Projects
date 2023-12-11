import './App.css'

import Router from './Router'
import { Route } from './Route'
import SearchPage from './pages/Search.jsx'
import { Suspense, lazy } from 'react'
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))
const LazyHomePage = lazy(() => import('./pages/Home.jsx'))

const router = [

  {
    path: '/search/:query',
    Component: SearchPage
  },
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  }
]



function App() {

  return (
    <>
      <main>
        <Suspense fallback={<div>Loding...</div>}>
          <Router routes={router} defaultComponent={() => <h1>404</h1>} >
            <Route path='/' Component={LazyHomePage}></Route>
            <Route path='/about' Component={LazyAboutPage}></Route>
          </Router>
        </Suspense>
      </main>
    </>
  )
}

export default App
