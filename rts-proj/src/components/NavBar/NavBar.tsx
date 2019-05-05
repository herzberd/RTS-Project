import { INavLink, INavLinkGroup, Nav } from 'office-ui-fabric-react';
import * as React from 'react';
import './NavBar.css';

interface INavBarProps {
    panelCallback: any;
}

class NavBar extends React.Component<INavBarProps, {}>{
    private groups: INavLinkGroup[] = [];
    private links: INavLink[] = [];

    public constructor(props: INavBarProps) {
        super(props);

        this.links = [
            {
                name: "Task Generator",
                onClick: () => {
                    alert("Test");
                },
                url: "",
            },
            {
                name: "Configure Simulation",
                onClick: () => {
                    this.props.panelCallback()
                },
                url: ""
            }
        ];

        this.groups = [{
            links: [...this.links]
        }];
    }

    public render() {
        return (
            <div className="NavBarMain">
                <p>RTS Project</p>
                <Nav
                    groups={this.groups}
                />
            </div>
        );
    }
}

export default NavBar;