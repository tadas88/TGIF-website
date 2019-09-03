

let listOfMembers = [];


console.log(listOfMembers.length);



// let uniqueStates = [];

// for (let i = 0; i < listOfMembers.length; i++) {
//         if(listOfMembers[i].state = )
//         uniqueStates.push(listOfMembers[i])
// }

// Declaring 2 new arrays to be populated first with all the states and then to be filtered down to unique items

let urlGov = 'https://api.propublica.org/congress/v1/113/house/members.json'

fetch(urlGov, {
        headers: {
                "X-API-Key": "qayW2d7LAqAy7EucZJ42EVwvrmADksqwjLD2E4sV"
        }
})
.then(function(response) {
        console.log('hola')
  return response.json();
}).then(function(resultOfAjaxFunction){
        listOfMembers = resultOfAjaxFunction.results[0].members;
        createTable(listOfMembers);
        console.log(listOfMembers);
        getStates();
        populateDropDown();
})





   
function getStates() {
        let statesDropDownList = []; 
        // Adding all the states into a new array statesDropDown list
        for (let i = 0; i < listOfMembers.length; i++) {
                if(!statesDropDownList.includes(listOfMembers[i].state)) {
                        statesDropDownList.push(listOfMembers[i].state);
                } 
        }
        // filtering for unique items in the statesDropDown array and adding them to new array uniqueStatesList
        return statesDropDownList;
}




function populateDropDown() {
        let statesList = document.getElementById("sel");
        let uniqueStatesList = getStates();
        uniqueStatesList.sort();
        for (let i = 0; i < uniqueStatesList.length; i++){
                statesList.innerHTML = statesList.innerHTML +
                `<option value=${uniqueStatesList[i]}>${uniqueStatesList[i]}</option>`;
        }
        console.log(uniqueStatesList);           
}

populateDropDown();

function getDropDownValues(array) {
        let myMembers = [];

        let seletedState = document.getElementById("sel").value;

        console.log(seletedState);

        for (let i = 0; i < array.length; i++) {
                if (array[i].state === seletedState) {
                        myMembers.push(array[i])
                }
        }

        if (seletedState === "all") {
                createTable(array);
        } else {
                createTable(myMembers);
        }
}

function filterAll(){
        let myMembers = getCheckboxesValues();
        getDropDownValues(myMembers);

}

// filterByStateAndParty();

// const uniqueStates = getStates.filter(unique);

// console.log(uniqueStates);

// let uniqueStatesList = [...new Set(getStates)];

// function uniqueStatesList(value, index, self) {
//         return self.indexOf(value) === index;
// }
        

// let uniqueStates = getStates.filter( uniqueStatesList );

// console.log(uniqueStates);





/* function filterByState(state) {
        let uniqueStates = [];

        for (let i = 0; i < listOfMembers.length; i++) {
                if(listOfMembers[i].state === state) {
                        uniqueStates.push(listOfMembers[i].state)
                }
                
        }
        console.log(uniqueStates);
}

filterByState()


function getDropDownValues() {
        let uniqueStates = [];
        let myMembers = [];

        let selectedDropDown = document.querySelectorAll();

        for (let i = 0; i < selectedDropDown.length; i++) {
                uniqueStates.push(selectedDropDown[i].value)
        }

        for (let i = 0; i < listOfMembers.length; i++) {
                if(parties.includes(listOfMembers[i].party)) {
                        myMembers.push(listOfMembers[i])
                }
        }

        createTable(myMembers);
} */

function filterByParty(party) {
        let myMembers = [];

        for (let i = 0; i < listOfMembers.length; i++) {
                if(listOfMembers[i].party === party) {
                        myMembers.push(listOfMembers[i])
                }
                
        }
        console.log(myMembers);
}

filterByParty("R")

function getCheckboxesValues(){
        let myMembers = [];
        let parties = [];

        //Get checkboxes values

        let checkedBoxes = Array.from(document.querySelectorAll('input[type=checkbox]:checked'));

        for(let i = 0; i < checkedBoxes.length; i++){
                parties.push(checkedBoxes[i].value)
        }

        //get members

        for (let i = 0; i < listOfMembers.length; i++) {
                if(parties.includes(listOfMembers[i].party)) {
                        myMembers.push(listOfMembers[i])
                }
        }

        if(parties.length == 0){
                return listOfMembers;
        } else {
                return myMembers;   
        }

}

