import React from 'react';

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

//достаем из моков информацию
        //`В эту строку можно без труда вставить переменную или выражение` КАВЫЧКИ
        // ‘А здесь может быть только текст’
        fetch(`https://634de928b8ce95a1dd7b848f.mockapi.io/collection?page=${page}&limit=3&${category}`)
            //отправляем запрос на бек для фильтрации категорий
            .then((res) => res.json())
            .then((json) => {
                setCollections(json);
            }).catch((err) =>{//ловим ошибки
            console.warn(err);
            alert(('Errorrrrrr!'))
            }).finally(() => setIsLoading(false))//чтобы закгрузка сайта завершилась
    }, [categoryId, page])//зависимости
    return (//сначала проверяем на какую вкладку нажали чтобы ее подсветить, выбираем ключ для моков чтобы отфильтровать категории
        <div className="App">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {categories.map((obj,i) => (<li onClick={() => setCategoryId(i)}
                                                    className={categoryId === i ? 'active' : ''} key={obj.name}>{obj.name}</li>))}
                </ul>
                <input
                    value={searchValue} onChange={(e) => setSearchValue(e.target.value)}//поиск по названию коллекции
                    className="search-input" placeholder="Поиск по названию"
                />
            </div>
            <div className="content">
                {isLoading ? <h2>Page is loading...</h2>//показывает что стр загружается при низком интернете
                    : collections
                    .filter(obj =>{//фильтрация поиска
                        return obj.name.toLowerCase().includes(searchValue.toLowerCase())//toLowerCase - привести к нижнему регистру
                    })
                    .map((obj, index) =>(
                        <Collection //делаем коллекции(рендерим)
                            key = {index}
                            name = {obj.name}
                            images={obj.photos}
                        />
                    ))}
            </div>
            <ul className="pagination">
                {//создаем 5 страничек, при нажатии кнопка меняет цвет
                    //(_, i) - берем каждый индекс фейковой странички
                  [...Array(5)].map((_, i) => (
                      <li onClick={() => setPage(i+ 1)} className={page === i + 1 ? 'active' : ''}>{i + 1}</li>
                  ))
                }
            </ul>
        </div>
    );
};


