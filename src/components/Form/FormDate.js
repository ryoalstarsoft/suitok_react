import React, {Component} from 'react'
import FormSelect from './FormSelect'
import CustomSelect from './CustomSelect'
import CONST from '../../global/const'

class FormDate extends Component {

    constructor(props){
        super(props);

        this.days = [];
        this.days.push({
            value: 0,
            label: 'Day'
        });
        var day_label = 'Day';
        for(var day = 1; day < 32; day++){
            this.days.push({
                value: day,
                label: day
            });

            if(day == this.props.value.day){
                day_label = day;
            }
        }

        this.months = [
            { value: 0, label: 'Month'},
            { value: 1, label: 'January'},
            { value: 2, label: 'February'},
            { value: 3, label: 'March'},
            { value: 4, label: 'April'},
            { value: 5, label: 'May'},
            { value: 6, label: 'June'},
            { value: 7, label: 'July'},
            { value: 8, label: 'August'},
            { value: 9, label: 'September'},
            { value: 10, label: 'October'},
            { value: 11, label: 'November'},
            { value: 12, label: 'December'}
        ];
        var month_label = '';
        for(var mindex = 0; mindex < this.months.length; mindex++){
            if(this.months[mindex].value === this.props.value.month){
                month_label = this.months[mindex].label;
            }
        }

        this.years = [];
        this.years.push({
            value: 0,
            label: 'Year'
        });

        var year_label = 'Year';
        for(var year = this.props.yearMax; year >= this.props.yearMin; year--){
            this.years.push({
                value: year,
                label: year
            });
            if(this.props.value.year === year){
                year_label = year;
            }
        }

        this.state = {
            value: this.props.value,
            day: {
                value: this.props.value.day,
                label: day_label
            },
            month: {
                value: this.props.value.month,
                label: month_label
            },
            year: {
                value: this.props.value.year,
                label: year_label
            },

            col_class_day: 'not--empty',
            col_class_month: 'not--empty',
            col_class_year: 'not--empty',
            errorEmpty: false
        };

        this.callbackDay = this.callbackDay.bind(this);
        this.callbackMonth = this.callbackMonth.bind(this);
        this.callbackYear = this.callbackYear.bind(this);
    }

    componentDidMount(){

    }

    callbackDay(data){
        this.props.callback({
            year: this.state.year.value,
            month: this.state.month.value,
            day: data.value,
            changedField: 'day'
        });

        var new_state = {};
        new_state['day'] = data;
        if(parseInt(data.value) == 0){
            new_state['errorEmpty'] = true;
            new_state['col_class_day'] = '';
        }
        else{
            new_state['errorEmpty'] = false;
            new_state['col_class_day'] = 'not--empty';
        }

        this.setState(new_state);
    }

    callbackMonth(data){
        this.props.callback({
            year: this.state.year.value,
            month: data.value,
            day: this.state.day.value,
            changedField: 'month'
        });

        var new_state = {};
        new_state['month'] = data;

        if(parseInt(data.value) == 0){
            new_state['col_class_month'] = '';
            new_state['errorEmpty'] = true;
        }
        else if(parseInt(this.state.day.value) == 0){
            new_state['col_class_day'] = '';
            new_state['col_class_month'] = 'not--empty';
            new_state['errorEmpty'] = true;
        }
        else{
            new_state['errorEmpty'] = false;
            new_state['col_class_month'] = 'not--empty';
        }

        this.setState(new_state);
    }

    callbackYear(data){
        this.props.callback({
            year: data.value,
            month: this.state.month.value,
            day: this.state.day.value,
            changedField: 'year'
        });
        var new_state = {};
        new_state['year'] = data;
        if(parseInt(data.value) == 0){
            new_state['col_class_year'] = '';
            new_state['errorEmpty'] = true;
        }
        else if(parseInt(this.state.day.value) == 0 || parseInt(this.state.month.value) == 0){
            if(parseInt(this.state.day.value) == 0){
                new_state['col_class_day'] = '';
            }
            if(parseInt(this.state.month.value) == 0){
                new_state['col_class_month'] = '';
            }
            new_state['col_class_year'] = 'not--empty';
            new_state['errorEmpty'] = true;
        }
        else{
            new_state['col_class_year'] = 'not--empty';
            new_state['errorEmpty'] = false;
        }

        this.setState(new_state);
    }

    changeState(new_state){
        this.setState(new_state);
    }

    render() {
        var wrap_class = "form-field-wrap";
        var wrap_class_error = false;
        var wrap_class_desc = false;

        var input_wrap_class="form-field__input-wrap";

        if(this.props.type === CONST.FORM_INPUT.PASSWORD){
            input_wrap_class = input_wrap_class + ' input--has-title';
        }

        var col_class_day = 'not--empty';
        var col_class_month = 'not--empty';
        var col_class_year = 'not--empty';
        col_class_day = this.state.col_class_day;
        col_class_month = this.state.col_class_month;
        col_class_year = this.state.col_class_year;

        console.log(this.state);

        if(this.props.fieldError === CONST.FIELD_ERR.EMPTY){
            // wrap_class = wrap_class + ' error--empty';
            wrap_class_error = true;
        }

        if(this.state.errorEmpty){
            wrap_class_error = true;
        }

        if(this.props.msgDesc && this.props.msgDesc !== ''){
            // wrap_class = wrap_class + ' has--description';
            wrap_class_desc = true;
        }

        if(wrap_class_error){
            wrap_class = wrap_class + ' error--empty';
        }

        if(wrap_class_desc){
            wrap_class = wrap_class + ' has--description';
        }


        return(
            <div className={wrap_class}>
                <label className="form-field__title">{this.props.label}</label>
                <div className="form-field-row">
                    <div className={"form-field-col-3 " + col_class_day}>
                        <CustomSelect
                            defaultValue={this.state.day}
                            options={this.days}
                            isSearchable={false}
                            callback={this.callbackDay}
                        />
                    </div>
                    <div className={"form-field-col-3 " + col_class_month}>
                        <CustomSelect
                            defaultValue={this.state.month}
                            options={this.months}
                            isSearchable={false}
                            callback={this.callbackMonth}
                        />
                    </div>
                    <div className={"form-field-col-3 " + col_class_year}>
                        <CustomSelect
                            defaultValue={this.state.year}
                            options={this.years}
                            isSearchable={false}
                            callback={this.callbackYear}
                        />
                    </div>
                </div>
                <label className="form-field__error">{this.props.msgError}</label>
            </div>
        );

    }
}
export default FormDate