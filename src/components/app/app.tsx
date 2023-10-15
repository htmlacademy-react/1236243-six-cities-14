import MainScreen from '../../pages/main-page/main';

type AppPlacesCards = {
    placesCards: number;
}

function App ({placesCards}: AppPlacesCards): JSX.Element {
  return (
    <MainScreen placesCount={placesCards}/>
  );
}

export default App;
