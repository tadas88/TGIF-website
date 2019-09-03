let listOfMembers = [];


console.log(listOfMembers.length);

let urlGov = 'https://api.propublica.org/congress/v1/113/senate/members.json'

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
    <th>Senator</th>
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