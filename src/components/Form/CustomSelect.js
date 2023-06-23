import React, {Component} from 'react'
import './CustomSelect.css';
import Parser from 'html-react-parser'
import ic_dropdown from '../../assets/images/ic_down_arrow.png'
class CustomSelect extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            value: this.props.defaultValue.value
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            value: event.target.value
        })

        this.props.callback({
            value: event.target.value,
            label: event.target.value
        });
    }

    componentDidMount(){
        
    }
    
    render() {
        // menuIsOpen={true}
        var option_html = '';
        for(var index = 0; index < this.props.options.length; index++){
            option_html = option_html + '<option value="' + this.props.options[index].value + '">' + this.props.options[index].label + '</option>';
        }
        return(
            <div className="custom-select-wrap">
                <select className="custom-select-container" onChange={this.handleChange} value={this.state.value} onBlur={this.handleChange}>
                    {Parser(option_html)}
                </select>
                <img className="custom-select-dropdown-icon" src={ic_dropdown}></img>
            </div>
        );
        
    }
}
export default CustomSelect