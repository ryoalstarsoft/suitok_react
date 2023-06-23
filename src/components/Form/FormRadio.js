import React, {Component} from 'react'
import CONST from '../../global/const'

class FormRadio extends Component {

    constructor(props){
        super(props);
        this.state = {
            value: this.props.value
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
    }

    handleChange(event){

        this.setState({
            value: event.target.value
        });

        this.props.callback(event.target.value);
    }

    render() {

        var wrap_class = "form-field-wrap";

        if(this.props.hasError || this.props.fieldError === CONST.FIELD_ERR.EMPTY){
            wrap_class = wrap_class + ' error--empty';
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
                <label className="form-field__title">{this.props.label}</label>
                <div className="form-field-row align-flex-start">
                    <div className="form-field-col-2">
                        <label className="form-radio-wrap">
                            <input type="radio" name="gender"
                                value={CONST.FGENDER.FEMALE}
                                onChange={this.handleChange}
                                checked={this.state.value === CONST.FGENDER.FEMALE}
                            ></input>
                            <span>Female</span>
                            <span className="checkmark female"></span>
                        </label>
                    </div>
                    <div className="form-field-col-2">
                        <label className="form-radio-wrap">
                            <input type="radio" name="gender"
                                value={CONST.FGENDER.MALE}
                                onChange={this.handleChange}
                                checked={this.state.value === CONST.FGENDER.MALE}
                            ></input>
                            <span>Male</span>
                            <span className="checkmark male"></span>
                        </label>
                    </div>
                </div>
                <label className="form-field__error">{this.props.msgError}</label>
            </div>
        );
    }
}

export default FormRadio