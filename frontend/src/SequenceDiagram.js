import React, {Component} from 'react';
import SD from 'react-sequence-diagram';
export default class SequenceDiagram extends Component{
    state = {
        items: [],
        title:'seqvis sample'
    }
    componentDidMount(){
        this.interfunc = setInterval(()=>{
            this.setState((prevState)=>({items: [...prevState.items,`A->B: new Item as of date: ${Date.now()}`]}))
        },2000);

    }
    componentWillUnmount(){
        clearInterval(this.interfunc);
    }
    onError(err){
        console.log('SEQUENCE DIAGRAM ON ERROR',err)


    }
    render (){
        let renderInput = `title: ${this.state.title} \n`;
        switch(this.state.items.length){
            case 0:
                break;
            default:
                renderInput += this.state.items.reduce((acc,curr)=>acc +'\n'+ curr + '\n');
        }
        console.log('renderinput : ',renderInput);
        return (

            <div>
                <SD
                    input={renderInput}
                options={{theme:'simple'}}
                onError={this.onError}
                />

            </div>
        )
    }

}