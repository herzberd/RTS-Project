/* tslint:disable */
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DefaultButton, DetailsList, Fabric, TextField, ConstrainMode } from 'office-ui-fabric-react';
import * as React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Task, { ITask } from './sim/Task/Task';

interface IAppState {
  spinnerVal: number;
}

class App extends React.Component<{}, IAppState> {
  private tasks: Task[];

  public constructor(props: any) {
    super(props);

    this.state = { spinnerVal: 0 }

    initializeIcons();

    this.tasks = [];
  }

  public render() {
    // console.log(this.tasks);
    return (
      <Fabric className="TacoBell">
        <div className="App">
          <div className="NavBar">
            <NavBar />
          </div>
          <div className="MainStage">
            <div className="DetailsListTasks">
              <DetailsList
                columns={[
                  {
                    key: "1",
                    name: "id",
                    minWidth: 0,
                    maxWidth: 10,
                  },
                  {
                    key: "2",
                    name: "period",
                    minWidth: 0,
                    maxWidth: 10
                  }
                ]}
                items={this.tasks.map(x => {
                  let thing: Object = {
                    key: x.id + '',
                    id: x.id,
                    period: x.period
                  };
                  console.log(thing);
                  return thing;
                })}
                constrainMode={ConstrainMode.unconstrained}
              />
            </div>
            <div className="SimControls">
              <TextField
                label="Number of Tasks"
                defaultValue="1"
                onChange={(ev: React.FormEvent<HTMLInputElement>, newValue?: string) => {
                  if (newValue) {
                    this.setState({ spinnerVal: parseInt(newValue) });
                  }
                  else {
                    console.log("Illegal value for num tasks");
                  }
                }}
              />
              <DefaultButton
                text="Generate Tasks"
                onClick={() => { this.generateTasks() }}
              />
            </div>
          </div>
        </div>
      </Fabric>
    );
  }

  private generateTasks() {
    this.tasks = [];
    for (let i: number = 0; i < this.state.spinnerVal; i++) {
      let params: ITask = {
        id: i,
        deadline: 0,
        dependencies: [],
        ops: [],
        parent: 0,
        period: 0
      }
      let t: Task = new Task(params);
      t.publicGenOps(10, 0);
      this.tasks.push(t);
    }
    console.log(this.tasks);
    this.forceUpdate();
  }
}

export default App;
