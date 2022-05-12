export const fetchAllChatsAPI = () => {
  const response = fetch('/api/get_all_posts', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify()// {sortOrder: sortOrder, tags: tags}
  }
  ) 
    
    // Validate [{postID, title}]
    
  return response.json()
} 

export const sendGroupMessageAPI = (messageDetails) => {
    const response = fetch('/api/get_all_posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({group: "info2222", message: messageDetails.message})// {sortOrder: sortOrder, tags: tags}
      }
      ) 
      
      return response.json()
}

export const recieveGroupMessagesAPI = (groupName) => {
    const response = fetch('/api/get_group_messages', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({group: "info2222", page: 1}) 
      }
      ) 
            
      return response.json()
}