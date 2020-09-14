import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Employee from './Employee';
import { updateEmployees } from './store';

class Employees extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const employees = (await (axios.get('/api/employees'))).data;
    this.props.updateEmployees(employees);
  }

  render() {
    return (
      <ul>
        {
          this.props.employees
            .filter( employee => employee.departmentId === this.props.departmentId)
            .map( employee => <Employee { ...employee } key={ employee.id }/>)
        }
      </ul>
    );
  }

};

const mapStateToProps = state => {
  return { employees: state.employees }
}

const mapDispatchToProps = dispatch => {
  return {
    updateEmployees: function(emps) {
      dispatch(updateEmployees(emps));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
