const notyf = new Notyf();
// let addContent=document.getElementsByClassName(".adding");
let addBtn=document.getElementById("add");
let editBtn=document.getElementById("edit");
let employeeTable=document.getElementById("employeeTable")
let search=document.getElementById("searchInput");
let searchBtn=document.getElementById("searchbtn");
let employeeInfo = JSON.parse(localStorage.getItem("employees")) || {};  
let deleteBtns = document.querySelectorAll(".deleteBtn");
let editBtns = document.querySelectorAll(".editBtn");
 
  



if (Object.keys(employeeInfo).length === 0) {
     employeeTable.innerHTML+=`
            <tr>
                <td class="px-6 py-3 text-gray-800"></td>
                <td class="px-6 py-3 text-gray-800"></td>
                <td class="px-6 w-full py-3 text-red-800 flex items-center font-bold">No Data Found</td>
                <td class="px-6 py-3 text-gray-800"></td>
            </tr>     
                 `
}else{for(let key in employeeInfo){

    employeeTable.innerHTML += `
        <tr>
            <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeName}</td>
            <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeCity}</td>
            <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeJob}</td>
            <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeSalaray}</td>
            <td class="px-6 py-3 text-gray-800"><i class="deleteBtn fa-solid fa-trash text-red-500 cursor-pointer hover:text-red-700" onclick="deleteEmployee('${employeeInfo[key].employeeName}')"></i></td>
            <td class="px-6 py-3 text-gray-800"><i class="editBtn fa-regular fa-pen-to-square text-green-500 cursor-pointer hover:text-green-700" onclick="gettingEmployeeInfo('${employeeInfo[key].employeeName}')"></i></td>
            </tr>
            `
    
    }}


let addEmployee = ()=>{
   let employeeName=document.getElementById("name").value;
   let employeeJob=document.getElementById("job").value;
   let employeeCity=document.getElementById("city").value;
   let employeeSalaray =document.getElementById("salary").value;

   if(employeeName && employeeCity && employeeJob && employeeSalaray){
       employeeInfo[employeeName]={employeeName,employeeCity,employeeJob,employeeSalaray};
       localStorage.setItem("employees",JSON.stringify(employeeInfo));   
       notyf.success("Employee added Successfully")

document.getElementById("name").value="";
   document.getElementById("job").value="";
   document.getElementById("city").value="";
   document.getElementById("salary").value="";
   }else{
    notyf.error("please fill all feilds");
    
   }

  

   gettingData();
   
}

let gettingData=()=>{

employeeTable.innerHTML="";
if (Object.keys(employeeInfo).length === 0) {
     employeeTable.innerHTML+=`
            <tr>
                <td class="px-6 py-3 text-gray-800"></td>
                <td class="px-6 py-3 text-gray-800"></td>
                <td class="px-6 w-full py-3 text-red-800 flex items-center font-bold">No Data Found</td>
                <td class="px-6 py-3 text-gray-800"></td>
            </tr>     
                 `
}else{

    for(let key in employeeInfo){
    
      employeeTable.innerHTML += `
          <tr>
                  <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeName}</td>
                  <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeCity}</td>
                  <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeJob}</td>
                  <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeSalaray}</td>
                  <td class="px-6 py-3 text-gray-800"><i class="deleteBtn fa-solid fa-trash text-red-500 cursor-pointer hover:text-red-700" id="${employeeInfo[key].employeeName}" "></i></td>
                <td class="px-6 py-3 text-gray-800"><i class="editBtn fa-regular fa-pen-to-square text-green-500 cursor-pointer hover:text-green-700" onclick="gettingEmployeeInfo('${employeeInfo[key].employeeName}')"></i></td>

              </tr>
          `
    }
}

}

addBtn.addEventListener("click",addEmployee);



