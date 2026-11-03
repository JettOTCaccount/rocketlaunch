// ** JavaScript Starter File **
// Purpose: Populate a dropdown of upcoming launches and display mission details
// and a rocket image using callbacks (Part 1), then refactor to promises (Part 2).

// Space Devs development endpoint: no rate limits, but the data is stale and limited.
const BASE_URL = "https://lldev.thespacedevs.com/2.3.0";

// ---------------------------------------------------------------
// PART 1: XMLHttpRequest and callbacks
// ---------------------------------------------------------------

// Step 1: Create getUpcomingLaunches(callback)
// - Makes a GET request to BASE_URL + "/launches/upcoming/"
// - Parses the response
// - Calls the callback function and passes the results array
function getUpcomingLaunches(callback) {
	axios.get(BASE_URL + "/launches/upcoming/")
		.then(function(response) {
			populateDropdown(response.data.results);
		})
		.catch(function (error) {
        // an error message goes here (Step 7)
    });
  // TODO: Implement XHR GET request
}

// Step 2: Create populateDropdown(launches)
// - Receives an array of launches
// - Adds one <option> per launch: text = launch name, value = launch id
function populateDropdown(launches) {
	const dropdown = document.getElementById("launchDropdown");

	//adds one option to the dropdown for each launch
	for (let i = 0; i < launches.length; i++) {
		const option = document.createElement("option");

		option.textContent = launches[i].name;
		option.value = launches[i].id;
		dropdown.appendChild(option);
	}
  // TODO: Iterate and append <option> elements
}

// Step 3: Add event listener to #launchDropdown
// - On change, get the selected launch ID
// - Call getLaunchDetails(launchId, callback)
document.getElementById("launchDropdown").addEventListener("change", function () {

  const launchId = document.getElementById("launchDropdown").value;
  getLaunchDetails(launchId);

  // TODO: Get selected launchId
  // TODO: Call getLaunchDetails
});

// Step 4: Create getLaunchDetails(launchId, callback)
// - Makes a GET request to BASE_URL + "/launches/" + launchId + "/"
// - Parses the response and passes the launch object to the callback
function getLaunchDetails(launchId, callback) {

	axios.get(BASE_URL + "/launches/" + launchId + "/")
		.then(function(response) {
			displayLaunchInfo(response.data);
		})

		.catch(function(error) {
			//error message goes here in Step 7
		});

  // TODO: Implement XHR GET request for a single launch
}

// Step 5: Create displayLaunchInfo(launch)
// - Updates #missionDetails with the mission name and description (if available)
// - Creates an image of the rocket (launch.rocket.configuration.image.image_url) and appends it to #rocket
// - If no image is available, displays a message instead
function displayLaunchInfo(launch) {

	const details = document.getElementById("missionDetails");
	const rocket = document.getElementById("rocket");

	details.innerHTML = "";
	rocket.innerHTML = "";

	const name = document.createElement("h2");
	const description = document.createElement("p");

	name.textContent = launch.name;

	//check that the mission and description exist

	if (launch.mission && launch.mission.description) {
		description.textContent = launch.mission.description;
	} else {
		description.textContent = "no description provided";
	}
  
	details.appendChild(name);
	details.appendChild(description);


	//check that the rocket configuration and image exist
	if (launch.rocket.configuration && launch.rocket.configuration.image && launch.rocket.configuration.image.image_url) {
		const img = document.createElement("img");
		img.src = launch.rocket.configuration.image.image_url;
		img.alt = launch.name;
		rocket.appendChild(img);
	} else {
		rocket.textContent = "no image provided";
	}



  // TODO: Display mission name and description
  // TODO: Display the rocket image
}

// Final step: kick off the flow
getUpcomingLaunches();

// ---------------------------------------------------------------
// PART 2: Axios and promises (refactor after Part 1 is committed)
// ---------------------------------------------------------------
// - Replace both XHR requests with axios.get(...).then(...).catch(...)
// - Show "Loading..." in #status while a request is pending
// - Show a clear error message in #status when a request fails
// - Clear the status message when data arrives
