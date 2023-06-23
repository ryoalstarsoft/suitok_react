import React, {Component} from 'react'
import Select from 'react-select'
import chroma from 'chroma-js';
import './FormSelect.css';

class FormSelect extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            value: this.props.value
        }

        this.handleBlur = this.handleBlur.bind(this);
    }

    componentDidMount(){
        
    }

    handleBlur(){
        this.props.callback();
    }
    
    render() {
        // menuIsOpen={true}

        return(
            <div className="select-wrap">
                <Select
                    defaultValue={this.props.defaultValue}
                    options={this.props.options}
                    className='custom-react-select-container'
                    classNamePrefix="custom-select"
                    closeMenuOnSelect={true}
                    menuShouldScrollIntoView={false}
                    menuShouldBlockScroll={true}
                    isSearchable={this.props.isSearchable}
                    onChange={this.props.callback}
                    onInputChange={this.props.callbackInput}
                    noOptionsMessage={this.props.noOptionsMessage}
                />
            </div>
        );
        
    }
}
export default FormSelect