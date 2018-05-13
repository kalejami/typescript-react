import * as React from "react";
import {COMMENTS_URL} from "../URL";

export interface HelloState {
    comments: Array<Comment>;
}

export class Hello extends React.Component<{}, HelloState> {

    constructor(props: any){
        super(props);
        this.state = {comments: new Array<Comment>()};
    }

    componentDidMount() {
        getComments('Hallo_Welt').then(comments => this.setState({comments: comments}));
    }

    render() {
        return (
        <div>
            <table>
                <tbody>
                <tr>
                    <th>Title</th>
                    <th>Comment</th>
                </tr>
                { this.state.comments.map(comment => {
                    return (
                    <tr>
                        <td>{comment.title}</td>
                        <td>{comment.body}</td>
                    </tr>);
                })
                }
                </tbody>
            </table>
        </div>);
    }
}

export interface Comment {
    userId: string;
    id: string;
    title: string;
    body: string;
}

function getComments(name: string): Promise<Comment[]> {
    let url: string = COMMENTS_URL + name
    return fetch(url)
    .then(response => response.json())
    .then(json => 
        json.map((item: any) => {
            return {
                userId: item.userId, 
                id: item.id, 
                title: item.title,
                body: item.body 
            };
        })
    );
}