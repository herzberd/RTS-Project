/* tslint:disable */
import Task, { ISimMessage } from '../Task/Task';

export enum SchedulerAlg {
    FIFO = 0,
    RoundRobin = 1,
    EDF = 2,
    LST = 3,
    CLAIRVOYANT = 99
}

/*  CONSIDERATIONS
    preemption
    # cpus
*/

class Simulator {
    private tasks: Task[];
    private alg: SchedulerAlg;

    public constructor(schedulerType: SchedulerAlg) {
        console.log("Creating Simulator");
        this.alg = schedulerType;
    }

    public loadTasks(tasks: Task[]) {
        this.tasks = tasks;
    }

    public getTasks(): Task[] {
        return this.tasks;
    }

    public runSimulation() {
        if (!this.tasks || this.tasks.length < 1) {
            return;
        }

        console.log("Beginning simulation of " + this.tasks.length + " tasks");
        if (this.alg == SchedulerAlg.FIFO) {
            this.FIFO();
        }
        else if (this.alg == SchedulerAlg.RoundRobin) {
            this.RoundRobin(5);
        }
        else if (this.alg == SchedulerAlg.EDF) {
            this.EDF();
        }

        else if (this.alg == SchedulerAlg.LST) {
            this.LST();
        }
        else {  // Shouldn't happen, but 🤷‍♂
            console.error("Something went wrong");
        }
    }

    private FIFO() {
        console.log("FIFO");
        let time: number = 0;
        for (let i: number = 0; i < this.tasks.length; i++) {
            this.tasks[i].passMsg(ISimMessage.Start, time);
            time += this.tasks[i].ops.length;
            this.tasks[i].passMsg(ISimMessage.Finish, time);
        }
    }

    private RoundRobin(quantum: number) {
        console.log("Round Robin", quantum);
        let time: number = 0;
        while (this.jobsNotFinished()) {
            console.log("Not finished");
            for (let i: number = 0; i < this.tasks.length; i++) {
                this.tasks[i].passMsg(ISimMessage.Start, time);
                time += quantum;
                this.tasks[i].passMsg(ISimMessage.Stop, time);

                if (this.tasks[i].isFinished() && !this.tasks[i].finished) {
                    this.tasks[i].passMsg(ISimMessage.Finish, time);
                }
            }
        }
    }

    private EDF() {
        console.log("EDF");
    }

    private LST() {
        console.log("LST");
        let time: number = 0;
        let lastTask: number = -1;
        let finalRound: boolean = false;
        while (this.jobsNotFinished() || finalRound) {
            let things: Task[] = [];

            for (let i: number = 0; i < this.tasks.length; i++) {
                if (!this.tasks[i].isFinished()) {
                    things.push(this.tasks[i]);
                }
            }

            // Find task with least slack remaining
            things.sort((a: Task, b: Task) => {
                let aSlack: number = a.getSlackTime();
                let bSlack: number = b.getSlackTime();

                if (aSlack < bSlack)
                    return -1;
                else if (aSlack == bSlack)
                    return 1;
                else
                    return 0;
            });

            if (things.length == 0) {
                break;
            }
            else if (things[0].id != lastTask) {  // LST Task changed
                if (lastTask != -1)
                    this.tasks[lastTask].passMsg(ISimMessage.Stop, time);
                this.tasks[things[0].id].passMsg(ISimMessage.Start, time);
                lastTask = things[0].id;
            }
            else { //Same task
                this.tasks[things[0].id].passMsg(ISimMessage.Stay, time);
            }

            time++;
        }
    }

    private jobsNotFinished(): boolean {
        let bail: boolean = false;
        for (let i: number = 0; i < this.tasks.length; i++) {
            if (!this.tasks[i].finished) {
                bail = true;
            }
        }
        return bail;
    }
}

export default Simulator;