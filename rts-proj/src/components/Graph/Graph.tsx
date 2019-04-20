import { ActionButton } from 'office-ui-fabric-react';
import * as React from 'react';
import Canvas from '../../common/Canvas/Canvas';
import './Graph.css';

class Graph extends React.Component<{}, {}>{

    private canvas: Canvas;

    public render() {
        return (
            <div className="GraphMain">
                {this.canvas}
                <ActionButton
                    onClick={this.test}
                />
            </div>
        );
    }

    private test = () => {
        alert("Just a test");
    }
}

export default Graph;