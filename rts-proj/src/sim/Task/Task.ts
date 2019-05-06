/* tslint:disable */
export interface ITask {
    id: number;
    period: number;
    deadline: number;
    dependencies: number[];
    ops: number;
    messages: any[];
}

export interface ITaskResults {
    coreSwaps: number;
    finishTime: number;
}

export enum ISimMessage {
    Start = 0,
    Stop,
    Finish,
    SwitchCore,
    Stay
}

class Task implements ITask {
    public id: number;
    public period: number;
    public deadline: number;
    public phase: number;
    public dependencies: number[];
    public ops: number;
    public messages: any[];
    public finished: boolean;

    private irCount: number;
    private lastStart: number;

    public constructor(params?: ITask) {
        this.id = 0;
        this.period = 0;
        this.deadline = 0;
        this.irCount = 0;
        this.lastStart = 0;

        if (params) {
            this.id = params.id;
            this.period = params.period;
            this.deadline = params.deadline;
            // console.log(this.id);
        }

        this.dependencies = [];
        this.ops = 0;
        this.messages = [];
    }

    public isFinished(): boolean {
        return (this.irCount + 1 >= this.ops);
    }

    public reset(){
        this.irCount = 0;
        this.lastStart = 0;
        this.finished = false;
    }

    public passMsg(flag: ISimMessage, value: any) {
        // Store this message in the message log
        this.messages.push({
            flag: flag,
            value: value
        });

        switch (flag) {
            case ISimMessage.Start:
                this.lastStart = value; 
                break;
            case ISimMessage.Stop:
                this.irCount += (value - this.lastStart);
                break;
            case ISimMessage.Finish:
                this.irCount += (value - this.lastStart);
                this.finished = true;
                console.log("Task " + this.id + " met deadline: ", this.metDeadline());
                console.log("Task " + this.id + " msg log", this.messages);
                break;
            case ISimMessage.Stay:
                this.irCount += (value - this.lastStart);
                if(this.isFinished()){  // Finished on Stay
                    this.passMsg(ISimMessage.Finish, value);
                }
                break;
        }
    }

    public getSlackTime(): number {
        return this.ops - this.irCount;
    }

    public metDeadline(): boolean {
        return (this.messages[this.messages.length - 1]["value"] <= this.deadline);
    }

    public GenOps(numTasks: number, variance?: number) {
        let randTasks: number = numTasks;
        if (variance) {
            let val: number = Math.floor((Math.random() * 10)) % variance;
            let sign: number = Math.floor((Math.random() * 10)) % 2;
            if (sign) {
                randTasks += val;
            } else {
                randTasks -= val;
            }
            this.ops = randTasks;
            // console.log(randTasks, variance, val);
        }
        this.deadline = this.ops + Math.floor((Math.random() * this.ops) * (Math.random() * 7));
    }
}

export default Task;