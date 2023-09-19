import Modal from './components/Modal/Modal';

export const App = () => {
  return (
    <>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        React homework template
      </div>
      <Modal
        children={null}
        toggleModal={() => {
          console.log('close');
        }}
      />
    </>
  );
};
