import { MathTopics } from './components/MathTopics'
import { SearchPanel } from './components/SearchPanel'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ResultPages } from './pages/ResultsPage'
import { WikiViewer } from './pages/WikiViewer'
import SignUpPage  from './components/SignUpPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchPanel />
                <MathTopics />
              </>
            }
          />
          <Route path="/result" element={<ResultPages />} />
          <Route path="/wiki" element={<WikiViewer />} />
          <Route path="/signup" element={<SignUpPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
