let add_new_worker = document.getElementById('add_new_worker')
let form = document.getElementById('form')
let select = document.getElementById('select')



let obj_worker = {
   id : null,  
   nom : null ,
   role : null ,
   experience : [] ,
   emaile : null ,
   phone : null 
}

add_new_worker.addEventListener('click', function(){
    form.style.display = 'block'
})

 const clos_form = document.getElementById('clos_form'); 
 clos_form.addEventListener('click', function() {
            form.style.display = 'none';
}) 



// *************************************************localStorage*****************************************

let new_worker ;
if(localStorage.worker != null){
    new_worker = JSON.parse(localStorage.worker)
}else{
    new_worker = [] ;
}

// ***************************************************localStorage********************************************************

// ***************************************************validation**********************************************************
  const validationRules = {
            "name": {
                regex: /^[a-zA-Z\s]{3,30}$/,
                message: "Full name must be 3-30 letters."
            },
            
            "emaile": {
                regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email."
            },
            "phone": {
                regex: /^[0-9+\s()-]+$/,
                message: "Enter a valid phone."
            },
            
        };

form.addEventListener('submit', function(e){
     e.preventDefault();
               if(!Vform())     
               {    
                return;
               }

        form.style.display = 'none';
        obj_worker = {
        id : new_worker.length + 1,
        nom : name.value,
        role : select.value,
        experience : [...experienceTemp],
        emaile : emaile.value,
        phone : phone.value
    }
    
     name.value = '';
     emaile.value = '';
     phone.value = '';
     select.value = '';
     experienceTemp = [];

     new_worker.push(obj_worker)
     localStorage.setItem('worker', JSON.stringify(new_worker));
     cardSmall(obj_worker);
    
})

function Vform(){

           let isvalid = true ;

            for(let x in validationRules){
               
                const inp = document.getElementById(x)

               if(!vinput(inp)){
                    isvalid = false
                }


            }
            return isvalid
}

function vinput(x){

     const key = validationRules[x.id];
        if(!key.regex.test(x.value) ){
            aficherror(x , true , key.message)
            return false ;
        }

        aficherror(x , false)
        return true

}

function aficherror(inp , result , msg = ''){
     const errormsg = document.getElementById(inp.id + "-error");
       

             if(result){
                errormsg.textContent = msg ;
                errormsg.style.display = "block";
                inp.classList.add("error");
             }else{
               
                errormsg.textContent = "";
                errormsg.style.display = "none";
                inp.classList.remove("error");
            
             }
}

// ************************************************************validation********************************************


//*************************************************************ajoute exeperience*************************************************** */

let add_experience = document.getElementById('add_experience')
let company = document.getElementById('company')
let role = document.getElementById('role')
let from = document.getElementById('from')
let to = document.getElementById('to')

let experienceTemp = [] 

add_experience.addEventListener('click',function(){
    let obj_experience = {
          company : company.value,
          role : role.value ,
          from : from.value ,
          to : to.value ,
    }

    experienceTemp.push(obj_experience)

    company.value = "";
    role.value = "";
    from.value = "";
    to.value = "";
})

//*************************************************************ajoute exeperience*************************************************** */



let add_info_worker = document.getElementById('add_info_worker')
let name = document.getElementById('name')
let emaile = document.getElementById('emaile')
let phone = document.getElementById('phone')


for(let i = 0 ; i < new_worker.length ; i++){
    cardSmall(new_worker[i])
}





//***************************************************************card_small******************************************************** */
    
function cardSmall(obj_worker){
  
    let card_small_globale = document.getElementById('card_small_globale')
    let card = document.createElement("div"); 
    card.className= "card_small";
    
    
    
    obj_worker.element = card;
      

    card.innerHTML = `
          <img src="/assets/img/user_work.webp" alt="">
          <div class="card_personelle">
                 <h3>${obj_worker.nom}</h3>
                 <p>${obj_worker.role}</p>
          </div>
          <button>edit</button>
     `

     card.addEventListener('click' , function(){
        afichAnfo(obj_worker)
     })

     card_small_globale.appendChild(card)
}


//  ****************************************************************card_small*********************************************************


