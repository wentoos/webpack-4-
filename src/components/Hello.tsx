import React from "react";

export interface HelloProps { compiler: string; framework: string; }
interface SearchFunc {
    (source: string, subString: string)
}
let mySearch = function (source: string, subString: string) {
    let result = source.search(subString);
    return result 
}
export class Hello extends React.Component<HelloProps, {}> {
    render() {
        interface SquareConfig {
            color?: string;
            width?: number;
        }

        function createSquare(config: SquareConfig): { color?: string; area?: number } {
            let newSquare = { color: "white", area: 100 };
            if (config.color) {
                newSquare.color = config.color;
            }
            if (config.width) {
                newSquare.area = config.width * config.width;
            }
            return {};
        }

        let mySquare = createSquare({ colors: "black", widths: 1 } as SquareConfig);
        return <h1>{this.props.compiler} and {this.props.framework}!</h1>;
    }
}
