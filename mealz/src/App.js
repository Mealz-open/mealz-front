import './App.css';
import TOP from './asset/top.js';
import GNB from './asset/gnb.js';
import Contents from './Contents.js';

function App() {
  return (
    <>
      <TOP />

      <div class="main-contents">
        <Contents />
      </div>

      <GNB />
    </>
  );
}

export default App;
