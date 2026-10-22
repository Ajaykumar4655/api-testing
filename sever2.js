
const baseURL = "https://jsonplaceholder.typicode.com/users";

// Helper function to send requests and display JSON responses
async function testAPI(method, url, data) {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    // Add a JSON body only when data is provided
    if (data !== undefined) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    console.log("\nMethod:", method);
    console.log("Status:", response.status);

    // Some responses, such as DELETE, may have no body
    const text = await response.text();
    const result = text ? JSON.parse(text) : null;

    console.log("Response:", result);
  } catch (error) {
    console.error("API error:", error.message);
  }
}

async function main() {
  // 1. GET: retrieve users
  await testAPI("GET", baseURL);

  // 2. POST: simulate creating a user
  await testAPI("POST", baseURL, {
    name: "Rahul Patel",
    username: "rahul123",
    email: "rahul@example.com"
  });

  // 3. PUT: simulate updating a user
  await testAPI("PUT", `${baseURL}/1`, {
    id: 1,
    name: "Rahul Patel",
    username: "rahul123",
    email: "rahul@example.com"
  });

  // 4. DELETE: simulate deleting a user
  await testAPI("DELETE", `${baseURL}/1`);
}

main();
