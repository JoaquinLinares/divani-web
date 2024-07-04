'use client'
import React, { useEffect, useState } from 'react';
import styles from "../page.module.css";

const Bienes = () => {
  const [data, setData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("db");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const uniqueArticles = [...new Set(data.map(item => item.articulo))];

  const handleArticleClick = (article) => {
    setSelectedArticle(article === selectedArticle ? null : article);
  };

  const incrementStock = (id) => {
    const newData = data.map(item => 
      item.id === id ? { ...item, stock: item.stock + 1 } : item
    );
    setData(newData);
    localStorage.setItem("db", JSON.stringify(newData));
  };

  const decrementStock = (id) => {
    const newData = data.map(item => 
      item.id === id && item.stock > 0 ? { ...item, stock: item.stock - 1 } : item
    );
    setData(newData);
    localStorage.setItem("db", JSON.stringify(newData));
  };

  return (
    <div className={`${styles.main} ${styles.fondo}`}>
      <nav className={styles.nav}>
        <h1 className={styles.title}>Stock</h1>
      </nav>
      <main>
        <div className={styles.articlesContainer}>
          {uniqueArticles.map(article => (
            <div 
              key={article} 
              className={`${styles.articleCard} ${selectedArticle === article ? styles.activeCard : ''}`}
              onClick={() => handleArticleClick(article)}
            >
              <p>{article}</p>
            </div>
          ))}
        </div>

        {selectedArticle ? (
          <div className={styles.articleDetails}>
            <h2>Detalles de {selectedArticle}</h2>
            {data
              .filter(item => item.articulo === selectedArticle)
              .map((item, index) => (
                <div key={item.id} className={styles.itemDetails}>
                  <p>Color: {item.color}</p>
                  <p>Talle: {item.talle}</p>
                  <p>Stock: {item.stock}</p>
                  <div className={styles.stockControls}>
                    <button onClick={() => incrementStock(item.id)}>+</button>
                    <button onClick={() => decrementStock(item.id)}>-</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className={styles.contenedorShow}>
            <p>Aprete un articulo para consultar su stock</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Bienes;