// ***********************************************************************afichage*********************************************************
let afiche_info = document.getElementById('afiche_info')
function afichAnfo(obj_worker){
    let tbale_inf = obj_worker.experience.map(exp => `
        <div class="afich_expr">
            <h4>${exp.company}</h4>
            <p>Role: ${exp.role}</p>
            <p>From: ${exp.from} To: ${exp.to}</p>
        </div>
    `).join('')

    afiche_info.innerHTML = `
        <div class="afich_top">
            <img class="afich_img" src="/assets/img/user_work.webp" alt="">
            <div class="afich_top_content">
                <h2>${obj_worker.nom}</h2>
                <p>${obj_worker.role}</p>
            </div>
            <button  id="clos_info" >close</button>  
        </div>
        <p class="afich_emaile">Email: ${obj_worker.emaile}</p>
        <p class="afich_phone">Phone: ${obj_worker.phone}</p>
        <p class="work_exp">Work experience :</p>
        ${tbale_inf}
    `
    afiche_info.style.display = 'block' ; 

    const closeBtn = document.getElementById('clos_info');

    
closeBtn.addEventListener('click', function() {
            afiche_info.style.display = 'none';
})
}

// ******************************************************afichage***********************************************************************


// *********************************************************deplacer dans salle (conferrnce) ***********************************************************
let conference_room = document.getElementById('conference_room');
let chamber_1 = document.getElementById('chamber_1');

conference_room.addEventListener('click', function () {

    afiche_info.innerHTML = '';
    let expt_role = conference_room.dataset.axceptRols.split(',');
     console.log(expt_role)
    for (let i = 0; i < new_worker.length; i++) {

        let worker = new_worker[i];

        
        if (expt_role.includes(worker.role)) {

           
            let conference = document.createElement('div');
            conference.className = 'confirence';

            conference.innerHTML = `
                <img src="/assets/img/user_work.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.nom}</h3>
                    <p>${worker.role}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;

            afiche_info.appendChild(conference);

            conference.addEventListener('click', function (e) {

                if (e.target.classList.contains("return_sidebar")) return;

                chamber_1.appendChild(conference);

                if (worker.element) {
                    worker.element.remove();
                }

                afiche_info.style.display = 'none';
            });

            let returnBtn = conference.querySelector(".return_sidebar");

            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation(); 

                cardSmall(worker);

                conference.remove();
            });
        }
    }

    afiche_info.style.display = 'block';
});
// *********************************************************************reception****************************************************


let reception = document.getElementById('reception')
let chomber_2 = document.getElementById('chomber_2')

reception.addEventListener('click', () => {
  afiche_info.innerHTML = '';
  let expt_role = reception.dataset.axceptRols.split(',');
  console.log(expt_role)
       
   for (let i = 0; i < new_worker.length; i++){
       let worker = new_worker[i]
       if(expt_role.includes(worker.role)){
             let recep = document.createElement('div');
            recep.className = 'confirence';

            recep.innerHTML = `
                <img src="/assets/img/user_work.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.nom}</h3>
                    <p>${worker.role}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;
            afiche_info.appendChild(recep);

            recep.addEventListener('click', function (e){
                       
                   if(e.target.classList.contains("return_sidebar")) return ;
                           
                   chomber_2.appendChild(recep);

                    if (worker.element) {
                        
                    worker.element.remove();
                }

                    afiche_info.style.display = 'none';

            })

            let returnBtn = recep.querySelector(".return_sidebar");

            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation(); 

                cardSmall(worker);

                recep.remove();
            });

       }

   }

afiche_info.style.display = 'block';

})

// ***************************************************************servers*******************************************





let servers = document.getElementById('servers')
let chomber_3 = document.getElementById('chomber_3')

