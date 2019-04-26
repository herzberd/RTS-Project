/* tslint:disable */
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DefaultButton, DetailsList, Fabric, TextField, ConstrainMode, CommandBar } from 'office-ui-fabric-react';
import * as React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Task, { ITask } from './sim/Task/Task';

interface IAppState {
  spinnerVal: number;
  tasks: Task[];
}

class App extends React.Component<{}, IAppState> {
  private tasks: Task[];

  public constructor(props: any) {
    super(props);

    this.state = {
      spinnerVal: 0,
      tasks: []
    }

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
            <CommandBar
              items={[
                {
                  key: "1",
                  text: "Test"
                }
              ]}
            />
            <div className="DetailsListTasks">
              <DetailsList
                columns={[ // Let's dress this boy for the prom
                  {
                    fieldName: "id",
                    key: "1",
                    name: "ID",
                    minWidth: 0,
                    maxWidth: 10,
                  },
                  {
                    fieldName: "period",
                    key: "2",
                    name: "Period",
                    minWidth: 0,
                    maxWidth: 10
                  },
                  {
                    fieldName: "deadline",
                    key: "3",
                    name: "Deadline",
                    minWidth: 0,
                    maxWidth: 10
                  },
                  {
                    fieldName: "size",
                    key: "4",
                    name: "Size",
                    minWidth: 0,
                    maxWidth: 5
                  },
                  {
                    fieldName: "dependencies",
                    key: "5",
                    name: "Dependencies",
                    minWidth: 0,
                    maxWidth: 10
                  },
                  {
                    fieldName: "children",
                    key: "6",
                    name: "Children",
                    minWidth: 0,
                    maxWidth: 10
                  }
                ]}
                items={this.state.tasks.map((x, i) => {
                  console.log("Object " + i + ": ", x)
                  let thing: Object = {
                    key: x.id + '',
                    id: x.id + '',
                    period: x.period + '',
                    deadline: x.deadline,
                    size: x.ops.length,
                    children: 0,
                    dependencies: x.dependencies.length
                  };
                  console.log(thing);
                  return thing;
                })}
                constrainMode={ConstrainMode.unconstrained} // Does the opposite of what you'd think
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
              <br />
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
        period: 0,
        phase: 0
      }
      let t: Task = new Task(params);
      t.publicGenOps(10, 5);
      this.tasks.push(t);
    }
    this.setState({
      tasks: this.tasks

    });
  }
}

export default App;
