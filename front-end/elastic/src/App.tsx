import { MathTopics } from './components/MathTopics'
import { SearchPanel } from './components/SearchPanel'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ResultPages } from './pages/ResultsPage'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
