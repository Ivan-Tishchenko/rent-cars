import { getCars } from 'API/cars';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './CarsPage.module.css';
import { useFavoritesContext } from 'context/FavoriteContex';
import Modal from 'components/components/Modal/Modal';
import CarsList from 'components/components/CarsList/CarsList';
import FilterForm from 'components/FilterForm/FilterForm';

const CarsPage = () => {
  const [filters, setFilters] = useState({
    selectedBrand: '',
    selectedPrice: '',
    mileageFrom: '',
    mileageTo: '',
  });

  const handleFilterChange = newFilters => {
    setFilters(newFilters);
  };

  const [page, setPage] = useState(1);

  const [cars, setCars] = useState([]);

  const [canLoadMore, setCanLoadMore] = useState(true);

  const { favoritesCars, setFavoritesCars } = useFavoritesContext();

  useEffect(() => {
    const storedFavoritesCars = JSON.parse(
      localStorage.getItem('favoritesCars')
    );

    if (storedFavoritesCars) {
      setFavoritesCars(storedFavoritesCars);
    }
  }, [setFavoritesCars]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState('');

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  useEffect(() => {
    getCars(1).then(data => setCars(data ?? []));
  }, []);

  return (
    <>
      {isModalOpen && <Modal toggleModal={toggleModal} car={modalData} />}
      <div className={styles.container}>
        <FilterForm onFilter={handleFilterChange} />
        <CarsList
          cars={cars}
          setModalData={setModalData}
          favoritesCars={favoritesCars}
          setFavoritesCars={setFavoritesCars}
          toggleModal={toggleModal}
          filters={filters}
        />
        {canLoadMore && (
          <button
            type="button"
            className={styles.buttonLoadMore}
            onClick={() => {
              getCars(page + 1).then(data => {
                setCars([...cars, ...data]);
                if (data.length < 8) {
                  setCanLoadMore(null);
                }
              });
              setPage(page + 1);
            }}
          >
            load more
          </button>
        )}
      </div>
    </>
  );
};

export default CarsPage;
