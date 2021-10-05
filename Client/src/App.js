import './App.css';
import axios from 'axios';
import ShortSite from './ShortSite'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'true';
axios.defaults.baseURL = 'http://localhost/';

function App() {
  
  return (
    <div className="App">
      <ShortSite/>
    </div>
  );
}

export default App;
