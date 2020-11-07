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