import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVICE;

let alerted = false; // Flag to track if the alert has been shown

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  // Store the logout handler (you'll set this from your main app)
  let logoutHandler = null;
  
  export const setLogoutHandler = (handler) => {
    logoutHandler = handler;
  };
  
  // Interceptor to handle 401 errors
  apiClient.interceptors.response.use(
    (response) => response, // Pass through successful responses
    (error) => {
      if (error.response && error.response.status === 401) {
        if (!alerted) {
          alerted = true; // Set the flag to true to prevent multiple alerts
          alert("Session expired. Please login again.");
        }
        if (logoutHandler) {
          logoutHandler(); // Trigger logout
        }
      }
      return Promise.reject(error); // Continue throwing the error for the caller to handle
    }
  );

export const fetchChats = async (token) => {
    try {
        const response = await apiClient.get(`/chats`, {headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
        console.error("Error fetching chats:", error);
        throw new Error("Failed to fetch chats: " + error.message);    }
};

export const createChat = async ( session_id, sender, message, token) => {
    try {
        console.log(token)
        const response = await apiClient.post(`/chats`, { "session_id": session_id, "sender": sender, "message": message}, { headers: { Authorization: `Bearer ${token}` } });
        console.log({ session_id: session_id, sender: sender, message: message});
        return response.data;
    }
    catch (error){
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
        console.error("Error creating chat:", error);
        throw new Error("Failed to create chat: " + error.message);    }
}



export const createSession = async ({session_name, context}, token) => {
    try {
        const response = await apiClient.post(`/sessions`, { session_name: session_name, context: context}, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (error){
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
        console.error("Error creating session:", error);
        throw new Error("Failed to create session: " + error.message);
    }
}

export const fetchSessions = async (token)  => {
    try {
        const response = await apiClient.get(`/sessions`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (error) {
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch sessions: " + error.message);    }
}

export const fetchSession = async (session_id, token) => {
    try {
        const response = await apiClient.get(`/sessions/${session_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
        console.error("Error fetching session with ID: ", session_id, error);
        throw new Error(`Failed to fetch session ${session_id}: ` + error.message);    }
}

export const renameSession = async (session_id, new_session_name, token) => {
    try {
        const response = await apiClient.patch(`/sessions/${session_id}`, { "new_session_name": new_session_name}, {headers:{Authorization: `Bearer ${token}`}} ); // partial resource update
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
        console.error("Error renaming file: ", error);
        throw new Error("Failed to rename session: " + error.message);    }
}

export const loginUser = async (email, password) => {
    try {
      const { data } = await apiClient.post(`/auth/login`, { email, password });
      alerted = false; // Reset the alert flag on successful login
      return data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
      // You can extract more detailed error information if needed.
      throw new Error("Login failed. Please check your credentials.");
    }
}


export const deleteSession = async (session_id, token) => {
    try {
        const response = await apiClient.delete(`/sessions/${session_id}`, {headers:{Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
        console.error("Error deleting session ID: ", error);
        return null;
    }
}

export const signupUser = async ( username, email, password) => {
    try {
      const { data } = await apiClient.post(`/auth/signup`, {
        username,
        email,
        password,
      });
      alerted = false; // Reset the alert flag on successful signup
      return data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            // Silently ignore 401 since the interceptor handles it
            return null; // Or return an empty array/default value if needed
          }
      throw new Error("Signup failed. Please try again.");
    }
}

export const update_chat_history = async (history) => {
    try {
        const response = await axios.post(`http://localhost:8000/chat_history`, { history });
        return response.data;
    } catch (error) {
        console.error("Error updating chat history:", error);
        throw new Error("Failed to update chat history: " + error.message);    
    }
}