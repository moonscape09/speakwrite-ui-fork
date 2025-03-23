import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_SERVICE;

export const fetchChats = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/chats`);
        return response.data;
    } catch (error) {
        console.error("Error fetching chats:", error);
        return null;
    }
};

export const createChat = async ( session_id, sender, message) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/chats`, { "session_id": session_id, "sender": sender, "message": message});
        console.log({ session_id: session_id, sender: sender, message: message});
        return response.data;
    }
    catch (error){
        console.error("Error creating chat:", error);
        return null;
    }
}



export const createSession = async ({session_name, user_id, context}) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/sessions`, { session_name: session_name, user_id: user_id, context: context});
        return response.data;
    }
    catch (error){
        console.error("Error creating session:", error);
        return null;
    }
}

export const fetchSessions = async ()  => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sessions`);
        return response.data;
    }
    catch (error) {
        console.error("Error fetching session:", error);
        return null;
    }
}

export const fetchSession = async (session_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/sessions/${session_id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching session with ID: ", session_id, error);
        return null;
    }
}

export const renameSession = async (session_id, new_session_name) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/sessions/${session_id}`, { "new_session_name": new_session_name }); // partial resource update
        return response.data;
    } catch (error) {
        console.error("Error renaming file: ", error);
        return null;
    }
}

export const createUser = async ( username, email, password) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users`, { username: username, email: email, password: password});
        return response.data;
    }
    catch (error){
        console.error("Error creating user:", error);
        return null;
    }
}

export const loginUser = async (email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/login`, { email, password });
      return data;
    } catch (error) {
      // You can extract more detailed error information if needed.
      throw new Error("Login failed. Please check your credentials.");
    }
  };
  
  export const signupUser = async (username, email, password) => {
    try {
      const { data } = await axios.post(`${API_URL}/auth/signup`, {
        username,
        email,
        password,
      });
      return data;
    } catch (error) {
      throw new Error("Signup failed. Please try again.");
    }
  };
