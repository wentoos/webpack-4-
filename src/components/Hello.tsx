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
        console.log(mySearch('11','qqqq1'));
        return <h1>{this.props.compiler} and {this.props.framework}!</h1>;
    }
}
