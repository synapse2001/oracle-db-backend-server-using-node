// Get a reference to the table and the load button
const dataTable = document.getElementById('data-table');
const loadButton = document.getElementById('load-button');
const errorMessage = document.getElementById('error-message');

// Add an event listener to the load button
// loadButton.addEventListener('click', async () => {
//   // Send a GET request to the server to fetch the data
//   const response = await fetch('http://localhost:3000/data');

//   // Parse the response as JSON
//   const data = await response.json();

//   // Clear the table
//   dataTable.innerHTML = '<thead><tr><th>Name</th><th>Email</th></tr></thead><tbody></tbody>';

//   // Add each row of data to the table
//   for (const row of data) {
//     const tr = document.createElement('tr');
//     const nameTd = document.createElement('td');
//     const emailTd = document.createElement('td');
//     nameTd.textContent = row[0];
//     emailTd.textContent = row[1];
//     tr.appendChild(nameTd);
//     tr.appendChild(emailTd);
//     dataTable.appendChild(tr);
//   }
// });


loadButton.addEventListener('click', async () => {
    
    try {
      const response = await fetch('http://localhost:3000/data')
    //   .then(response => response.text())
    //   .then(text => console.log(text));
    ;
    // logstate = await response.json();
    // console.log(ermess)
    console.log(response);
    //   if (!response.ok) {
    //     throw new Error(`Response from Server ${response.status}`);
    //   }
    //   const data = await response.json();
    //   dataTable.innerHTML = '<thead><tr><th>Name</th><th>Email</th></tr></thead><tbody></tbody>';
    //   for (const row of data) {
    //     const tr = document.createElement('tr');
    //     const nameTd = document.createElement('td');
    //     const emailTd = document.createElement('td');
    //     nameTd.textContent = row[0];
    //     emailTd.textContent = row[1];
    //     tr.appendChild(nameTd);
    //     tr.appendChild(emailTd);
    //     dataTable.appendChild(tr);
    //   }
    console.log("hi");
    const data = await response.json();
    console.log(data);
    console.log("hi2");

    // Clear the table
    dataTable.innerHTML = '<thead><tr><th>Name</th><th>Email</th></tr></thead><tbody></tbody>';
  
    // Add each row of data to the table
    for (const row of data) {
      const tr = document.createElement('tr');
      const nameTd = document.createElement('td');
      const emailTd = document.createElement('td');
      nameTd.textContent = row[0];
      emailTd.textContent = row[1];
      tr.appendChild(nameTd);
      tr.appendChild(emailTd);
      dataTable.appendChild(tr);
    }

    } catch (error) {
        const response = await fetch('http://localhost:3000/data')
        data = await response.json();
        console.log("Error");
        error_message = data.text;
        errorMessage.textContent = await error_message;
      // Handle the error as needed, such as displaying a message to the user
    }
  });
  