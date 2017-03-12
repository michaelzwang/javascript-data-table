var dataSet = [
    [ "Tiger Nixon", "System Architect", "Edinburgh", "5421", "2011/04/25", "$320,800" ],
    [ "Garrett Winters", "Accountant", "Tokyo", "8422", "2011/07/25", "$170,750" ],
    [ "Ashton Cox", "Junior Technical Author", "San Francisco", "1562", "2009/01/12", "$86,000" ],
    [ "Cedric Kelly", "Senior Javascript Developer", "Edinburgh", "6224", "2012/03/29", "$433,060" ],
    [ "Airi Satou", "Accountant", "Tokyo", "5407", "2008/11/28", "$162,700" ],
    [ "Brielle Williamson", "Integration Specialist", "New York", "4804", "2012/12/02", "$372,000" ],
    [ "Herrod Chandler", "Sales Assistant", "San Francisco", "9608", "2012/08/06", "$137,500" ],
    [ "Rhona Davidson", "Integration Specialist", "Tokyo", "6200", "2010/10/14", "$327,900" ],
    [ "Colleen Hurst", "Javascript Developer", "San Francisco", "2360", "2009/09/15", "$205,500" ],
    [ "Sonya Frost", "Software Engineer", "Edinburgh", "1667", "2008/12/13", "$103,600" ],
    [ "Jena Gaines", "Office Manager", "London", "3814", "2008/12/19", "$90,560" ],
    [ "Quinn Flynn", "Support Lead", "Edinburgh", "9497", "2013/03/03", "$342,000" ],
    [ "Charde Marshall", "Regional Director", "San Francisco", "6741", "2008/10/16", "$470,600" ],
    [ "Haley Kennedy", "Senior Marketing Designer", "London", "3597", "2012/12/18", "$313,500" ],
    [ "Tatyana Fitzpatrick", "Regional Director", "London", "1965", "2010/03/17", "$385,750" ],
    [ "Michael Silva", "Marketing Designer", "London", "1581", "2012/11/27", "$198,500" ],
    [ "Paul Byrd", "Chief Financial Officer (CFO)", "New York", "3059", "2010/06/09", "$725,000" ],
    [ "Gloria Little", "Systems Administrator", "New York", "1721", "2009/04/10", "$237,500" ],
    [ "Bradley Greer", "Software Engineer", "London", "2558", "2012/10/13", "$132,000" ],
    [ "Dai Rios", "Personnel Lead", "Edinburgh", "2290", "2012/09/26", "$217,500" ],
    [ "Jenette Caldwell", "Development Lead", "New York", "1937", "2011/09/03", "$345,000" ],
    [ "Yuri Berry", "Chief Marketing Officer (CMO)", "New York", "6154", "2009/06/25", "$675,000" ],
    [ "Caesar Vance", "Pre-Sales Support", "New York", "8330", "2011/12/12", "$106,450" ],
    [ "Doris Wilder", "Sales Assistant", "Sidney", "3023", "2010/09/20", "$85,600" ],
    [ "Angelica Ramos", "Chief Executive Officer (CEO)", "London", "5797", "2009/10/09", "$1,200,000" ],
    [ "Gavin Joyce", "Developer", "Edinburgh", "8822", "2010/12/22", "$92,575" ],
    [ "Jennifer Chang", "Regional Director", "Singapore", "9239", "2010/11/14", "$357,650" ],
    [ "Brenden Wagner", "Software Engineer", "San Francisco", "1314", "2011/06/07", "$206,850" ],
    [ "Fiona Green", "Chief Operating Officer (COO)", "San Francisco", "2947", "2010/03/11", "$850,000" ],
    [ "Shou Itou", "Regional Marketing", "Tokyo", "8899", "2011/08/14", "$163,000" ],
    [ "Michelle House", "Integration Specialist", "Sidney", "2769", "2011/06/02", "$95,400" ],
    [ "Suki Burks", "Developer", "London", "6832", "2009/10/22", "$114,500" ],
    [ "Prescott Bartlett", "Technical Author", "London", "3606", "2011/05/07", "$145,000" ],
    [ "Gavin Cortez", "Team Leader", "San Francisco", "2860", "2008/10/26", "$235,500" ],
    [ "Martena Mccray", "Post-Sales support", "Edinburgh", "8240", "2011/03/09", "$324,050" ],
    [ "Unity Butler", "Marketing Designer", "San Francisco", "5384", "2009/12/09", "$85,675" ]
];

