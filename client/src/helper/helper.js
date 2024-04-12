import axios from "axios";
axios.defaults.baseURL = "http://localhost:8080";

// const stripePromise = loadStripe('pk_live_51OqcQzSIJlfAXLI2S0mzszoIik8UJOkI1kiH8dpPXo2WGAw0PgMV3MjksuWqJ3cn5VUJQkv7ix00j2GYZOW2M7GP00Nl7TH2te');
export async function generateOtp(number) {
  try {
    const response = await axios.post("/api/generateOtp", { number });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
}

export async function verifyOtp(otp) {
  try {
    const response = await axios.get("/api/verifyOtp", {
      params: { code: otp },
    });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Error in verify OTP:", error);
    throw error;
  }
}
export async function register(number, otp) {
  try {
    const response = await axios.post("/api/register", { number, otp });
   
    console.log(response.status);
    
    if (response.status === 201 && response.data.token) {
      await localStorage.setItem("token", response.data.token);
    }

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("Error in verify OTP:", error);
    throw error;
  }
}


export async function submitDetails(response) {
  try {
    const token = await localStorage.getItem("token");
    const { data} = await axios.post("/api/submitDetails", response, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    return data;

  } catch (error) {
    console.error("Error on Submit:", error);
    return Promise.reject({ error: "Couldn't Submit" });
  }
}

export const fetchUserData = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching user dataaaaaaa:", error);
    throw error;
  }
};

export function calculateAge(birthdateString) {
  const birthdate = new Date(birthdateString);
  const currentDate = new Date();

  // Calculate the difference in years
  const age = currentDate.getFullYear() - birthdate.getFullYear();

  // Adjust the age if the birthdate hasn't occurred yet this year
  if (
    currentDate.getMonth() < birthdate.getMonth() ||
    (currentDate.getMonth() === birthdate.getMonth() &&
      currentDate.getDate() < birthdate.getDate())
  ) {
    return age - 1;
  } else {
    return age;
  }
}


export const submitPhotos=async(response)=>{
  try {
 
    const token = await localStorage.getItem("token");
console.log('start',response)
    const { data} = await axios.post("/api/submitPhotos",response ,{
      headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' },
    });
    console.log('stop',data)
    return data;

  } catch (error) {
    console.error("Error on Submit:", error);
    return Promise.reject({ error: "Couldn't Submit" });
  }
}
export const deletePhotos = async (index) => {
  try {
    const token = await localStorage.getItem("token");
    const { data } = await axios.delete(`/api/deletePhoto/${index}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error on Submit:", error);
    return Promise.reject({ error: "Couldn't Submit" });
  }
}
export const submitDP=async(response)=>{
  try {
    const token = await localStorage.getItem("token");

    const { data} = await axios.post("/api/submitDP",response ,{
      headers: {
        Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data' },
    });

    return data;

  } catch (error) {
    console.error("Error on Submit:", error);
    return Promise.reject({ error: "Couldn't Submit" });
  }
}

export const fetchAllUserData = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getAllUsers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
   
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.status === 200) {
      throw new Error('Failed to fetch user data');
    }

    return response.data.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const  fetchPremiumPlan  = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get("/api/getPlan", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.Premium;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};



export const subscribePremium = async ( plan) => {
  try {
    const token = await localStorage.getItem("token");
    await axios.post("/api/create-subscription", plan,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {

      alert("Payment Success");
    })
    .catch(error => {
      console.log("Payment Error: ", error);
      alert("Payment Error");
    });
  } catch (error) {
    console.log(error);
  }
};



export const getSubscription = async () => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get('/api/getSubscription', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
// alert(response)
    return response.status;
  } catch (error) {
    console.error('Error fetching subscription data:', error.status);
    throw error;
  }
};


export const sendMessage = async (data) => {
  try {

    const token = await localStorage.getItem("token");
    const response = await axios.post('/api/sendMessage',data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
// alert(response)
    return response.status;
  } catch (error) {
    console.error('Error fetching subscription data:', error.status);
    throw error;
  }
};

export const getMessages = async (friendId) => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get(`/api/getMessages/${friendId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};


export const sendLike = async (friendId,liked) => {
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.post(`/api/sendLike/${friendId}`,liked,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
    return response; 
  } catch (error) {
    console.error('Error send like:', error);
    throw error;
  }
}

export const getLike=async (friendId)=>{
  try {
    const token = await localStorage.getItem("token");
    const response = await axios.get(`/api/getLike/${friendId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Error in getting like:', error);
    throw error;
  }
}