// import { Router, Routes, Route } from 'react-router-dom';

import {useEffect} from "react";
import {serverGetByIdArticle} from "../sendArticle";



function FnArticle(index) {
    useEffect(() => {
    async function fetchData() {
        const response = await serverGetByIdArticle(index);
    }
    let qwe= fetchData();
    console.log(qwe)
}, []);

    return (
        // <h3>213123</h3>
        <div>
            <h3>Заголовок: {index}</h3>
            {/*<div>*/}
            {/*    Текст: {index}*/}
            {/*    Дата создания: 10-21*/}
            {/*</div>*/}
        </div>
    )
}

export const Article = (path) => FnArticle(path.path);

// id
//creation-date
// title
// subtitle
// content