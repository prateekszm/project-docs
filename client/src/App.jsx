
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import DocumentEditor from './pages/DocumentEditor';
import{v4 as uuidV4} from 'uuid'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />}/>

        <Route index element={<LandingPage />} />
        <Route path="/editor" element = { <Navigate replace to = {`/editor/${uuidV4()}`} />} />
        <Route path="/editor/:id" element={<DocumentEditor />} />
        {/* <Route path="*" element={<NoPage />} /> */}
    </Routes>
  </BrowserRouter>
)


export default App