import { Fabric } from 'office-ui-fabric-react';
import * as React from 'react';
import './App.css';
import Graph from './components/Graph/Graph';
import NavBar from './components/NavBar/NavBar';

class App extends React.Component {
  public render() {
    return (
      <Fabric className="TacoBell">
        <div className="App">
          <div className="NavBar">
            <NavBar />
          </div>
          <div className="MainStage">
            <Graph />
          </div>
        </div>
      </Fabric>
    );
  }
}

export default App;
