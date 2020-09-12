const express = require('express');
const path = require('path');
const { syncAndSeed, models: { Employee, Department } } = require('./db');


const app = express();
app.use(require('express').json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));


app.delete('/api/employees/:id', async(req, res, next)=> {
  try {
    await Employee.destroy({ where: { id: req.params.id }});
    res.sendStatus(204);

  }
  catch(ex){
    next(ex);
  }

});

app.put('/api/employees/:id', async(req, res, next)=> {
  try {
    const employee = await Employee.findByPk(req.params.id);
    await employee.update(req.body);
    res.send(employee);
  }
  catch(ex){
    next(ex);
  }

});

app.get('/api/employees', async(req, res, next)=> {
  try {
    res.send(await Employee.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/departments', async(req, res, next)=> {
  try {
    res.send(await Department.findAll());
  }
  catch(ex){
    next(ex);
  }
});

const port = process.env.PORT || 3000;

const init = async()=> {
  await syncAndSeed()
  app.listen(port, ()=> console.log(`listening on port ${port}`));
}

init();
