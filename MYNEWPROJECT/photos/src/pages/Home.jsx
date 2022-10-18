import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {Collection} from "../components/Collections/Collection";

export const Home = () => {
    const [categoryId, setCategoryId] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');
    const [collections, setCollections] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);


    const categories = [
        { "name": "Все" },
        { "name": "Море" },
        { "name": "Горы" },
        { "name": "Архитектура" },
        { "name": "Города" }
    ];
    React.useEffect(() =>{
        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}` :'';


        fetch(`https://634de928b8ce95a1dd7b848f.mockapi.io/collection?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            }).catch((err) =>{
            console.warn(err);
            alert(('Errorrrrrr!'))
            }).finally(() => setIsLoading(false))
    }, [categoryId, page])
    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((obj,i) => (<li onClick={() => setCategoryId(i)}
                                                    className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>))}
                </ul>
                <input
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input" placeholder="Поиск по названию"
                />
            </div>
            <div className="content">
                {isLoading ? <h2>Page is loading...</h2>
                    : collections
                    .filter(obj =>{
                        return obj.name.toLowerCase().includes(searchValue.toLowerCase())
                    })
                    .map((obj, index) =>(
                        <Collection
                            key = {index}
                            name = {obj.name}
                            images={obj.photos}
                        />
                    ))}
            </div>
            <ul className="pagination">
                {
                  [...Array(5)].map((_, i) => (
                      <li onClick={() => setPage(i+ 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
                  ))
                }
            </ul>
        </div>
    );
};


