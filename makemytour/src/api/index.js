import axios from "axios";

const BACKEND_URL = "http://localhost:8080";

export const login = async (email, password) => {
  try {
    const url = `${BACKEND_URL}/user/login?email=${email}&password=${password}`;
    const res = await axios.post(url);
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error("Invalid email or password. Please try again.");
    } else {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  }
};

export const signup = async (
  firstname,
  lastname,
  email,
  phoneNumber,
  password
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/user/signup`, {
      firstname,
      lastname,
      email,
      phoneNumber,
      password,
    });
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 409) {
      throw new Error("This email is already registered. Please login.");
    } else {
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  }
};

//----This is for User Management Search
export const getuserbyemail = async (email) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/user/email?email=${email}`);
    const data = res.data;
    return data;
  } catch (error) {
     if (error.response && error.response.status === 404) {
      return null; // User not found, return null
    }
    throw error;
  }
};

//-------For Profile Page
export const editprofile = async (
  id,
  firstname,
  lastname,
  email,
  phoneNumber
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/user/edit?id=${id}`, {
      firstname,
      lastname,
      email,
      phoneNumber,
    });
    const data = res.data;
    return data;
  } catch (error) {}
};
export const getflight = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/flight`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(data);
  }
};

export const addflight = async (
  flightName,
  from,
  to,
  departureTime,
  arrivalTime,
  price,
  availableSeats
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/admin/flight`, {
      flightName,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      availableSeats,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editflight = async (
  id,
  flightName,
  from,
  to,
  departureTime,
  arrivalTime,
  price,
  availableSeats
) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/admin/flight/${id}`, {
      flightName,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      availableSeats,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteflight = async (id) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/admin/flight/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

export const gethotel = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/hotel`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(data);
  }
};

export const addhotel = async (
  hotelName,
  location,
  pricePerNight,
  availableRooms,
  amenities
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/admin/hotel`, {
      hotelName,
      location,
      pricePerNight,
      availableRooms,
      amenities,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const edithotel = async (
  id,
  hotelName,
  location,
  pricePerNight,
  availableRooms,
  amenities
) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/admin/hotel/${id}`, {
      hotelName,
      location,
      pricePerNight,
      availableRooms,
      amenities,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteHotel = async (id) => {
  try {
    const res = await axios.delete(`${BACKEND_URL}/admin/hotel/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete failed:", error);
    throw error;
  }
};

export const handleflightbooking = async (userId, flightId, seats, price) => {
  try {
    const url = `${BACKEND_URL}/booking/flight?userId=${userId}&flightId=${flightId}&seats=${seats}&price=${price}`;
   
    const res = await axios.post(url);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handlehotelbooking = async (userId, hotelId, rooms, price) => {
  try {
    const url = `${BACKEND_URL}/booking/hotel?userId=${userId}&hotelId=${hotelId}&rooms=${rooms}&price=${price}`;
    const res = await axios.post(url);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
