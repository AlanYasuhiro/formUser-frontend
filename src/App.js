import React, {Component} from 'react';
import Header from './components/Header';
import UserBox from './components/User';

class App extends Component {

  render(){
    return(
      <div className="container">
        <Header title="Usuário" />
        <br />
        <UserBox />
      </div>  
    );
  }
}
export default App;