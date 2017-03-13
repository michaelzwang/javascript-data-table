// data set taken from https://datatables.net/examples/data_sources/js_array.html
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

// change arrays to objects
function convertDataToObjects(){
  var dataObjects = []
  dataSet.forEach(function(array){
    var employee = new Object();
    employee.Name = array[0];
    employee.Position = array[1];
    employee.Office = array[2];
    employee.Extn = array[3];
    employee.StartDate = array[4];
    employee.Salary = array[5];

    dataObjects.push(employee);
  });
  return dataObjects;
}

// usable data variable
var data = convertDataToObjects();

// call this function when page loads
function onLoadBody(){
  loadTable();
}

// define column header class
class ColumnHeader {
  constructor(title, visible){
    this.title = title;
    this.visible = visible;
  }
}

var column_headers = [];

function createColumnHeaders(){
  var properties = Object.getOwnPropertyNames(data[0]);
  properties.forEach(function(property){
    var column_header = new ColumnHeader(property, true);
    column_headers.push(column_header);
  });
}


function loadTable(){
// exit out if no data
  if (data.length == 0){
    return;
  }

  createColumnHeaders();
  createTableHead();

// default to sort table by first column
  var first_column = column_headers[0].title;
  sortByCol(data, first_column);

  splitTable();
  getColumn();
  changePage();

  addCheckBoxes();
}

function createTableHead(){
  var table = document.getElementById("table");
  var header = table.createTHead();
  var row = header.insertRow(0);

// determine which columns to add
  column_headers.forEach(function(column){
    if (column.visible == true){
      var cell = row.insertCell();
      cell.outerHTML = "<th id=" + column.title + ">" + column.title + "</th>";
    }
  });
}

function removeRows(){
  var table = document.getElementById('table');
  var all_tbody = table.getElementsByTagName("tbody");

  var i = 0
  while(i < all_tbody.length) {
    table.removeChild(all_tbody[i])
  }
}

// ====== SORTING ==================================

function getColumn(){
  var table_head = document.getElementsByTagName("thead")[0];
  table_head.addEventListener('click', function(e) {
    var clicked_column = e.target.id;
    var column = document.getElementById(clicked_column);

    sortColumn(column);
    changePage();
  });
}

function sortColumn(column){
  removeRows();

  if (column.classList.contains('ascending')) {
    data.reverse();
    splitTable();
    column.classList.remove('ascending');
    column.classList.add('descending');
  }
  else if (column.classList.contains('descending')){
    data.reverse();
    splitTable();
    column.classList.remove('descending');
    column.classList.add('ascending');
  }
  else {
    removeSort();
    column.classList.add('ascending');
    var property = column.id;

    if (data[0][property][0] == '$'){     // checks for $ at start of string
      sortSalary(property);
    }
    else {
      sortByCol(data, property);
    }

    splitTable();
  }
}

function sortByCol(arr, property){
    arr.sort(sortFunction)
    function sortFunction(a, b) {
        a = a[property]
        b = b[property]
        return (a === b) ? 0 : (a < b) ? -1 : 1
    }
}

// determines color of column header
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

// sort salary
function sortSalary(property){
  currencyToNum(property);
  sortByCol(data, property);
  numToCurrency(property);
}

function currencyToNum(property){
  data.forEach(function(obj){
    obj[property] = Number(obj[property].replace(/(^\$|,)/g,''));
  });
}

function numToCurrency(property){
  data.forEach(function(obj){
    obj[property] = '$' + obj[property].toLocaleString();
  });
}


// ===== PAGINATION ======================================

function splitTable(){
  var shortArrays = [], i, len;

  for (i = 0, len = data.length; i < len; i += 10) {
      shortArrays.push(data.slice(i, i + 10));
  }

  var num_pages = shortArrays.length;
  displayPage(shortArrays, num_pages)
}

function displayPage(array, length){
  array.forEach(function(group, index){
    addRowGroup(group, index);
  });

  var i = 1
  var pag_links = '<a href="#" id="current-link">1</a>';
  while (i < length) {
    pag_links += '<a href="#">' + String(i+1) + '</a>'
    i++;
  }
  document.getElementsByClassName('pag-links')[0].innerHTML = pag_links;

  var first_page = document.getElementById('page-1');
  if (first_page) {
    first_page.classList.toggle('hide');
    first_page.classList.toggle('show');
  }
}

function addRowGroup(group, index){
  var table = document.getElementById('table');
  var body = table.appendChild(document.createElement('tbody'));
  body.classList.add('hide');
  body.id = 'page-' + String(index + 1);


  group.forEach(function(obj){
    var row = body.insertRow(-1);

    column_headers.forEach(function(column){
      if (column.visible == true){
        var cell = row.insertCell();
        cell.innerHTML = obj[column.title];
      }
    });
  });
}

function changePage(){
  var links = document.getElementsByClassName('pag-links')[0].children;

  for (var i = 0; i < links.length; i++){
    links[i].addEventListener('click', function(e) {
      e.preventDefault();

      var current_page = document.getElementsByClassName('show')[0];
      current_page.classList.toggle('hide');
      current_page.classList.toggle('show');

      var current_link = document.getElementById('current-link');
      current_link.removeAttribute('id');

      e.target.id = 'current-link';
      var page_num = e.target.innerHTML;
      var new_page = document.getElementById('page-' + page_num);
      new_page.classList.toggle('hide');
      new_page.classList.toggle('show');
    }, false);
  }
}


// ===== SHOW/HIDE COLUMNS ================================
function addCheckBoxes(){
  var div = document.getElementsByClassName('checkbox-container')[0];
  column_headers.forEach(function(column){
    div.innerHTML += '<span class="box">' + '<input type="checkbox" id="cbox-' +
    column.title + '" checked onchange="handleChange(this);">' + '<label for="cbox-' +
    column.title + '">' + column.title + '</label>' + '</span>'
  })
}

function handleChange(checkbox){
  var box_label = getLabel(checkbox.id);

  if (checkbox.checked == true){
    column_headers.forEach(function(column){
      if (column.title == box_label){
        column.visible = true;
      }
    });
  }
  else {
    column_headers.forEach(function(column){
      if (column.title == box_label){
        column.visible = false;
      }
    });
  }

  clearEntireTable();
  createTableHead();

  splitTable();
  getColumn();
  changePage();
  filterData();
}

function getLabel(id) {
  var input = document.getElementById(id);
  return input.nextSibling.innerHTML;
}

function clearEntireTable(){
  var table = document.getElementById('table');
  table.innerHTML = ''
}


// ====== SEARCH =============================================

function filterData(){
  var input, filter;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();

  var filtered_data = [];

  data.forEach(function(obj){
    var addObject = false;

    for (var i=0; i<column_headers.length; i++) {
      var column_head = column_headers[i];

      if(column_head.visible) {
        if(filter==""  || obj[column_head.title].toUpperCase().indexOf(filter) > -1){
          addObject = true;
        }
      }
    }

    if(addObject) {
      filtered_data.push(obj);
    }

  });

  clearEntireTable();
  createTableHead();

  var shortArrays = [], i, len;

  for (i = 0, len = filtered_data.length; i < len; i += 10) {
      shortArrays.push(filtered_data.slice(i, i + 10));
  }

  var num_pages = shortArrays.length;
  displayPage(shortArrays, num_pages)

  getColumn();
  changePage();
}
