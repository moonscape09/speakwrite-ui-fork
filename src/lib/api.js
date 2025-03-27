import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVICE;

export const fetchChats = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/chats`, {headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error fetching chats:", error);
        throw new Error("Failed to fetch chats: " + error.message);    }
};

export const createChat = async ( session_id, sender, message, token) => {
    try {
        console.log(token)
        const response = await axios.post(`${API_BASE_URL}/chats`, { "session_id": session_id, "sender": sender, "message": message}, { headers: { Authorization: `Bearer ${token}` } });
        console.log({ session_id: session_id, sender: sender, message: message});
        return response.data;
    }
    catch (error){
        console.error("Error creating chat:", error);
        throw new Error("Failed to create chat: " + error.message);    }
}



export const createSession = async ({session_name, context}, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sessions`, { session_name: session_name, context: context}, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (error){
        console.error("Error creating session:", error);
        throw new Error("Failed to create session: " + error.message);
    }
}

export const fetchSessions = async (token)  => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sessions`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    }
    catch (error) {
        console.error("Error fetching session:", error);
        throw new Error("Failed to fetch sessions: " + error.message);    }
}

export const fetchSession = async (session_id, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sessions/${session_id}`, { headers: { Authorization: `Bearer ${token}` } });
        return response.data;
    } catch (error) {
        console.error("Error fetching session with ID: ", session_id, error);
        throw new Error(`Failed to fetch session ${session_id}: ` + error.message);    }
}

export const renameSession = async (session_id, new_session_name, token) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/sessions/${session_id}`, { "new_session_name": new_session_name}, {headers:{Authorization: `Bearer ${token}`}} ); // partial resource update
        return response.data;
    } catch (error) {
        console.error("Error renaming file: ", error);
        throw new Error("Failed to rename session: " + error.message);    }
}

export const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, { email, password });
      return data;
    } catch (error) {
      // You can extract more detailed error information if needed.
      throw new Error("Login failed. Please check your credentials.");
    }
}


export const deleteSession = async (session_id, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/sessions/${session_id}`, {headers:{Authorization: `Bearer ${token}`}});
        return response.data;
    } catch (error) {
        console.error("Error deleting session ID: ", error);
        return null;
    }
}

export const signupUser = async ( username, email, password) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/signup`, {
        username,
        email,
        password,
      });
      return data;
    } catch (error) {
      throw new Error("Signup failed. Please try again.");
    }
}