function loadTable(){
  createTableHead();
  dataSet.sort(initialSortName);
  addRows();

  getColumn();
}

function createTableHead(){
  var table = document.getElementById("table");
  var header = table.createTHead();
  var row = header.insertRow(0);
  var cell_0 = row.insertCell(0);
  var cell_1 = row.insertCell(1);
  var cell_2 = row.insertCell(2);
  var cell_3 = row.insertCell(3);
  var cell_4 = row.insertCell(4);
  var cell_5 = row.insertCell(5);
  cell_0.outerHTML = "<th id='name'>Name</th>";
  cell_1.outerHTML = "<th id='position'>Position</th>";
  cell_2.outerHTML = "<th id='office'>Office</th>";
  cell_3.outerHTML = "<th id='extn'>Extn.</th>";
  cell_4.outerHTML = "<th id='start'>Start Date</th>";
  cell_5.outerHTML = "<th id='salary'>Salary</th>";
}

function addRows(){
  var table = document.getElementById('table');
  var body = table.appendChild(document.createElement('tbody'));
  dataSet.forEach(function(employee){
    var row = body.insertRow(-1);
    var cell_0 = row.insertCell(0);
    var cell_1 = row.insertCell(1);
    var cell_2 = row.insertCell(2);
    var cell_3 = row.insertCell(3);
    var cell_4 = row.insertCell(4);
    var cell_5 = row.insertCell(5);
    cell_0.innerHTML = employee[0];
    cell_1.innerHTML = employee[1];
    cell_2.innerHTML = employee[2];
    cell_3.innerHTML = employee[3];
    cell_4.innerHTML = employee[4];
    cell_5.innerHTML = employee[5];
  })
}

function removeRows(){
  var table = document.getElementById('table');
  while(table.rows.length > 1) {
    table.deleteRow(1);
  }
}

function initialSortName(a, b){
  var name = document.getElementById('name');
  name.classList.add('ascending');

  if (a[0] === b[0]) {
    return 0;
  }
  else {
    return (a[0] < b[0]) ? -1 : 1;
  }
}

function getColumn(){
  var table_head = document.getElementsByTagName("thead")[0];
  table_head.addEventListener('click', function(e) {
    var clicked_column = e.target.id;
    var column = document.getElementById(clicked_column);
    sortColumn(column);
  });
}

function sortColumn(column){
  removeRows();

  if (column.classList.contains('ascending')) {
    dataSet.reverse();
    addRows();
    column.classList.remove('ascending');
    column.classList.add('descending');
  }
  else if (column.classList.contains('descending')){
    dataSet.reverse();
    addRows();
    column.classList.remove('descending');
    column.classList.add('ascending');
  }
  else {
    removeSort();
    column.classList.add('ascending');
    var i = column.cellIndex;
    sortByCol(dataSet, i);
    addRows();
  }
}

function sortByCol(arr, colIndex){
    arr.sort(sortFunction)
    function sortFunction(a, b) {
        a = a[colIndex]
        b = b[colIndex]
        return (a === b) ? 0 : (a < b) ? -1 : 1
    }
}

function removeSort(){
  var ascending = document.getElementsByClassName('ascending');
  if (ascending.length > 0) {
    ascending[0].classList.remove('ascending');
  }

  var descending = document.getElementsByClassName('descending');
  if (descending.length > 0) {
    descending[0].classList.remove('descending');
  }
}
