// import axios from 'axios';

// // const API_URL = 'https://coachingwebsite-production.up.railway.app/api';

// const API_URL = 'http://localhost:8080/api';

// const api = axios.create({
//     baseURL: API_URL,
// });

// // Course API calls
// export const getAllCourses = () => api.get('/courses');
// export const getCourseById = (id) => api.get(`/courses/${id}`);
// export const createCourse = (course) => api.post('/courses', course);
// export const updateCourse = (id, course) => api.put(`/courses/${id}`, course);
// export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// // Enquiry API calls
// export const submitEnquiry = (enquiry) => api.post('/enquiries', enquiry);


// // Admin Enquiry API calls
// export const getAllEnquiries = () => api.get('/admin/enquiries');
// export const toggleEnquiryClarified = (id) => api.patch(`/admin/enquiries/${id}/toggle`);

// // Payment API calls
// export const createOrder = (paymentData) => api.post('/create-order', paymentData);
// export const verifyPayment = (data) => api.post('/verify', data);

// // OTP
// export const sendOtp = (email) => api.post(`/send-otp?email=${email}`);
// export const verifyOtpApi = (email, otp) =>
//   api.post(`/verify-otp?email=${email}&otp=${otp}`);

// // User
// export const createUser = (userData) => api.post('/user', userData);

// export default api;

import axios from 'axios';

<<<<<<< HEAD
const API_URL = 'https://coachingwebsite-production.up.railway.app/api';
//const API_URL = 'http://localhost:8080/api';
=======
// const API_URL = 'https://coachingwebsite-production.up.railway.app/api';
const API_URL = 'http://localhost:8080/api';
>>>>>>> f6902d5fca2eaace9a6699115f56f57dfe0f9bb5

const api = axios.create({
  baseURL: API_URL,
});

// ----------------- Courses -----------------
export const getAllCourses = () => api.get('/courses');
export const getCourseById = (id) => api.get(`/courses/${id}`);
export const createCourse = (course) => api.post('/courses', course);
export const updateCourse = (id, course) => api.put(`/courses/${id}`, course);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// ----------------- Enquiries -----------------
// General course enquiry
export const submitEnquiry = (enquiry) => api.post('/enquiries', enquiry);

// Certification enquiry
export const submitCertificationEnquiry = (enquiry) =>
  api.post('/enquiries/certification', enquiry);

// ----------------- Admin Enquiries -----------------
export const getAllEnquiries = () => api.get('/admin/enquiries');
export const toggleEnquiryClarified = (id) =>
  api.patch(`/admin/enquiries/${id}/toggle`);

// ----------------- Payment -----------------
export const createOrder = (paymentData) => api.post('/create-order', paymentData);
export const verifyPayment = (data) => api.post('/verify', data);

// ----------------- OTP -----------------
export const sendOtp = (email) => api.post(`/send-otp?email=${email}`);
export const verifyOtpApi = (email, otp) =>
  api.post(`/verify-otp?email=${email}&otp=${otp}`);

// ----------------- User -----------------
export const createUser = (userData) => api.post('/user', userData);


// ----------------- Interview Questions -----------------
export const addInterviewQuestion = (questionData) =>
  api.post('/interview-questions', questionData);

export const getAllInterviewQuestions = () =>
  api.get('/interview-questions');


// Get approved reviews (for public)
export const getPublicReviews = () => api.get("/reviews/public");

// Get all reviews (for admin)
export const getAllReviews = () => api.get("/reviews/admin");

// Add new review (from user)
export const addReview = (reviewData) => api.post("/reviews", reviewData);

// Toggle review approval (admin)
export const toggleReviewApproval = (reviewId) =>
  api.patch(`/reviews/${reviewId}/toggle`);

export default api;
