const employees=require('../data.json')
const _ = require('lodash');

const { DataSource } = require('apollo-datasource');

class EmployeeDataSource extends DataSource {
    constructor(){
        super();
    }

    initialize(config) {
       
    }
    getEmployees(args){
        return _.filter(employees, args);
    }

    findEmployee({ id }) {
        return employees.filter(emp => emp.id.toString() === id);
        }
    }





module.exports = EmployeeDataSource;
