import React, {Component} from 'react';
import SD from 'react-sequence-diagram';
export default class SequenceDiagram extends Component{
    componentDidMount(){

    }
    componentWillUnmount(){
    }
    onError(err){
        console.log('SEQUENCE DIAGRAM ON ERROR',err)
    }
    render (){
        let renderInput;
        switch(this.props.items.length){
            case 0:
                break;
            default:
                renderInput = this.props.items
                    .sort((a,b)=>a.timestamp > b.timestamp? 1 : -1)
                    .map(cur=>`${cur.from}-->${cur.to}:${cur.msg}`)
                    .reduce((acc,curr)=>`${acc}\n${curr}\n`);
        }
        console.log('renderinput : ',renderInput);
        return (

            <div>
                <h1>{this.props.title? this.props.title : 'untitled diagram'}</h1>
                {this.props.items && this.props.items.length > 0 ? (
                        <SD
                            input={renderInput}
                            options={{theme: 'simple'}}
                            onError={this.onError}
                        />)
                    : <h4>Nothing in diagram yet.</h4>
                }

            </div>
        )
    }

}