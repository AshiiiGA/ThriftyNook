<script>
  // Fetch data from the API endpoint
  fetch('http://localhost:3000/api/search')
    .then(response => response.json())
    .then(data => {
      // Update the furnitures variable with the received data
      const furnitures = data.furnitures;
      // Render the template with the updated data
      const template = document.getElementById('template').innerHTML;
      const rendered = ejs.render(template, { furnitures });
      document.getElementById('content').innerHTML = rendered;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
</script>