function createTable(array) {
        let tableData = `<tr>
        <th>Representative</th>
        <th>Party Affilication</th>
        <th>State Represented</th>
        <th>Seniority (years)</th>
        <th>Votes With Party</th>
        </tr>`;
        for (let i = 0; i < array.length; i++) {
                tableData = tableData + `<tr>
                <td><a href = ${array[i].url}>${array[i].last_name} ${array[i].first_name} ${array[i].middle_name || ""}</a></td>
                <td>${array[i].party}</td>
                <td>${array[i].state}</td>
                <td>${array[i].seniority}</td>
                <td>${array[i].votes_with_party_pct}%</td>
                <td></td>
                </tr>`  
        }
        let tableElement = document.getElementById("house/senate-data");

        tableElement.innerHTML = tableData;
}

createTable(listOfMembers);

// When the user scrolls down 2500px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 2500 || document.documentElement.scrollTop > 2500) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}




// filterByParty("D");
// filterByParty("R");
// filterByParty("I");

// function getCheckedBoxesR(Republicans) {
//         let checkboxesR = document.getElementsByName(Republicans);
//         let checkboxesCheckedR = [];

//         for (let i = 0; i < checkboxesR.length; i++) {
//                 if (checkboxesR[i].checked) {
//                         checkboxesCheckedR.push(checkboxesR[i]);
//                 }
                
//         }
//         return checkboxesCheckedR.length > 0 ? checkboxesCheckedR : null;
// }

// let checkboxesR = getCheckedBoxesR("mycheckboxes");






// document.getElementById("senate-data").innerHTML = tableData;

// Pass the checkbox name to the function
/* function getCheckedBoxesR(customCheck1) {
        let checkboxesR = document.getElementsByName(customCheck1);
        let checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxesR.length; i++) {
           // And stick the checked ones onto an array...
           if (checkboxesR[i].checked) {
              checkboxesChecked.push(checkboxesR[i]);
           }
        }
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
      }
      
      // Call as
      let checkedBoxesR = getCheckedBoxesR("mycheckboxesR");

      function getCheckedBoxesD(customCheck2) {
        let checkboxesD = document.getElementsByName(customCheck2);
        let checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxesD.length; i++) {
           // And stick the checked ones onto an array...
           if (checkboxesD[i].checked) {
              checkboxesChecked.push(checkboxesD[i]);
           }
        }
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
      }
      
      // Call as
      let checkedBoxesD = getCheckedBoxesD("mycheckboxesD");

      function getCheckedBoxesI(customCheck3) {
        let checkboxesI = document.getElementsByName(customCheck3);
        let checkboxesChecked = [];
        // loop over them all
        for (var i=0; i<checkboxesI.length; i++) {
           // And stick the checked ones onto an array...
           if (checkboxesI[i].checked) {s
              checkboxesChecked.push(checkboxesI[i]);
           }
        }
        // Return the array if it is non-empty, or null
        return checkboxesChecked.length > 0 ? checkboxesChecked : null;
      }
      
      // Call as
      let checkedBoxesI = getCheckedBoxesI("mycheckboxesI");




data.results
console.log(data.results[0].members); */


//for (let i = 0; i < listOfMembers.length; i++) {
//    console.log(listOfMembers[i].first_name);
//    console.log(listOfMembers[i].party);
    
// }


let practiceArray = [{name: "Tadas", age: 31, party: "D"},{name: "Maria", age: 26, party: "R"}];

for (let j = 0; j < practiceArray.length; j++) {
    console.log(practiceArray[j].name);
    // Tadas
    console.log(practiceArray[j].age);
    // 31
    console.log(practiceArray[j].party);
    // D
    
    
}

console.log(practiceArray.length);
    // This logs 2 but only once since the console.log() is outside the for loop brackets 
