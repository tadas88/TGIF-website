let listOfMembers = data.results[0].members;

console.log(listOfMembers.length);

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

function getLowestEngagedMembers() {

    let orderArray = listOfMembers.sort((a, b) => b.missed_votes - a.missed_votes);

    let lowerVotesMember = orderArray.slice(0, orderArray.length * 0.1);

    return lowerVotesMember

}

console.log(getLowestEngagedMembers())

//Finding the top 10% engaged members

function getMostEngagedTen() {
    let orderedArray = listOfMembers.sort((a, b) => a.missed_votes - b.missed_votes);

    let mostEngagedMembers = orderedArray.slice(0, orderedArray.length * 0.1);

    return mostEngagedMembers;
}

console.log(getMostEngagedTen());

function createTable(array) {
    let tableData = `<tr>
    <th>Party</th>
    <th>Number of Reps</th>
    <th>% Voted with party</th>
    </tr>`;
    for (let i = 0; i < array.length; i++) {
            tableData = tableData + `<tr>
            <td>${array[i].id}</td>
            <td>${array[i].numberOfReps}</td>
            <td>${array[i].voteWithParty}%</td>
            <td></td>
            </tr>`  
    }
    let tableElement = document.getElementById("atAGlance");

    tableElement.innerHTML = tableData;
}

//Table 1 - lowest attendence members

function createLowAttendanceTable(array) {
    let tableData = `<tr>
    <th>Name</th>
    <th>Number of Votes Missed</th>
    <th>% of Votes Missed</th>
    </tr>`;
    for (let i = 0; i < array.length; i++) {
            tableData = tableData + `<tr>
            <td><a href = ${array[i].url}>${array[i].last_name} ${array[i].first_name} ${array[i].middle_name || ""}</a></td>
            <td>${array[i].missed_votes}</td>
            <td>${array[i].missed_votes_pct}%</td>
            <td></td>
            </tr>`
            //console.log(array[i].numberOfVotes)  
    }
    
    let tableElement = document.getElementById("lowestAttendanceTable");

    console.log(tableElement);

    tableElement.innerHTML = tableData;
}

// Table 2 - highest attendence members

function createTopAttendanceTable(array) {
    let tableData = `<tr>
    <th>Name</th>
    <th>Number of Missed Votes</th>
    <th>% Missed</th>
    </tr>`;
    for (let i = 0; i < array.length; i++) {
            tableData = tableData + `<tr>
            <td><a href = ${array[i].url}>${array[i].last_name} ${array[i].first_name} ${array[i].middle_name || ""}</a></td>
            <td>${array[i].missed_votes}</td>
            <td>${array[i].missed_votes_pct}%</td>
            <td></td>
            </tr>`  
    }
    let tableElement = document.getElementById("topAttendanceTable");

    tableElement.innerHTML = tableData;
}

createTable(statistics);

let newArray = getLowestEngagedMembers();

console.log(newArray);

let newTableArray = getMostEngagedTen();

console.log(newTableArray);

//Running the functions to create and populate the table in HTML

createLowAttendanceTable(newArray);

createTopAttendanceTable(newTableArray);