servers.addEventListener('click', () => {
  afiche_info.innerHTML = '';
  let expt_role = servers.dataset.axceptRols.split(',');
  console.log(expt_role)
       
   for (let i = 0; i < new_worker.length; i++){
       let worker = new_worker[i]
       if(expt_role.includes(worker.role)){
             let serv = document.createElement('div');
            serv.className = 'confirence';

            serv.innerHTML = `
                <img src="/assets/img/user_work.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.nom}</h3>
                    <p>${worker.role}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;
               afiche_info.appendChild(serv);

            serv.addEventListener('click', function (e){
                       
                   if(e.target.classList.contains("return_sidebar")) return ;
                           
                   chomber_3.appendChild(serv);
                        console.log(worker.element)
                    if (worker.element) {
                        
                    worker.element.remove();
                }

                    afiche_info.style.display = 'none';

            })

            let returnBtn = serv.querySelector(".return_sidebar");

            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation(); 

                cardSmall(worker);

                serv.remove();
            });

       }

   }

afiche_info.style.display = 'block';

})



// \\\\\\\***************************************************************************************************************************************************************


let security = document.getElementById('security')
let chomber_4 = document.getElementById('chomber_4')

security.addEventListener('click', () => {
  afiche_info.innerHTML = '';
  let expt_role = security.dataset.axceptRols.split(',');
 
       
   for (let i = 0; i < new_worker.length; i++){
       let worker = new_worker[i]
       if(expt_role.includes(worker.role)){
             let secur = document.createElement('div');
            secur.className = 'confirence';

            secur.innerHTML = `
                <img src="/assets/img/user_work.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.nom}</h3>
                    <p>${worker.role}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;
            afiche_info.appendChild(secur);

            secur.addEventListener('click', function (e){
                       
                   if(e.target.classList.contains("return_sidebar")) return ;
                           
                   chomber_4.appendChild(secur);

                    if (worker.element) {
                        
                    worker.element.remove();
                }

                    afiche_info.style.display = 'none';

            })

            let returnBtn = secur.querySelector(".return_sidebar");

            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation(); 

                cardSmall(worker);

                secur.remove();
            });

       }

   }

afiche_info.style.display = 'block';

})
 

// \\\\\\\***************************************************************************************************************************************************************


let staff = document.getElementById('staff')
let chomber_5 = document.getElementById('chomber_5')

staff.addEventListener('click', () => {
  afiche_info.innerHTML = '';
  let expt_role = staff.dataset.axceptRols.split(',');
  console.log(expt_role)
       
   for (let i = 0; i < new_worker.length; i++){
       let worker = new_worker[i]
       if(expt_role.includes(worker.role)){
             let stf = document.createElement('div');
            stf.className = 'confirence';

            stf.innerHTML = `
                <img src="/assets/img/user_work.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.nom}</h3>
                    <p>${worker.role}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;
            afiche_info.appendChild(stf);

            stf.addEventListener('click', function (e){
                       
                   if(e.target.classList.contains("return_sidebar")) return ;
                           
                   chomber_5.appendChild(stf);

                    if (worker.element) {
                        
                    worker.element.remove();
                }

                    afiche_info.style.display = 'none';

            })

            let returnBtn = stf.querySelector(".return_sidebar");

            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation(); 

                cardSmall(worker);

                stf.remove();
            });

       }

   }

afiche_info.style.display = 'block';

})





// \\\\\\\***************************************************************************************************************************************************************


let vault = document.getElementById('vault')
let chomber_6 = document.getElementById('chomber_6')

vault.addEventListener('click', () => {
  afiche_info.innerHTML = '';
  let expt_role = vault.dataset.axceptRols.split(',');
  console.log(expt_role)
       
   for (let i = 0; i < new_worker.length; i++){
       let worker = new_worker[i]
       if(expt_role.includes(worker.role)){
             let vlt = document.createElement('div');
            vlt.className = 'confirence';

            vlt.innerHTML = `
                <img src="/assets/img/user_work.webp" alt="">
                <div class="card_personelle">
                    <h3>${worker.nom}</h3>
                    <p>${worker.role}</p>
                </div>
                <button class="return_sidebar">X</button>
            `;
            afiche_info.appendChild(vlt);

            vlt.addEventListener('click', function (e){
                       
                   if(e.target.classList.contains("return_sidebar")) return ;
                           
                   chomber_6.appendChild(vlt);

                    if (worker.element) {
                        
                    worker.element.remove();
                }

                    afiche_info.style.display = 'none';

            })

            let returnBtn = vlt.querySelector(".return_sidebar");

            returnBtn.addEventListener("click", function (e) {
                e.stopPropagation(); 

                cardSmall(worker);

                vlt.remove();
            });

       }

   }

afiche_info.style.display = 'block';

})