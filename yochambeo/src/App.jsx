import './App.css'
import './index.css'
import { Home } from './views/Home/home'
import { PublishJobView } from './views/PublishJob/Publish';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/publish" element={<PublishJobView />} />
      </Routes>
    </Router>
  )
}

export default App
