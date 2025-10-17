import React, { useState, useEffect } from 'react';
import { getAllCourses, createCourse, updateCourse, deleteCourse, getAllEnquiries, toggleEnquiryClarified,getAllReviews,toggleReviewApproval } from '../services/api';
import './AdminPage.css';
import InterviewQuestionForm from './InterviewQuestionForm';

// A dedicated component for the course form, now displayed within a tab
const CourseForm = ({ initialCourse, isEditing, onSave, onCancel }) => {
    const [course, setCourse] = useState(initialCourse);

    useEffect(() => {
        setCourse(initialCourse);
    }, [initialCourse]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(course);
    };

    return (
        <div className="form-container card">
            <h3>{isEditing ? 'Edit Course Details' : 'Add a New Course'}</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={course.title} onChange={handleChange} placeholder="e.g., Advanced React" required />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={course.description} onChange={handleChange} placeholder="Describe the course" required />
                </div>
                <div className="form-group">
                    <label>Price (INR)</label>
                    <input type="number" name="price" value={course.price} onChange={handleChange} placeholder="e.g., 4999" required />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label>Start Date</label>
                        <input type="date" name="startDate" value={course.startDate || ''} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label>Duration</label>
                        <input type="text" name="duration" value={course.duration} onChange={handleChange} placeholder="e.g., 8 Weeks" />
                    </div>
                </div>
                <div className="form-group">
                    <label>Timings</label>
                    <input type="text" name="timings" value={course.timings} onChange={handleChange} placeholder="e.g., 7-9 PM IST" />
                </div>
                <div className="form-actions">
                    <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>
                    <button type="submit" className="btn-submit">{isEditing ? 'Update Course' : 'Add Course'}</button>
                </div>
            </form>
        </div>
    );
};


