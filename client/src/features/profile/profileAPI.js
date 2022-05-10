export const loginAPI = async (userDetails) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userDetails) // {username, password}
  })

  return response.json()
}

export const registerAPI = async (userDetails) => {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userDetails) // {username, password}
  })

  return response.json()
}