// Get reference to the select element where we'll add the dog breeds
const breedSelect = document.getElementById('breed-select');
// Get reference to the gallery div where we'll display the dog image
const gallery = document.getElementById('gallery');

// Function to fetch dog breeds from the Dog API
function fetchDogBreeds() {
  // Make a request to the Dog API to get all breeds
  fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => {
      // Convert the response to JSON format
      return response.json();
    })
    .then(data => {
      // The API returns breeds in data.message as an object
      const breeds = data.message;
      
      // Loop through each breed and create an option element
      for (const breed in breeds) {
        // Create a new option element
        const option = document.createElement('option');
        
        // Set the value and text of the option
        option.value = breed;
        option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1); // Capitalize first letter
        
        // Add the option to the select element
        breedSelect.appendChild(option);
      }
    })
    .catch(error => {
      // If there's an error, log it to the console
      console.error('Error fetching dog breeds:', error);
    });
}

// Function to fetch 9 random images of the selected dog breed
function fetchRandomDogImage(breed) {
  // Clear the gallery first
  gallery.innerHTML = '';
  
  // Make a request to get 9 random images for the selected breed
  fetch(`https://dog.ceo/api/breed/${breed}/images/random/9`)
    .then(response => {
      // Convert the response to JSON format
      return response.json();
    })
    .then(data => {
      // The API returns an array of image URLs in data.message
      const imageUrls = data.message;
      
      // Loop through each image URL and create an img element
      imageUrls.forEach((imageUrl, index) => {
        // Create an img element to display the dog image
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = `Random ${breed} dog image ${index + 1}`;
        img.className = 'gallery-image';
        
        // Add the image to the gallery
        gallery.appendChild(img);
      });
    })
    .catch(error => {
      // If there's an error, log it and show a message to the user
      console.error('Error fetching dog images:', error);
      gallery.innerHTML = '<p>Sorry, could not load images for this breed.</p>';
    });
}

// Add event listener to the select element to detect when a breed is chosen
breedSelect.addEventListener('change', function() {
  // Get the selected breed value
  const selectedBreed = breedSelect.value;
  
  // Only fetch an image if a breed was actually selected (not the default option)
  if (selectedBreed) {
    fetchRandomDogImage(selectedBreed);
  } else {
    // If no breed is selected, clear the gallery
    gallery.innerHTML = '';
  }
});

// Call the function when the page loads
fetchDogBreeds();