import { INavLink, INavLinkGroup, Nav } from 'office-ui-fabric-react';
import * as React from 'react';
import './NavBar.css';

class NavBar extends React.Component<{}, {}>{
    private groups: INavLinkGroup[] = [];
    private links: INavLink[] = [];

    public constructor(props: any) {
        super(props);

        this.links = [
            {
                name: "Test",
                onClick: () => {
                    alert("Test");
                },
                url: "",
            }
        ];

        this.groups = [{
            links: [...this.links]
        }];
    }

    public render() {
        return (
            <div className="NavBarMain">
                <p>NavBar</p>
                <Nav
                    groups={this.groups}
                />
            </div>
        );
    }
}

export default NavBar;