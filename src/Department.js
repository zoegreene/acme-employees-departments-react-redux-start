import React from 'react';
import Employees from './Employees';
import { connect } from 'react-redux';

const Department = (props) => {
  return (
    <li>
      <span className='department-title'>
        { props.name }
        < Employees departmentId={ props.id } />
      </span>
    </li>
  )
}

const mapStateToProps = state => {
  return {
    departments: state.departments,
    employeees: state.employees
  }
}

export default connect(mapStateToProps)(Department);
