import { getCars } from 'API/cars';
import Button from 'components/components/Button/Button';
import Dropdawn from 'components/components/Dropdown/Dropdawn';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from './CarsPage.module.css';
import { useFavoritesContext } from 'context/FavoriteContex';

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(prevState => !prevState);
  };

  useEffect(() => {
    getCars(1).then(data => setCars(data ?? []));
  }, []);

  console.log(cars);
  return (
    <div>
      <form
        className="filter"
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
          onChange={e => setFrom(`From ${e.target.value.split(' ')[1] ?? ''}`)}
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
      <ul className={styles.carsList}>
        {cars.map(obj => {
          const {
            id,
            img,
            make,
            model,
            year,
            address,
            type,
            rentalPrice,
            rentalCompany,
            car,
          } = obj;

          return (
            <li key={id}>
              <div className={styles.carContainer}>
                <div className={styles.imgContainer}>
                  <img src={img} alt="Car" />
                  <button
                    className={styles.toggleFavoritesBtn}
                    // onClick={() => toggleFavorite(car)}
                  >
                    {favoritesCars.some(
                      favoriteCar => favoriteCar.id === car.id
                    ) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                      >
                        <path
                          d="M15.6301 3.45753C15.247 3.07428 14.7922 2.77026 14.2916 2.56284C13.791 2.35542 13.2545 2.24866 12.7126 2.24866C12.1707 2.24866 11.6342 2.35542 11.1336 2.56284C10.633 2.77026 10.1782 3.07428 9.79509 3.45753L9.00009 4.25253L8.20509 3.45753C7.43132 2.68376 6.38186 2.24906 5.28759 2.24906C4.19331 2.24906 3.14386 2.68376 2.37009 3.45753C1.59632 4.2313 1.16162 5.28075 1.16162 6.37503C1.16162 7.4693 1.59632 8.51876 2.37009 9.29253L3.16509 10.0875L9.00009 15.9225L14.8351 10.0875L15.6301 9.29253C16.0133 8.90946 16.3174 8.45464 16.5248 7.95404C16.7322 7.45345 16.839 6.91689 16.839 6.37503C16.839 5.83316 16.7322 5.2966 16.5248 4.79601C16.3174 4.29542 16.0133 3.84059 15.6301 3.45753Z"
                          fill="#3470FF"
                          stroke="#3470FF"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        className={styles.toggleFavoritesIcon}
                      >
                        <path
                          d="M15.63 3.4575C15.2469 3.07425 14.7921 2.77023 14.2915 2.56281C13.7909 2.35539 13.2543 2.24863 12.7125 2.24863C12.1706 2.24863 11.634 2.35539 11.1334 2.56281C10.6329 2.77023 10.178 3.07425 9.79497 3.4575L8.99997 4.2525L8.20497 3.4575C7.4312 2.68373 6.38174 2.24903 5.28747 2.24903C4.19319 2.24903 3.14374 2.68373 2.36997 3.4575C1.5962 4.23127 1.1615 5.28072 1.1615 6.375C1.1615 7.46927 1.5962 8.51873 2.36997 9.2925L3.16497 10.0875L8.99997 15.9225L14.835 10.0875L15.63 9.2925C16.0132 8.90943 16.3172 8.45461 16.5247 7.95401C16.7321 7.45342 16.8388 6.91686 16.8388 6.375C16.8388 5.83313 16.7321 5.29657 16.5247 4.79598C16.3172 4.29539 16.0132 3.84056 15.63 3.4575Z"
                          stroke="white"
                          strokeOpacity="0.8"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                <div className={styles.textContainer}>
                  <div className={styles.topTextContainer}>
                    <div>
                      <span>{make} </span>
                      <span className={styles.model}>{model}, </span>
                      <span>{year}</span>
                    </div>
                    <p>{rentalPrice}</p>
                  </div>
                  <div className={styles.bottomTextContainer}>
                    <span>{address[1]}</span>
                    <div className={styles.decorLine}></div>
                    <span>{address[2]}</span>
                    <div className={styles.decorLine}></div>
                    <span>{rentalCompany}</span>
                    <div className={styles.decorLine}></div>
                    <span>{type}</span>
                    <div className={styles.decorLine}></div>
                    <span>{model}</span>
                    <div className={styles.decorLine}></div>
                    <span>{id}</span>
                  </div>
                </div>
                <div
                  className={styles.btnContainer}
                  // onClick={toggleModal}
                >
                  <Button>Learn more</Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
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
  );
};

export default CarsPage;
