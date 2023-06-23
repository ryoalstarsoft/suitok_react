import React, {Component} from 'react'
import CONST from '../../global/const'
import { callbackify } from 'util';

class FormCheck extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: this.props.value,
        }

        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    componentDidMount(){
    }

    handleCheckbox(){

        this.setState({
            value: !this.state.value
        })

        this.props.callback(!this.state.value);
    }

    render() {

        var wrap_class = "form-field-wrap field--checkbox";

        if(this.props.hasError || this.props.fieldError === CONST.FIELD_ERR.EMPTY){
            wrap_class = wrap_class + ' error--empty';
        }

        if(this.props.hasOwnProperty('hasErrorField') && !this.props.hasErrorField){
            wrap_class = wrap_class + ' no--errorField';
        }

        if(this.props.msgDesc && this.props.msgDesc !== ''){
            wrap_class = wrap_class + ' has--description';
        }

        var input_wrap_class="form-field__input-wrap";

        if(this.props.type === CONST.FORM_INPUT.PASSWORD){
            input_wrap_class = input_wrap_class + ' input--has-title';
        }

        return(
            <div className={wrap_class}>
                <div className="form-field-row">
                    <div className="form-field-col">
                        <label className="form-check-wrap">{this.props.label}
                            <input type="checkbox" name="" defaultChecked={this.state.value} onChange={this.handleCheckbox}></input>
                            <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <label className="form-field__error">{this.props.msgError}</label>
            </div>
        );

    }
}
export default FormCheck