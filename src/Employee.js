import React from 'react';
import { connect } from 'react-redux';
import { thunkedDestroyEmployee, thunkedRemoveFromDepartment } from './store';

// must reload employees after destroy employee and remove from dept

const Employee = ({ name, id, departmentId })=> {
  return (
    <li>
      { name }
      { <button onClick={ ()=> thunkedDestroyEmployee(id)}>x</button> }
      { departmentId !== null ? <button onClick={ ()=> thunkedRemoveFromDepartment(id)}>Remove From Department</button> : ''}
    </li>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    thunkedDestroyEmployee: function(id) {
      dispatch(thunkedDestroyEmployee(id));
    },
    thunkedRemoveFromDepartment: function(id) {
      dispatch(thunkedRemoveFromDepartment(id));
    }
  }
}

export default connect(null, mapDispatchToProps)(Employee);
