var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Hola123!",
  database: "trackerdb"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch(){
inquirer.prompt(
    {
        name: "questionOne",
        type: "list", 
        message: " What would you like to do ?",
        choices: 
            [
            "Add departments" , 
            "Add Roles",
            "Add Employees",
            "View Deparments",
            "View Roles",
            "View Employees", 
            "Update Employee Role", 
            ]
    }
).then(function(answer)
    {
        console.log(answer);
        if(answer.questionOne === "View Deparments")
        {
            view("department");
        }
        else if(answer.questionOne === "View Roles")
        {
             view("role");

        }
        else if(answer.questionOne === "View Employees")
        {
            view("employee");

        }
        else if(answer.questionOne=== "Add departments")
        {   
            addDepartment ("department")
        }
        else if(answer.questionOne==="Add Roles")
        {   
            addRole(); 

        }
        else if(answer.questionOne === "Add Employees")
        {
            addEmployee();
        }

        
        })

}

function view (tableName)
{
    connection.query("SELECT * FROM " + tableName, function(err, results) {
    if (err) throw err;
    console.log(results); 

    })
};

function addDepartment (tableName)
{inquirer.prompt
    ({name: "departmentQuestionOne", 
    type: "input", 
    message: "What department would you like to add?"
    
}).then(function(respuestas)
{   
    insertNewDepartment(respuestas.departmentQuestionOne);     
    console.log(respuestas); 
}); 
    
}

function insertNewDepartment (newDepartmentName)
{   connection.query("INSERT INTO department SET ?",
        {  
            name: newDepartmentName, 

        },function(err){
             if (err) throw err;

        });
}


function addRole()
{   // 1. do query to find all departments. 
    connection.query("SELECT * FROM department" , function(err, results) {
    if (err) throw err;
    // console.log(results);
    // map to return department id and name to be able to use split later. 
    var depNames = results.map(function(value,index){
        return value.id + "-" +value.name
        
    })
    // console.log(depNames); 
    //2. Inquire (another function that ask questions to add role with departments as params)
    inquireRoleInfo(depNames)
    })

}

function inquireRoleInfo(departments)
{inquirer.prompt(
    [
        {
            name: "roleTitle", 
            type: "input", 
            message: "What is the Job Title?"
        }, 
        {
            name: "roleSalary", 
            type: "number", 
            message: "What is the salary for this position?"
        }, 
        {
            name: "roleDeptId", 
            type: "list", 
            message: "Please select a department for this position",
            choices: departments,
        }


]
).then(function(answers)
{
    var id = answers.roleDeptId.split("-")[0]; 
    // console.log(id); 
    // console.log(answers); 

        // invoke function created below, pass a literal object as param. 
  insertNewRoleIntoDb({title: answers.roleTitle, salary: answers.roleSalary, department_id: id})
    

})

}

function insertNewRoleIntoDb (newRole)
{   connection.query("INSERT INTO role SET ?",
        {  
            title: newRole.title, 
            salary: newRole.salary, 
           department_id: newRole.department_id, 

        },function(err){
             if (err) throw err;
            console.log("New role has been created")
        });

}

function addEmployee ()
{ 
    // need 
    // - first name 
    // - last name
    // - role id 
    //query to select * from role 
    connection.query(" SELECT * FROM role", function(error, results)
    {
        if (error)throw error; 
        console.log(results); 
        // map out role id + " " +  role title
        var rolesId = results.map(function(value, index){
           var idAndTitleId =  value.id + "-" + value.title
            return idAndTitleId; 
        })
        console.log(rolesId); 
        getManagerId(rolesId); 
    });    
       
 // then make query to insert employee to table

}
  // - manager id 
function getManagerId(rolesId){
    // query to select * employees from employee table
    connection.query("SELECT * FROM employee", function(error, results)
    {
        if(error) throw error ; 
        console.log(results); 
        var idFromManager = results.map(function(value,index)
        {
            //map out employ id  + " " + employe name + " "+ employee last name.
            var mangIdName = value.id + "-" + value.first_name +" "+ value.last_name
            return mangIdName; 
           

        });
         console.log(idFromManager); 
         newEmployeeData(rolesId , idFromManager); 

    })

}

function newEmployeeData(rolesId, managerId)
{  inquirer.prompt(
[   {
    name: "first_name", 
    type: "input",
    message: "What is the employee's Name?"
    },
    {
    name: "last_name", 
    type: "input",
    message: "What is the employee's Last Name?"
    },
    {
    name: "role_id", 
    type: "list",
    message: "What is the role id?",
    choices: rolesId, 
    },
    {
    name: "manager_id", 
    type: "list",
    message: "What is the manager id?",
    choices: managerId, 
    },

]).then(function(answer){
    var roleId = answer.role_id.split("-")[0]; 
    var managerId= answer.manager_id.split("-")[0];
    insertNewEmployee(
        {
            first_name: answer.first_name, 
            last_name: answer.last_name, 
            role_id: roleId, 
            manager_id: managerId,
        }
        )

})

}
function insertNewEmployee (employee)
{   connection.query("INSERT INTO employee SET ?",
        {  
            first_name: employee.first_name, 
            last_name: employee.last_name, 
            role_id: employee.role_id, 
            manager_id: employee.manager_id

        },function(err){
             if (err) throw err;
             console.log("New Employee Added")

        });
}