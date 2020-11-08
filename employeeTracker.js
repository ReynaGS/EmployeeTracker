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
            addRole()

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
//Todo: revisar functions de addRole, and map. 

function addRole()
{   // 1. do query to find all departments. 
    connection.query("SELECT * FROM department" , function(err, results) {
    if (err) throw err;
    // console.log(results);
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