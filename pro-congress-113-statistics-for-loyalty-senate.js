let listOfMembers = [];

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
        let lowestLoyaltyArray = getLeastLoyalMembers();
        let highestLoyaltyArray = getMostLoyalMemebers();
        let statistics = [
            {
                id: 'Democrats',
                numberOfReps: getReps('D').length,
                voteWithParty: getAvgPercentage('D')
            }, 
            {
                id: 'Republicans',
                numberOfReps: getReps('R').length,
                voteWithParty: getAvgPercentage('R')
            }, 
            {
                id: 'Independent',
                numberOfReps: getReps('I').length,
                voteWithParty: getAvgPercentage('I')
            }
        ]
        getReps();
        getAvgPercentage();
        getLeastLoyalMembers();
        getMostLoyalMemebers();
        createTable(statistics);
        createLowLoyaltyTable(lowestLoyaltyArray);
        createTopLoyaltyTable(highestLoyaltyArray);
        
})
let statistics = [
    {
        id: 'Democrats',
        numberOfReps: getReps('D').length,
        voteWithParty: getAvgPercentage('D')
    }, 
    {
        id: 'Republicans',
        numberOfReps: getReps('R').length,
        voteWithParty: getAvgPercentage('R')
    }, 
    {
        id: 'Independent',
        numberOfReps: getReps('I').length,
        voteWithParty: getAvgPercentage('I')
    }
]

function getReps(party){
    let myMembers = [];
    for (let i = 0; i < listOfMembers.length; i++) {
        if (listOfMembers[i].party === party) {
            myMembers.push(listOfMembers[i])
        }
    }
   return myMembers
}

function getAvgPercentage(party) {
    let myMembers = getReps(party);
    let allVotes = [];
    for (let i = 0; i < myMembers.length; i++) {
        allVotes.push(myMembers[i].votes_with_party_pct);
    }   
    
    if (allVotes.length == 0) {
        return 0
    } else {
        return ((allVotes.reduce((acumulator, element)=> acumulator + element)/ myMembers.length).toFixed(2));
    }    
}

//Creating new array for 10% least loyal members

function getLeastLoyalMembers() {
    let orderedArray = listOfMembers.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);

    let leastLoyalMembers = orderedArray.slice(0, orderedArray.length * 0.1);

    return leastLoyalMembers;
}

console.log(getLeastLoyalMembers());

//Finding the 10% most loyal members

function getMostLoyalMemebers() {
    let orderedArray = listOfMembers.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct);

    let mostLoyalMemebers = orderedArray.slice(0, orderedArray.length * 0.1);

    return mostLoyalMemebers;
}

console.log (getMostLoyalMemebers());

function createTable(array) {
    let tableData = `<tr>
    <th>Party</th>
    <th>Number of Reps</th>
    <th>% Voted with party</th>
    </tr>`;
    for (let i = 0; i < array.length; i++) {
            tableData = tableData + `<tr>
            <th>${array[i].id}</th>
            <th>${array[i].numberOfReps}</th>
            <th>${array[i].voteWithParty}%</th>
            <td></td>
            </tr>`  
    }
    let tableElement = document.getElementById("atAGlance");

    tableElement.innerHTML = tableData;
}

//Table 3 - lowest party loyalty by votes

function createLowLoyaltyTable(array) {
    let tableData = `<tr>
    <th>Name</th>
    <th>Number of Party Votes</th>
    <th>% Party Votes</th>
    </tr>`;
    for (let i = 0; i < array.length; i++) {
            tableData = tableData + `<tr>
            <td><a href = ${array[i].url}>${array[i].last_name} ${array[i].first_name} ${array[i].middle_name || ""}</a></td>
            <td>${((array[i].total_votes / 100) * array[i].votes_with_party_pct).toFixed(0)}</td>
            <td>${array[i].votes_with_party_pct}%</td>
            <td></td>
            </tr>`  
    }
    let tableElement = document.getElementById("leastLoyalTable");

    tableElement.innerHTML = tableData;
}

//Table 4 - highest party loyalty by votes

function createTopLoyaltyTable(array) {
    let tableData = `<tr>
    <th>Name</th>
    <th>Number of Party Votes</th>
    <th>% Party Votes</th>
    </tr>`;
    for (let i = 0; i < array.length; i++) {
            tableData = tableData + `<tr>
            <td><a href = ${array[i].url}>${array[i].last_name} ${array[i].first_name} ${array[i].middle_name || ""}</a></td>
            <td>${((array[i].total_votes / 100) * array[i].votes_with_party_pct).toFixed(0)}</td>
            <td>${array[i].votes_with_party_pct}%</td>
            <td></td>
            </tr>`  
    }
    let tableElement = document.getElementById("mostLoyalTable");

    tableElement.innerHTML = tableData;
}

createTable(statistics);

let lowestLoyaltyArray = getLeastLoyalMembers();

console.log(lowestLoyaltyArray);

let highestLoyaltyArray = getMostLoyalMemebers();

console.log(highestLoyaltyArray);

createLowLoyaltyTable(lowestLoyaltyArray);

createTopLoyaltyTable(highestLoyaltyArray);