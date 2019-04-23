/* tslint:disable */ // Hide our crimes from tsc

import * as React from 'react';

const contextStr: string = "2d";
const refStr: string = "canvas";

class Canvas extends React.Component<{}, {}> {
    private ctx: any;
    private canvas: any;

    public componentDidMount() {
        this.canvas = refStr;
        this.ctx = this.canvas.getContext(contextStr);
    }

    public getCtx(): any {
        return this.ctx;
    }

    public render() {
        return (
            <div>
                <canvas ref={refStr} width={640} height={425} />
            </div>
        )
    }
}
export default Canvas;