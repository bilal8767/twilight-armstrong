fetch('http://localhost:3001/api/submissions')
  .then(res => res.json())
  .then(data => console.log("SUCCESS:", data))
  .catch(err => console.error("ERROR:", err));
