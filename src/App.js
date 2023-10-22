import {Editor} from "./Editor/Editor.jsx";
import './App.css';

import { Routes, Route, useLocation} from 'react-router-dom';
import {Article} from "./Article/Article";
// import { PageOne, PageTwo } from './Components/Pages';

function App() {
    const location = useLocation();
    return (
            <Routes>
                <Route path="" element={<Editor />}/>
                <Route path="*" element={<Article path={location.pathname.replace('/','')}/>} />
                <Route path="editor" element={<Editor />} />

            </Routes>
    );
}
export default App;
