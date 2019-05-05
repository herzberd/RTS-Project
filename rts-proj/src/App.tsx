/* tslint:disable */
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DefaultButton, DetailsList, Fabric, TextField, ConstrainMode, CommandBar, Panel, ChoiceGroup } from 'office-ui-fabric-react';
import * as React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import Task, { ITask } from './sim/Task/Task';
import Simulator, { SchedulerAlg } from './sim/env/Simulator';

interface IAppState {
  spinnerVal: number;
  tasks: Task[];
  showPanel: boolean;
}

class App extends React.Component<{}, IAppState> {
  private tasks: Task[];
  private simEnv: Simulator;
  private simSelectOption: any;

  public constructor(props: any) {
    super(props);

    this.state = {
      spinnerVal: 0,
      tasks: [],
      showPanel: false
    }

    initializeIcons();

    this.tasks = [];
    this.simEnv = new Simulator(SchedulerAlg.LST);
    this.simSelectOption = "FIFO";
  }

  public render() {
    this.simEnv.loadTasks(this.state.tasks);

    return (
      <Fabric className="TacoBell">
        <div className="App">
          <div className="NavBar">
            <NavBar
              panelCallback={() => this.setState({
                showPanel: !this.state.showPanel
              })}
            />
          </div>
          <div className="MainStage">
            <Panel
              isOpen={this.state.showPanel}
              isLightDismiss={true}
              headerText="Simulator Config"
              onDismiss={() => {
                this.setState({
                  showPanel: false
                });
              }}
            >
              <ChoiceGroup
                defaultChecked={this.simSelectOption}
                
                onChange={(ev: any, option: any) => {
                  switch (option.key) {
                    case "FIFO":
                      this.simEnv = new Simulator(SchedulerAlg.FIFO);
                      this.simSelectOption = "FIFO";
                      break;
                    case "RR":
                      this.simEnv = new Simulator(SchedulerAlg.RoundRobin);
                      this.simSelectOption = "RR";
                      break;
                    case "EDF":
                      this.simEnv = new Simulator(SchedulerAlg.EDF);
                      this.simSelectOption = "EDF";
                      break;
                    case "LST":
                      this.simEnv = new Simulator(SchedulerAlg.LST);
                      this.simSelectOption = "LST";
                      break;
                  }
                }}
                options={[
                  {
                    key: "FIFO",
                    text: "First-In First-Out"
                  },
                  {
                    key: "RR",
                    text: "Round Robin"
                  },
                  {
                    key: "EDF",
                    text: "Earliest Deadline First"
                  },
                  {
                    key: "LST",
                    text: "Least Slack Time Remaining"
                  }
                ]}
              />
            </Panel>
            <CommandBar
              items={[
                {
                  key: "1",
                  text: "Run Simulation",
                  onClick: () => {
                    console.log(this.simEnv);
                    let tmpTasks: Task[] = this.state.tasks;

                    for (let i: number = 0; i < tmpTasks.length; i++) {
                      tmpTasks[i].reset();
                    }

                    this.setState({
                      tasks: tmpTasks
                    });
                    this.simEnv.runSimulation()
                  }
                },
                {
                  key: "blank1"
                },
                {
                  key: "2",
                  text: "Inspect Task",
                  disabled: true,
                  onClick: () => alert("Not implemented")
                }
              ]}
            />
            <div className="DetailsListTasks">
              <DetailsList
                compact={true}
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
                  // console.log("Object " + i + ": ", x)
                  let thing: Object = {
                    key: x.id + '',
                    id: x.id + '',
                    period: x.period + '',
                    deadline: x.deadline,
                    size: x.ops.length,
                    children: 0,
                    dependencies: x.dependencies.length
                  };
                  // console.log(thing);
                  return thing;
                })}
                constrainMode={ConstrainMode.unconstrained} // Does the opposite of what you'd think 🙄
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
        phase: 0,
        messages: []
      }
      let t: Task = new Task(params);
      t.GenOps(10, 5);
      this.tasks.push(t);
    }
    this.setState({
      tasks: this.tasks
    });
  }
}

export default App;
