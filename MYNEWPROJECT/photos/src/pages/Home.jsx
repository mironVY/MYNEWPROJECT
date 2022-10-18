import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {Collection} from "../components/Collections/Collection";

export const Home = () => {
    const [categoryId, setCategoryId] = React.useState(0);
    const [searchValue, setSearchValue] = React.useState('');
    const [collections, setCollections] = React.useState([]);

    const categories = [
        { "name": "Все" },
        { "name": "Море" },
        { "name": "Горы" },
        { "name": "Архитектура" },
        { "name": "Города" }
    ];
    React.useEffect(() =>{
        fetch(`https://634de928b8ce95a1dd7b848f.mockapi.io/collection?${categoryId ? `category=${categoryId}` :''}`)
            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            }).catch((err) =>{
            console.warn(err);
            alert(('Errorrrrrr!'))
        })
    }, [categoryId])
    return (
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((obj,i) => (<li onClick={() => setCategoryId(i)}
                                                    className={categoryId == i ? 'active' : ''} key={obj.name}>{obj.name}</li>))}
                </ul>
                <input
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
                    className="search-input" placeholder="Поиск по названию"
                />
            </div>
            <div className="content">
                {collections
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
                <li>1</li>
                <li className="active">2</li>
                <li>3</li>
            </ul>
        </div>
    );
};
