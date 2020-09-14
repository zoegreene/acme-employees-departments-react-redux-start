import axios from 'axios';
import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger'

// Action types
const UPDATE_DEPARTMENTS = 'UPDATE_DEPARTMENTS';
const UPDATE_EMPLOYEES = 'UPDATE_EMPLOYEES';
const DESTROY_EMPLOYEE = 'DESTROY_EMPLOYEE';
const REMOVE_FROM_DEPARTMENT = 'REMOVE_FROM_DEPARTMENT';

// Action creators
const updateDepartments = dpmts => (
  {
    type: UPDATE_DEPARTMENTS,
    dpmts
  }
);
const updateEmployees = emps => (
  {
    type: UPDATE_EMPLOYEES,
    emps
  }
);
const destroyEmployee = id => (
  {
    type: DESTROY_EMPLOYEE,
    id
  }
);
const removeFromDepartment = id => (
  {
    type: REMOVE_FROM_DEPARTMENT,
    id
  }
);

const thunkedDestroyEmployee = async (id) => {
  await axios.delete(`/api/employees/${id}`);
  store.dispatch(destroyEmployee(id));
};

const thunkedRemoveFromDepartment = async (id) => {
  await axios.put(`/api/employees/${id}`, { departmentId: null });
  store.dispatch(removeFromDepartment(id));
};

const initialState = {
  employees: [],
  departments: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_DEPARTMENTS:
      const departments = action.dpmts;
      return { ...state, departments };
    case UPDATE_EMPLOYEES:
      const employees = action.emps;
      return { ...state, employees };
    case DESTROY_EMPLOYEE:
      const employees1 = state.employees.filter(_employee => action.id !== _employee.id);
      return { ...state, employees: employees1 };
    case REMOVE_FROM_DEPARTMENT:
      const employees2 = state.employees.map(_employee => {
        if (action.id === _employee.id) {
          _employee.departmentId = null;
        }
        return _employee;
      });
      return { ...state, employees: employees2 };
    default:
      return state;
  }

}

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
export {
  updateDepartments,
  updateEmployees,
  destroyEmployee,
  thunkedDestroyEmployee,
  removeFromDepartment,
  thunkedRemoveFromDepartment
};
