import { getCars } from 'API/cars';
import Button from 'components/components/Button/Button';
import Dropdawn from 'components/components/Dropdown/Dropdawn';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './CarsPage.module.css';
import { useFavoritesContext } from 'context/FavoriteContex';
import Modal from 'components/components/Modal/Modal';
import CarsList from 'components/components/CarsList/CarsList';

const listCarsBrand = [
  'Buick',
  'Volvo',
  'HUMMER',
  'Subaru',
  'Mitsubishi',
  'Nissan',
  'Lincoln',
  'GMC',
  'Hyundai',
  'MINI',
  'Bentley',
  'Mercedes-Benz',
  'Aston Martin',
  'Pontiac',
  'Lamborghini',
  'Audi',
  'BMW',
  'Chevrolet',
  'Mercedes-Benz',
  'Chrysler',
  'Kia',
  'Land',
];
const carsBrand = 'cars-brand';

const price = 'price on hour';
const listPrices = [10, 20, 30, 40, 50, 60, 70, 80];

const CarsPage = () => {
  const [brand, setBrand] = useState('');
  const [hourPrice, setHourPrice] = useState('');
  const [from, setFrom] = useState('From');
  const [to, setTo] = useState('To');

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
        <form
          className={styles.filter}
          onSubmit={() => {
            console.log('submit');
          }}
        >
          <label htmlFor="car brand">car brand</label>
          <input
            type="text"
            list={carsBrand}
            id="car brand"
            onChange={e => setBrand(e.target.value)}
            value={brand}
            placeholder="Enter the text"
            name="brand"
          />
          <Dropdawn inputId={carsBrand} variables={listCarsBrand} />

          <label htmlFor="price/1hour">price/1hour</label>
          <input
            type="text"
            list={price}
            id="price/1hour"
            onChange={e => setHourPrice(e.target.value)}
            value={hourPrice}
            placeholder="To $"
            name="price"
          />
          <Dropdawn inputId={price} variables={listPrices} />

          <label htmlFor="from">Сar mileage / km</label>
          <input
            type="text"
            onChange={e =>
              setFrom(`From ${e.target.value.split(' ')[1] ?? ''}`)
            }
            value={from}
            placeholder="From"
            id="from"
            name="from"
          />
          <input
            type="text"
            name="to"
            id="to"
            onChange={e => setTo(`To ${e.target.value.split(' ')[1] ?? ''}`)}
            value={to}
          />
          <Button
            textContent={'Search'}
            type={'submit'}
            onClick={e => {
              e.preventDefault();
            }}
          />
        </form>
        <CarsList
          cars={cars}
          setModalData={setModalData}
          favoritesCars={favoritesCars}
          setFavoritesCars={setFavoritesCars}
          toggleModal={toggleModal}
        />
        {canLoadMore && (
          <button
            type="button"
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
