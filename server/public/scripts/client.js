/* jshint esversion: 6 */
console.log('in client.js');

let allEmployees = [];
let totalMonthlyExpenses=0;

class Employee{
  constructor(firstNameIn, lastNameIn, iDNumberIn, titleIn, salaryIn){
    this.firstName = firstNameIn;
    this.lastName = lastNameIn;
    this.iDNumber = iDNumberIn;
    this.title = titleIn;
    this.salary = salaryIn;
  }
}

$(document).ready(readyNow);

function readyNow(){
  console.log("in jq: readyNow");
  $('#submit').on('click', submitEmployees);//on click runs submitEmployees func
  $('#table').on('click', '.deleteButton', deleteTheEmployee);//runds deleteTheEmployee
}

//gets the vals of user input
//makes new employee class
function submitEmployees(){
  console.log('in submitEmployees');
  let firstName = $('#employeeFirstName').val();
  let lastName = $('#employeeLastName').val();
  let iDNum = $('#employeeID').val();
  let title = $('#employeeTitle').val();
  let salary = $('#employeeSalary').val();
  //checks inputs, if full creates new employee, adds to dom
  if(checkInputs(firstName, lastName, iDNum, title, salary)){
    console.log('firstName: ' + firstName + 'lastName ' + lastName + 'idnum '+
                        iDNum + "title: " + title + 'salary: ' +salary);
    let newEmployee = addEmployee(firstName, lastName, iDNum, title, salary);

    clearInputs();//sets inputs to ''
    addToDom(newEmployee);//takes new employee object and adds to dom
    addSalaryToDom(monthlyCost());//takes in the monthly cost, appends to dom
    checkIfOverBudget();//if over budget changes class to red
  }//end if
  else{
    alert('Please fill out all Inputs');
    clearInputs();
  }//end else
}//end submitEmployees

//creates new employee from constructor, pushes it into allEmployees array
function addEmployee(first, last, iD, title, salary){
  let newEmployee = new Employee(first, last, iD, title, salary);
  allEmployees.push(newEmployee);
  //console.log('in addEmployee, new employee: ' + newEmployee);

  return newEmployee;

}//end addEmployee

//sets inputs to ''
function clearInputs(){
  $('#employeeFirstName').val('');
  $('#employeeLastName').val('');
  $('#employeeID').val('');
  $('#employeeTitle').val('');
  $('#employeeSalary').val('');
}

//adds the newest employee to the table
function addToDom(newEmployee){

  let table = $('<tr class="employeeRow dataTest" data-salary = "' + newEmployee.salary +
                '" data-id = "' + newEmployee.iDNumber + '"></tr>');//makes the initial table row


  table.append('<td>'+newEmployee.firstName+'</td>');
  table.append('<td>'+newEmployee.lastName+'</td>');
  table.append('<td>'+newEmployee.iDNumber+'</td>');
  table.append('<td>'+newEmployee.title+'</td>');

  //this makes a unique jquery object and attaches data too it
  // let deleteButton = $('<td><button class="deleteButton">Delete</button> </td>');
  // deleteButton.data('employee', employee);


  table.append('<td class="salaryInTable">'+newEmployee.salary+'</td>');
  table.append('<td><button class="deleteButton">Delete</button> </td>');
  table.data('employeeData', newEmployee);


  $('#table').append(table);

//this refers to all buttons
  // $('button').data('salary', newEmployee.salary);

  // console.log('in appendtoDom test table.data' + table.data('salary'));

 //   $('#table').children().first().children().last().data('salary', newEmployee.salary);
 //   console.log('#' + $('#table').children().first().children().last().data('salary'));
 //
}

//loops through allEmployees array, adds up salary, divides by 12 and returns value
function monthlyCost(){
  let monthCost=0;
  allEmployees.forEach(function(employee){
    monthCost+=parseInt(employee.salary);
  });
  monthCost=monthCost/12;
  monthCost=monthCost.toFixed(2);
  console.log('in montly Cost' + monthCost);

  return monthCost;
}

//appends salary to dom
function addSalaryToDom(monthlyExpenses){
  //let monthlyExpenses = monthlyCost();
  $('#totalSalaryH3').text('Monthly Cost: '+ monthlyExpenses);
}

//if over buget changes class, else class is green
function checkIfOverBudget(){
  if(monthlyCost()>20000){
    $('#totalSalaryH3').attr('class', 'red');
  }
  else {
    $('#totalSalaryH3').attr('class', 'green');
  }
}

//on click gets salary and Id data, removes employee from array,
//recalculates monthlyCost, removes row from table
function deleteTheEmployee(){
  let salary = $(this).parent().parent().data('employeeData').salary;
  let iDNumber = $(this).parent().parent().data('employeeData').iDNumber;



  //loops through array, finds employee with matching id and removes it.
  removeDeletedEmployeeFromArray(iDNumber);

  addSalaryToDom(monthlyCost());
  //this is the button, its grandparent is the row, removes entire row
  $(this).parent().parent().remove();
}

//loops through array with findIndex, checks if id numbers match
//splices out matching index
function removeDeletedEmployeeFromArray(iDNumber){
  let index = allEmployees.findIndex(function(employee){
    return employee.iDNumber == iDNumber;
  });
  allEmployees.splice(index, 1);
}

// checks if user filled out all inputs
//returns true or false
function checkInputs(first, last, iD, title, salary){
  let empty = '';
  if(first && last && iD && title && salary != empty){
    console.log('true! no field empty');
    return true;
  }
  else {
    console.log('false, a field was empty');
    return false;
  }
}



//end
