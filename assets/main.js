let add_new_worker = document.getElementById('add_new_worker')
let form = document.getElementById('form')
let select = document.getElementById('select')


let new_worker = [] ;
let obj_worker = {
   nom : null ,
   role : null ,
   experience : [] ,
   emaile : null ,
   phone : null 
}

add_new_worker.addEventListener('click', function(){
    form.style.display = 'block'
})

// ***************************************************validation**********************************************************
//   const validationRules = {
//             "name": {
//                 regex: /^[a-zA-Z\s]{3,30}$/,
//                 message: "Full name must be 3-30 letters."
//             },
//             // "select": {
//             //     regex: select.value != '',
//             //     message: "Full name must be 3-30 letters."
//             // },
//             "emaile": {
//                 regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                 message: "Enter a valid email."
//             },
//             "phone": {
//                 regex: /^\+212[0-9]+$/,
//                 message: "Enter a valid email."
//             },
            
//         };

form.addEventListener('submit', function(e){
     e.preventDefault();
            //    if(!Vform())     
            //    {    
            //     alert("Validation échouée veuillez réessayer");
            //     return;
            //    }
            //    alert("Validation effectuée avec succès");
    
})

// function Vform(){

//            let isvalid = true ;

//             for(let x in validationRules){
//                 console.log(x)
//                 const inp = document.getElementById(x)

//                if(!vinput(inp)){
//                     isvalid = false
//                 }


//             }
//             return isvalid
// }

// function vinput(x){

//      const key = validationRules[x.id];
//         if(!key.regex.test(x.value) ){
//             aficherror(x , true , key.message)
//             return false ;
//         }

//         aficherror(x , false)
//         return true

// }

// function aficherror(inp , result , msg = ''){
//      const errormsg = document.getElementById(inp.id + "-error");
       

//              if(result){
//                 errormsg.textContent = msg ;
//                 errormsg.style.display = "block";
//                 inp.classList.add("error");
//              }else{
               
//                 errormsg.textContent = "";
//                 errormsg.style.display = "none";
//                 inp.classList.remove("error");
            
//              }
// }

// ************************************************************validation********************************************


//*************************************************************ajoute exeperience*************************************************** */

let add_experience = document.getElementById('add_experience')
let company = document.getElementById('company')
let role = document.getElementById('role')
let from = document.getElementById('from')
let to = document.getElementById('to')

add_experience.addEventListener('click',function(){

     
    let obj_experience = {
          company : company.value,
          role : role.value ,
          from : from.value ,
          to : to.value ,
    }

    obj_worker.experience.push(obj_experience)
    console.log(obj_worker)

    company.value = "";
    role.value = "";
    from.value = "";
    to.value = "";
})

//*************************************************************ajoute exeperience*************************************************** */

//*************************************************************added worker******************************************************** */

let add_info_worker = document.getElementById('add_info_worker')
let name = document.getElementById('name')
let emaile = document.getElementById('emaile')
let phone = document.getElementById('phone')

add_info_worker.addEventListener('click',function(){
    
    obj_worker.nom = name.value
    obj_worker.emaile = emaile.value
    obj_worker.phone = phone.value
    obj_worker.role = select.value
    
     name.value = '';
     emaile.value = '';
     phone.value = '';
     select.value = '';

     new_worker.push(obj_worker)
})

