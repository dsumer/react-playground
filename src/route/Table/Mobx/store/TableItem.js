import {observable} from "mobx";
import moment from "moment";

export default class TableItem {
    @observable name = '';
    @observable age = 0;
    @observable date = moment();

    constructor(data) {
        this.name = data.name;
        this.age = data.age;
        this.date = data.date;

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
    }

    onChangeName(event) {
        this.name = event.target.value;
        this.age++;
    }

    onChangeDate(date) {
        this.date = date;
    }
}