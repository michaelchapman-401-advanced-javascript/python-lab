'use strict';

// ------------------------------------------------------------------------------------
//
// Creates table header, body, and footer rows
//
// ------------------------------------------------------------------------------------
function createDataTable() {
  const hoursArr = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

  let section = document.getElementById('salesTable');

  let table = document.createElement('table');
  table.setAttribute('id', 'table');
  section.appendChild(table);

  let thead = document.createElement('thead');
  table.appendChild(thead);

  let body = document.createElement('tbody');
  body.setAttribute('id', 'tableBody');
  table.appendChild(body);

  let tr = document.createElement('tr');
  thead.appendChild(tr);

  let emptySpace = document.createElement('th');
  tr.appendChild(emptySpace);

  // let img = document.createElement('img');
  // img.setAttribute('src', '../images/chinook.jpg');
  // emptySpace.appendChild(img);

  // Loop through hoursArr to create headers in thead
  for (let i = 0; i < hoursArr.length; i++) {
    let th = document.createElement('th');
    th.textContent = hoursArr[i];
    tr.appendChild(th);
  }

  let dailyLocationTotal = document.createElement('th');
  dailyLocationTotal.textContent = 'Daily Location Total';
  tr.appendChild(dailyLocationTotal);
}

// ------------------------------------------------------------------------------------
//
// Populates individual location table rows with cookies per hour and location totals
//
// ------------------------------------------------------------------------------------
let createData = function() {
  let totalSales = 0;

  let tbody = document.getElementById('tableBody');

  let tr = document.createElement('tr');
  tbody.appendChild(tr);

  let th = document.createElement('th');
  th.textContent = this.name;
  tr.appendChild(th);

  //create each td element in each locations row
  // Don't need this loop because?
  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    let td = document.createElement('td');
    td.textContent = this.cookiesPerHour[i];
    totalSales += this.cookiesPerHour[i];
    tr.appendChild(td);
  }

  // Create daily totals for each location
  let totals = document.createElement('td');
  totals.textContent = totalSales;
  totals.setAttribute('id', 'dailyTotals');
  tr.appendChild(totals);

  createColumnTotals();
};

// ------------------------------------------------------------------------------------
//
// Creates footer row which displays total number of cookies sold for each location per hour
//
// ------------------------------------------------------------------------------------
function createColumnTotals() {
  const hoursArr = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
  let columnTotalSales = 0;
  let totalSales = 0;

  let table = document.getElementById('table');

  if (document.getElementById('foot')) {
    table.removeChild(document.getElementById('foot'));
  }

  // Create footer row for totals data
  let footer = document.createElement('tfoot');
  footer.setAttribute('id', 'foot');
  table.appendChild(footer);

  let footerRow = document.createElement('tr');
  footerRow.setAttribute('id', 'footerRow');
  footer.appendChild(footerRow);

  let footerHead = document.createElement('th');
  footerHead.textContent = 'Hourly Totals';
  footerRow.appendChild(footerHead);

  for (let i = 0; i < hoursArr.length; i++) {
    for (let j = 0; j < LOCATIONS.length; j++) {
      columnTotalSales += LOCATIONS[j].cookiesPerHour[i];
      totalSales += columnTotalSales;
    }

    let columnTotal = document.createElement('td');
    columnTotal.textContent = columnTotalSales;
    footerRow.appendChild(columnTotal);
    columnTotalSales = 0;
  }

  let dailyTotal = document.createElement('td');
  dailyTotal.textContent = totalSales;
  footerRow.appendChild(dailyTotal);
}

// ------------------------------------------------------------------------------------
//
// Create objects using form data
//
// ------------------------------------------------------------------------------------
let handleAddLocation = function(event) {
  event.preventDefault();

  let target = event.target;
  //let objectName = target.location.value.replace(/[' ']/g, '').toLowerCase();

  let objectName = new STORE_DATA(target.location.value, target.maxCust.value, target.minCust.value, target.avgCookies.value);
  LOCATIONS.push(objectName);

  objectName.calculateCookiesPerHour();
  objectName.calculateTotalCookies();

  document.getElementById('addLocationForm').reset();
  objectName.render();
};

// ------------------------------------------------------------------------------------
// Locations array for reference
// constructor function for object creation
// function calls
// ------------------------------------------------------------------------------------
const LOCATIONS = [];

const STORE_DATA = function(name, maxCust, minCust, avgCookies) {
  this.name = name;
  this.maxCust = maxCust;
  this.minCust = minCust;
  this.avgCookies = avgCookies;
};

STORE_DATA.prototype.calculateCookiesPerHour = function() {
  this.cookiesPerHour = [];
  for (let i = 0; i < 15; i++) {
    this.cookiesPerHour.push(Math.floor(Math.random() * (this.maxCust - this.minCust) + this.minCust) * this.avgCookies);
  }
};

STORE_DATA.prototype.calculateTotalCookies = function() {
  this.totalCookies = 0;

  for (let i = 0; i < this.cookiesPerHour.length; i++) {
    this.totalCookies += this.cookiesPerHour[i];
  }
};

STORE_DATA.prototype.render = createData;

createDataTable();
document.getElementById('addLocationForm').addEventListener('submit', handleAddLocation);