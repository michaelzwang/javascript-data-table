
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

// creates column header objects with properties and groups them in an array
function createColumnHeaders(){
  var properties = Object.getOwnPropertyNames(data[0]);
  properties.forEach(function(property){
    var column_header = new ColumnHeader(property, true);
    column_headers.push(column_header);
  });
}


function loadTable(){
  if (data.length == 0){
    return;                                   // exit out if no data
  }

  createColumnHeaders();
  createTableHead();

  var first_column = column_headers[0].title; // default to sort table by first column
  sortByCol(data, first_column);

  splitTable();
  onColumnHeadClick();
  changePage();
  addCheckBoxes();
  viewingDescription();
}

function createTableHead(){
  var table = document.getElementById("table");
  var header = table.createTHead();
  var row = header.insertRow(0);

  column_headers.forEach(function(column){  // determine which column headers to add
    if (column.visible == true){
      var cell = row.insertCell();
      cell.outerHTML = "<th id=" + column.title + ">" + column.title + "</th>";
    }
  });
}

// deletes all rows of table
function removeTableRows(){
  var table = document.getElementById('table');
  var all_tbody = table.getElementsByTagName("tbody");

  var i = 0
  while(i < all_tbody.length) {
    table.removeChild(all_tbody[i])
  }
}

// ====== SORTING ==================================
// determines which column head is clicked and needs to be sorted
function onColumnHeadClick(){
  var table_head = document.getElementsByTagName("thead")[0];
  table_head.addEventListener('click', function(e) {
    var clicked_column = e.target.id;
    var column = document.getElementById(clicked_column);

    sortTableByColumn(column);
    changePage();
  });
}

function sortTableByColumn(column){
  removeTableRows();
  // if clicked column is already sorted by this column, reverse table
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
  // if not sorted, sort by clicked column
  else {
    removeSortColor();
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

// sorts array by object property (in this case by the column property clicked)
function sortByCol(arr, property){
    arr.sort(sortFunction)
    function sortFunction(a, b) {
        a = a[property]
        b = b[property]
        return (a === b) ? 0 : (a < b) ? -1 : 1
    }
}

// removes all ascending and descending classes from table
function removeSortColor(){
  var ascending = document.getElementsByClassName('ascending');
  if (ascending.length > 0) {
    ascending[0].classList.remove('ascending');
  }

  var descending = document.getElementsByClassName('descending');
  if (descending.length > 0) {
    descending[0].classList.remove('descending');
  }
}

// sort salary correctly
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
// separates table into groups for pagination
function splitTable(){
  var shortArrays = [], i, len;
  len = data.length;

  for (i = 0; i < len; i += 10) {
      shortArrays.push(data.slice(i, i + 10));
  }

  var num_pages = shortArrays.length;
  displayTableRows(shortArrays, num_pages);
}

// displays table rows with pagination links
function displayTableRows(array, length){
  array.forEach(function(group, index){
    addRowGroupToTable(group, index);
  });

  // add proper number of pagination links to html
  var i = 1;
  var pag_links = '<a href="#" id="current-link">1</a>';
  while (i < length) {
    pag_links += '<a href="#">' + String(i+1) + '</a>';
    i++;
  }

  document.getElementsByClassName('pag-links')[0].innerHTML = pag_links;

  // default to show first page
  var first_page = document.getElementById('page-1');
  if (first_page) {
    first_page.classList.toggle('hide');
    first_page.classList.toggle('show');
  }
}

// add data to table by pagination group
function addRowGroupToTable(group, index){
  var table = document.getElementById('table');
  var body = table.appendChild(document.createElement('tbody'));
  body.classList.add('hide');
  body.id = 'page-' + String(index + 1);


  group.forEach(function(obj){
    var row = body.insertRow(-1);

    // only adds group if column header is visible/checked
    column_headers.forEach(function(column){
      if (column.visible == true){
        var cell = row.insertCell();
        cell.innerHTML = obj[column.title];
      }
    });
  });
}

// displays group of rows associated with the page number
function changePage(){
  var page_links = document.getElementsByClassName('pag-links')[0];
  var links = page_links.children;

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

      viewingDescription()

    }, false);
  }
}

// creates description for number of items being viewed
function viewingDescription(){
  var viewing = document.getElementById('viewing');
  var page_num = document.getElementById('current-link').innerHTML;
  var group = document.getElementsByClassName('show')[0];
  if (group){
    var group_size = group.children.length;
    var tbodies = document.getElementsByTagName('tbody');

    var total = 0;
    for (var i = 0; i < tbodies.length; i++){
      total += tbodies[i].children.length;
    }

    if (group_size == 10){
      var range_end = group_size * page_num;
      var range = String(range_end - 9) + ' - ' + String(range_end);
    }
    else if (group_size == total ){
      var range = String(total);
    }
    else {
      var range = String(total - group_size) + ' - ' + String(total);
    }
    var phrase = 'Viewing ' + range + ' of ' + String(total) + ' items';
    viewing.innerHTML = phrase;
  }
  else {
    viewing.innerHTML = '';
  }
}

// ===== SHOW/HIDE COLUMNS ================================
// adds checkboxes with correct labels to html
function addCheckBoxes(){
  var div = document.getElementsByClassName('checkbox-container')[0];
  column_headers.forEach(function(column){
    div.innerHTML += '<span class="box">' + '<input type="checkbox" id="cbox-' +
    column.title + '" checked onchange="handleChange(this);">' + '<label for="cbox-' +
    column.title + '">' + column.title + '</label>' + '</span>'
  })
}

// changes table when checkbox is clicked
function handleChange(checkbox){
  var box_label = getLabel(checkbox.id);

  // determines if column header is visible
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

  // create and display new table
  clearEntireTable();
  createTableHead();

  splitTable();
  onColumnHeadClick();
  changePage();
  filterData();
  viewingDescription();
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
// called when typing in search box
function filterData(){
  var input, filter;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();            // string typed in search box

  var filtered_data = [];

  // check each object
  data.forEach(function(obj){
    var addObject = false;

    for (var i=0; i<column_headers.length; i++) {
      var column_head = column_headers[i];

      // only search if column is visible/checked
      if(column_head.visible) {
        // if nothing typed OR if string matches any table data
        if(filter==""  || obj[column_head.title].toUpperCase().indexOf(filter) > -1){
          addObject = true;
        }
      }
    }

    // add data object to filtered data array
    if(addObject) {
      filtered_data.push(obj);
    }

  });

  clearEntireTable();
  createTableHead();

  var shortArrays = [], i, len;
  len = filtered_data.length;
  // split filtered data
  for (i = 0; i < len; i += 10) {
      shortArrays.push(filtered_data.slice(i, i + 10));
  }

  var num_pages = shortArrays.length;
  displayTableRows(shortArrays, num_pages);

  onColumnHeadClick();
  changePage();
  viewingDescription();
}

// ====== LOAD JSON ===========================================
// example of loading JSON data, but using post-parsed data for testing purposes

// function loadJSON(path, success, error){
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function(){
//         if (xhr.readyState === XMLHttpRequest.DONE) {
//             if (xhr.status === 200) {
//                 if (success)
//                     success(JSON.parse(xhr.responseText));
//             } else {
//                 if (error)
//                     error(xhr);
//             }
//         }
//     };
//     xhr.open("GET", path, true);
//     xhr.send();
// }
//
// loadJSON('my-file.json',
//    function(json) { var data = json },
//    function(xhr) { console.error(xhr); }
// );


// ==== PERFORMANCE =================================================


// ==== FUTURE COMPONENTS =================================================
