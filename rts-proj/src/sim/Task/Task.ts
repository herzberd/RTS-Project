/* tslint:disable */
export interface ITask {
    parent: number;
    id: number;
    period: number;
    deadline: number;
    dependencies: number[];
    ops: number[];
}

const highestOpCode: number = 2;

class Task implements ITask {
    public parent: number;
    public id: number;
    public period: number;
    public deadline: number;
    public dependencies: number[];
    public ops: number[];

    // @ts-ignore
    private awaitng: number[];

    public constructor(params?: ITask) {
        this.parent = 0;
        this.id = 0;
        this.period = 0;
        this.deadline = 0;

        if (params) {
            this.parent = params.parent;
            this.id = params.id;
            this.period = params.period;
            this.deadline = params.deadline;
            console.log(this.id);
        }

        this.dependencies = [];
        this.ops = [];
    }

    publicGenOps(numTasks: number, variance?: number) {
        let randTasks: number = numTasks;
        if (variance) {
            let val: number = Math.floor((Math.random() * 10)) % variance;
            let sign: number = Math.floor((Math.random() * 10)) % 2;
            if (sign) {
                randTasks += val;
            } else {
                randTasks -= val;
            }
            console.log(randTasks, variance, val);
        }
        for (let i: number = 0; i < randTasks; i++) {
            this.ops.push(Math.floor((Math.random() * 10)) % (highestOpCode + 1));
        }
    }
}

export default Task;