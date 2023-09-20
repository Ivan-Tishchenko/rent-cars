import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import numeral from 'numeral';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toggleModal, car }) {
  const {
    img,
    make,
    model,
    year,
    rentalPrice,
    address,
    type,
    id,
    accessories,
    functionalities,
    description,
    fuelConsumption,
    engineSize,
    rentalConditions,
    mileage,
  } = car;

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleModal]);

  const rentalConditionsArr = rentalConditions.split('\n');
  const functionalitiesStr = functionalities.join(' | ');
  const accessoriesStr = accessories.join(' | ');
  const formattedMileage = numeral(mileage).format('0,0');
  const formattedRentalPrice = rentalPrice.split('$').reverse().join('$');

  return createPortal(
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className={styles.closeIcon}
          onClick={toggleModal}
        >
          <path
            d="M18 6L6 18"
            stroke="#121417"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 6L18 18"
            stroke="#121417"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className={styles.imgContainer}>
          <img src={img} alt="Car" />
        </div>
        <div>
          <h2 className={styles.title}>
            {make}
            <span className={styles.model}> {model}, </span>
            {year}
          </h2>
          <div className={styles.topList}>
            <span>{address[1]}</span>
            <div className={styles.decorLine}></div>
            <span>{address[2]}</span>
            <div className={styles.decorLine}></div>
            <span>Id: {id}</span>
            <div className={styles.decorLine}></div>
            <span>Year: {year}</span>
            <div className={styles.decorLine}></div>
            <span>Type: {type}</span>
            <div className={styles.decorLine}></div>
            <span>Fuel Consumption: {fuelConsumption}</span>
            <div className={styles.decorLine}></div>
            <span>Engine Size: {engineSize}</span>
          </div>
          <p className={styles.description}>{description}</p>
        </div>
        <div>
          <h3 className={styles.subtitle}>Accessories and functionalities:</h3>
          <div className={styles.accessories}>{accessoriesStr}</div>
          <div className={styles.functionalities}>{functionalitiesStr}</div>
        </div>
        <div>
          <h3 className={styles.subtitle}>Rental Conditions:</h3>
          <div className={styles.rentalList}>
            <div className={styles.rentalItem}>
              <span>{rentalConditionsArr[0]}</span>
            </div>
            <div className={styles.rentalItem}>{rentalConditionsArr[1]}</div>
            <div className={styles.rentalItem}>{rentalConditionsArr[2]}</div>
            <div className={styles.rentalItem}>
              <span>Mileage: </span>
              <span className={styles.mileage}>{formattedMileage}</span>
            </div>
            <div className={styles.rentalItem}>
              <span>Price: </span>
              <span className={styles.price}>{formattedRentalPrice}</span>
            </div>
          </div>
        </div>
        <div className={styles.btnContainer}>
          <a className={styles.link} href="tel:+380730000000">
            Rental car
          </a>
        </div>
      </div>
    </div>,
    modalRoot
  );
}
