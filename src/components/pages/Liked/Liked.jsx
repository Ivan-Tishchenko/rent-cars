import CarsList from '../../components/CarsList/CarsList';
import { useFavoritesContext } from 'context/FavoriteContex';
import React, { useEffect, useState } from 'react';
import styles from './Liked.module.css';
import Modal from 'components/components/Modal/Modal';

const Liked = () => {
  const { favoritesCars, setFavoritesCars } = useFavoritesContext();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  // const [filters, setFilters] = useState({
  //   selectedBrand: '',
  //   selectedPrice: '',
  //   mileageFrom: '',
  //   mileageTo: '',
  // });

  // const handleFilterChange = newFilters => {
  //   setFilters(newFilters);
  // };

  useEffect(() => {
    const storedFavoritesCars = JSON.parse(
      localStorage.getItem('favoritesCars')
    );

    if (storedFavoritesCars) {
      setFavoritesCars(storedFavoritesCars);
    }
  }, [setFavoritesCars]);

  return (
    <main className={`${styles.favorites} container`}>
      {isModalOpen && <Modal car={modalData} />}
      <>
        {/* {favoritesCars.length !== 0 && (
            <FilterForm onFilter={handleFilterChange} />
          )} */}
        {favoritesCars.length === 0 && (
          <>
            <div className={styles.infoTextTop}>
              You haven't added anything :(
            </div>
            <div className={styles.infoTextBottom}>
              <span>To add your favorite car, go to </span>
              <span className={styles.link}></span>
            </div>
          </>
        )}
        <CarsList
          cars={favoritesCars}
          setFavoritesCars={setFavoritesCars}
          setModalData={setModalData}
          favoritesCars={favoritesCars}
          toggleModal={toggleModal}
        />
      </>
    </main>
  );
};

export default Liked;
