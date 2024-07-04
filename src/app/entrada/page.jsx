'use client'
import React, { useEffect, useState} from 'react';
import styles from "../page.module.css";

const Entrada = () => {
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      // Si se presiona la tecla Enter, mostramos el código escaneado y reiniciamos el estado
      if (event.key === 'Enter') {
        console.log('Código de barras escaneado:', barcode);
        setBarcode('');
      } else {
        // Añadimos el carácter al estado del código de barras
        setBarcode((prev) => prev + event.key);
      }
    };

    // Añadimos el event listener cuando el componente se monta
    window.addEventListener('keypress', handleKeyPress);

    // Eliminamos el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [barcode]);

  return (
    <div className={`${styles.main} ${styles.fondo}`}>      
      <div className={styles.imageContainer}>
      <img src="/Box-Transparent-PNG.png" alt="Box" className={styles.image} />
            <p className={styles.titleIMG}>Agregar sus artículos</p>
      </div>
    </div>
  );
};

export default Entrada;
