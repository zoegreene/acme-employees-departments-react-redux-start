import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { updateDepartments } from './store';
import Department from './Department';

class Departments extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    const departments = (await (axios.get('/api/departments'))).data;
    this.props.updateDepartments(departments);
  }

  render() {
    return (
      <ul className='departments'>
        <Department name={ 'No Department' } id={ null }/>
        { this.props.departments.map(department => {
          return (
            <Department key={ department.id } { ...department } />
          )
        }) }
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return { departments: state.departments }
}

const mapDispatchToProps = dispatch => {
  return {
    updateDepartments: function(dpmts) {
      dispatch(updateDepartments(dpmts));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Departments);