let searchEmployee=()=>{
    employeeTable.innerHTML ="";
   let found=false;
    for (let key in employeeInfo){
        if(search.value==employeeInfo[key].employeeName || search.value == employeeInfo[key].employeeCity ||search.value==employeeInfo[key].employeeJob ){
            employeeTable.innerHTML+=`
            <tr>
                    <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeName}</td>
                    <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeCity}</td>
                    <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeJob}</td>
                    <td class="px-6 py-3 text-gray-800">${employeeInfo[key].employeeSalaray}</td>
                </tr>
            `   
            found=true;
        }
    }
    if (!found) {
         employeeTable.innerHTML+=`
            <tr>
                <td class="px-6 py-3 text-gray-800"></td>
                <td class="px-6 py-3 text-gray-800"></td>
                <td class="px-6 w-full py-3 text-red-800 flex items-center font-bold">No Data Found</td>
                <td class="px-6 py-3 text-gray-800"></td>
            </tr>     
                 `
        
    }
   
    
}






searchBtn.addEventListener("click",searchEmployee);
    

let findingEmployee;

let deleteEmployee=item=>{

    for (let key in employeeInfo){
        if(employeeInfo[key].employeeName==item){
           delete employeeInfo[key];
           console.log(employeeInfo);
           localStorage.setItem("employees", JSON.stringify(employeeInfo));
           notyf.error("Employee deleted !!")
        }
    }
    gettingData();

}
let gettingEmployeeInfo=item=>{
    console.log(item);
  

    addBtn.classList.add("hidden");
    editBtn.classList.remove("hidden");
    let employee=document.getElementById("name");
    let Job=document.getElementById("job");
    let City=document.getElementById("city");
    let Salaray =document.getElementById("salary");
    
    for (let key in employeeInfo){
        if(employeeInfo[key].employeeName==item){
            console.log(employeeInfo[key].employeeCity);
            
            employee.value=employeeInfo[key].employeeName;
            Job.value=employeeInfo[key].employeeJob;
            City.value=employeeInfo[key].employeeCity;
            Salaray.value=employeeInfo[key].employeeSalaray;

            findingEmployee=employeeInfo[key].employeeName;
            console.log(findingEmployee);
            
            
        //    localStorage.setItem("employees", JSON.stringify(employeeInfo));
        //    notyf.error("Employee deleted !!")
        //    gettingData();

        }
    }

}


let editEmployee=(findingEmployee)=>{

 console.log(findingEmployee);
 
   let empName=document.getElementById("name").value;
   let Job=document.getElementById("job").value;
   let City=document.getElementById("city").value;
   let Salary =document.getElementById("salary").value;
   

 if(empName && City && Job && Salary){
    for (let key in employeeInfo){
        if(employeeInfo[key].employeeName==findingEmployee){

            if(employeeInfo[key].employeeName==empName && employeeInfo[key].employeeCity==City && employeeInfo[key].employeeJob==Job && employeeInfo[key].employeeSalaray==Salary) {
              notyf.error("YOU EDIT NOTHING"); 
              document.getElementById("name").value="";
          document.getElementById("job").value="";
          document.getElementById("city").value="";
          document.getElementById("salary").value="";
              return 
            }

           if (employeeInfo[key].employeeName!==empName) {
             delete employeeInfo[key];

             employeeInfo[empName] = {
                employeeName: empName,
                employeeCity: City,
                employeeJob: Job,
                employeeSalaray: Salary
                };
                            
             console.log(employeeInfo);
             
            }else{
                employeeInfo[key].employeeName=empName;
                employeeInfo[key].employeeJob=Job;
                employeeInfo[key].employeeCity=City;
                employeeInfo[key].employeeSalaray=Salary;
            }   

            localStorage.setItem("employees",JSON.stringify(employeeInfo)); 
            notyf.success("Employee edit Successfully");
            
            
        }
        
      

}

          document.getElementById("name").value="";
          document.getElementById("job").value="";
          document.getElementById("city").value="";
          document.getElementById("salary").value="";
            gettingData();

}else{
    notyf.error("Fill out all fields")
}

 addBtn.classList.remove("hidden");
    editBtn.classList.add("hidden");

}
   


editBtn.addEventListener("click", () => {
  editEmployee(findingEmployee);
});


deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteEmployee(btn.id);
    });
  });

editBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      gettingEmployeeInfo(btn.id);
    });
  });



