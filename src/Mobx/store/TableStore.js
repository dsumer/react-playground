import {observable, computed, action, toJS} from 'mobx';
import TableItem from "./TableItem";
import moment from "moment";

export default class TableStore {
    @observable data = [];
    @observable filter = '';

    constructor(data) {
        for(var i = 0; i < data.length; i++) {
            this.data.push(new TableItem(data[i]));
        }

        this.addItem = this.addItem.bind(this);
        this.remove = this.remove.bind(this);
        this.sortBy = this.sortBy.bind(this);
        this.sortByName = this.sortByName.bind(this);
        this.changeFilter = this.changeFilter.bind(this);
    }

    @computed get filteredData() {
        return toJS(this.data.filter((row) => {
            return row.name.toLowerCase().indexOf(this.filter.toLowerCase()) > -1;
        }));
    }

    @action
    addItem() {
        this.data.push(new TableItem({
            name: 'ASD',
            age: 11,
            date: moment()
        }));
    }

    @action
    sortByName(ascending) {
        this.data.replace(this.data.sort((a, b) => {
            if (ascending) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        }));
    }

    @action
    sortBy(prop, ascending) {
        this.data.replace(this.data.sort((a, b) => {
            if (a[prop] < b[prop]) {
                return ascending ? -1 : 1;
            }
            if (a[prop] > b[prop]) {
                return ascending ? 1 : -1;
            }
            return 0;
        }));
    }

    @action
    remove(index) {
        this.data.splice(index, 1);
    }

    @action
    changeFilter(event) {
        this.filter = event.target.value;
    }
}