function AdminPage() {
    const [activeTab, setActiveTab] = useState('existing'); // Default to 'existing'
    const [courses, setCourses] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentCourse, setCurrentCourse] = useState({ title: '', description: '', price: '', startDate: '', duration: '', timings: '' });
    const [isEditing, setIsEditing] = useState(false);

    const [reviews, setReviews] = useState([]);

    const handleToggleReview = async (id) => {
  try {
    await toggleReviewApproval(id);
    const updatedReviews = await getAllReviews();
    setReviews(updatedReviews.data);
  } catch (error) {
    console.error("Failed to toggle review approval:", error);
    alert("Could not update review status.");
  }
};

    
   useEffect(() => {
  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [coursesRes, enquiriesRes, reviewsRes] = await Promise.all([
        getAllCourses(),
        getAllEnquiries(),
        getAllReviews()
      ]);
      setCourses(coursesRes.data);
      setEnquiries(enquiriesRes.data.sort((a,b) => a.clarified - b.clarified));
      setReviews(reviewsRes.data);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
    }
    setIsLoading(false);
  };
  fetchAllData();
}, []);


    const resetAndSwitchToExisting = () => {
        setCurrentCourse({ title: '', description: '', price: '', startDate: '', duration: '', timings: '' });
        setIsEditing(false);
        setActiveTab('existing');
    };

    const handleAddNew = () => {
        setIsEditing(false);
        setCurrentCourse({ title: '', description: '', price: '', startDate: '', duration: '', timings: '' });
        setActiveTab('manage');
    };

    const handleEdit = (course) => {
        setIsEditing(true);
        setCurrentCourse({ ...course, startDate: course.startDate || '' });
        setActiveTab('manage');
    };

    const handleSaveCourse = async (courseData) => {
        const finalData = { ...courseData, price: parseFloat(courseData.price) || 0 };
        try {
            if (isEditing) {
                await updateCourse(finalData.id, finalData);
            } else {
                await createCourse(finalData);
            }
            const updatedCourses = await getAllCourses();
            setCourses(updatedCourses.data);
            resetAndSwitchToExisting();
        } catch (error) {
            console.error("Failed to save course:", error);
            alert("Error: Could not save course.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to permanently delete this course?')) {
            try {
                await deleteCourse(id);
                setCourses(courses.filter(c => c.id !== id));
            } catch (error) {
                console.error("Failed to delete course:", error);
                alert("Error: Could not delete course.");
            }
        }
    };
    
    const handleToggleClarified = async (id) => {
        try {
            await toggleEnquiryClarified(id);
            const res = await getAllEnquiries();
            setEnquiries(res.data.sort((a, b) => a.clarified - b.clarified));
        } catch (error) {
            console.error("Failed to update enquiry:", error);
        }
    };

    return (
        <div className="admin-container">
            <div className="admin-tabs">
                <button className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`} onClick={() => setActiveTab('manage')}>Manage Course</button>
                <button className={`tab-button ${activeTab === 'existing' ? 'active' : ''}`} onClick={() => setActiveTab('existing')}>Existing Courses</button>
                <button className={`tab-button ${activeTab === 'enquiries' ? 'active' : ''}`} onClick={() => setActiveTab('enquiries')}>Manage Enquiries</button>
                <button className={`tab-button ${activeTab === 'interviewQuestions' ? 'active' : ''}`} onClick={() => setActiveTab('interviewQuestions')}>Interview Questions</button>
                <button className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>Manage Reviews</button>

            </div>

            <div className="tab-content">
                {isLoading ? <div className="loading">Loading...</div> : (
                    <>
                        {activeTab === 'manage' && (
                            <CourseForm
                                initialCourse={currentCourse}
                                isEditing={isEditing}
                                onSave={handleSaveCourse}
                                onCancel={resetAndSwitchToExisting}
                            />
                        )}

                        {activeTab === 'existing' && (
                            <div className="admin-section card">
                                <div className="section-header">
                                    <h2>Your Courses ({courses.length})</h2>
                                    <button className="btn-add-new" onClick={handleAddNew}>+ Add New Course</button>
                                </div>
                                <div className="admin-course-list">
                                    {courses.length > 0 ? courses.map(course => (
                                        <div key={course.id} className="admin-course-item">
                                            <div className="course-info"><h4>{course.title}</h4><p>Price: ₹{course.price}</p></div>
                                            <div className="course-actions">
                                                <button className="btn-edit" onClick={() => handleEdit(course)}>Edit</button>
                                                <button className="btn-delete" onClick={() => handleDelete(course.id)}>Delete</button>
                                            </div>
                                        </div>
                                    )) : <p>No courses found. Click "Add New Course" to begin.</p>}
                                </div>
                            </div>
                        )}

{activeTab === 'enquiries' && (
  <div className="admin-section card">
    <div className="enquiry-header">
      <h2>Client Enquiries</h2>
      <span>{enquiries.filter(e => !e.clarified).length} pending actions</span>
    </div>
    <div className="enquiry-table-container">
      <table className="enquiry-table">
        <thead>
          <tr>
            <th>Status</th>
            <th>Type</th>
            <th>Title</th>
            <th>Contact Info</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {enquiries.length > 0 ? (
            enquiries.map((enquiry) => (
              <tr
                key={`${enquiry.type}-${enquiry.id}`}
                className={enquiry.clarified ? "clarified" : "pending"}
              >
                {/* --- ADD data-label ATTRIBUTES TO EACH <td> --- */}
                <td data-label="Status">
                  <span
                    className={`status-badge status-${
                      enquiry.clarified ? "clarified" : "pending"
                    }`}
                  >
                    {enquiry.clarified ? "Clarified" : "Pending"}
                  </span>
                </td>
                <td data-label="Type">{enquiry.type}</td>
                <td data-label="Title">{enquiry.title || "Untitled"}</td>
                <td data-label="Contact">
                  <strong>{enquiry.name}</strong>
                  <br />
                  {enquiry.email}
                  <br />
                  {enquiry.phone || "N/A"}
                </td>
                <td data-label="Message" className="message-cell">{enquiry.message}</td>
                <td data-label="Action">
                  {enquiry.type === "course" ? (
                    <button
                      className="btn-toggle-status"
                      onClick={() => handleToggleClarified(enquiry.id)}
                    >
                      Mark as {enquiry.clarified ? "Pending" : "Clarified"}
                    </button>
                  ) : (
                    <em>Not applicable</em>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No enquiries yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}
                                                {/* --- ADD NEW TAB CONTENT --- */}
                        {activeTab === 'interviewQuestions' && (
                            <InterviewQuestionForm />
                        )}

                        {activeTab === 'reviews' && (
  <div className="admin-section card">
    <h2>All Reviews ({reviews.length})</h2>
    <div className="review-table-container">
      <table className="review-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Message</th>
            <th>Rating</th>
            <th>Created At</th>
            <th>Approved</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? reviews.map(review => (
            <tr key={review.id} className={review.approved ? "approved" : "pending"}>
              <td>{review.name}<br/><small>{review.email}</small></td>
              <td>{review.message}</td>
              <td>{review.rating} ⭐</td>
              <td>{review.createdAt ? new Date(review.createdAt).toLocaleString() : "-"}</td>
              <td>
                <button
                  className={`btn-toggle-status ${review.approved ? 'approved-btn' : 'pending-btn'}`}
                  onClick={() => handleToggleReview(review.id)}
                >
                  {review.approved ? "Approved" : "Pending"}
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="6">No reviews found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
)}

                    </>
                )}
            </div>
        </div>
    );
}

export default AdminPage;