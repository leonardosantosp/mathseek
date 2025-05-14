import { MathTopics } from './components/MathTopics'
import { SearchPanel } from './components/SearchPanel'
import { Routes, Route } from 'react-router-dom'
import { ResultPages } from './pages/ResultsPage'
import { WikiViewer } from './pages/WikiViewer'
import { LoginPage } from './pages/SignUpPage'


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
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
