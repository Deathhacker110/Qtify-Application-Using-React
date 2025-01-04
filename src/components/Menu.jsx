import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTimes } from "@fortawesome/free-solid-svg-icons";
import Custom from "../pages/Custom";
import { useNavigate } from "react-router-dom";
import "./menu.css"; 

const Menu = () => {
  // let songs=Custom("https://qtify-backend-labs.crio.do/songs");
  let topSongs = Custom("https://qtify-backend-labs.crio.do/albums/top");
  let newSongs = Custom("https://qtify-backend-labs.crio.do/albums/new");
  let songs=[...topSongs,...newSongs];
  // console.log(topSongs);
  // console.log(newSongs);
  // console.log(songs);
  let [search, setSearch] = useState("");
  let [onFocus,setOnFocus]=useState(false);
  let [showFeedbackForm, setShowFeedbackForm] = useState(false); 
  let [feedback, setFeedback] = useState({
    fullname: "",
    email: "",
    subject: "",
    message: "",
  }); // Feedback form data
  let navigate = useNavigate();

  let handleChange = (e) => {
    setSearch(e.target.value);
  };

  let handleFeedbackClick = () => {
    setShowFeedbackForm(true); 
  };

  let handleFeedbackClose = () => {
    setShowFeedbackForm(false); 
  };

  let handleFocus = () => {
    setOnFocus(true);
  };

  let handleInputChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    alert("Thank you for your feedback!");
    setFeedback({ fullname: "", email: "", subject: "", message: "" }); 
    setShowFeedbackForm(false);
  };

  let filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showFeedbackForm && (
        <div className="overlay"></div>
      )}
      <div className={showFeedbackForm ? "blurred" : ""}>
        <nav className="navbar">
          <div onClick={() => navigate("/")} className="logo-container">
            <img src="image.png" alt="Logo" className="logo" />
          </div>
          <div className="search-container">
            <div className="search-bar">
              <input
                type="search"
                placeholder="Search an album of your choice"
                value={search}
                onChange={handleChange}
                onFocus={handleFocus}
                className="search-input"
              />
              <div className="search-icon">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </div>
            </div>

            {search && onFocus && (
              <div className="search-results" style={{height:"250px"}}>
                {filteredSongs.length > 0 ? (
                  <ul className="search-list">
                    {filteredSongs.map((song) => (
                      <li
                        key={song.id}
                        className="search-item"
                        onClick={() => navigate(`/innerImage/${song.slug}`, { state: { songs } })}
                      >
                        <img src={song.image} alt={song.title} className="song-image" />
                        <div className="song-details">
                          <h3 className="song-title">{song.title}</h3>
                          <h3 className="song-follows">{song.follows} Follows</h3>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="no-results">No albums found.</p>
                )}
              </div>
            )}
          </div>
          <div>
            <input
              type="button"
              value="Feedback"
              onClick={handleFeedbackClick}
              className="feedback-btn"
            />
          </div>
        </nav>
      </div>

      {/* Feedback Form */}
      {showFeedbackForm && (
        <div className="feedback-form">
          <div className="feedback-header">
            <h2>Feedback</h2>
            <button
              onClick={handleFeedbackClose}
              className="close-btn"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-input">
              <input required
                type="text"
                name="fullname"
                value={feedback.fullname}
                onChange={handleInputChange}
                placeholder="Full Name"
                className="input-field"
              />
            </div>
            <div className="form-input">
              <input required
                type="email"
                name="email"
                value={feedback.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="input-field"
              />
            </div>
            <div className="form-input">
              <input required
                type="text"
                name="subject"
                value={feedback.subject}
                onChange={handleInputChange}
                placeholder="Subject"
                className="input-field"
              />
            </div>
            <div className="form-input">
              <textarea 
                name="message"
                value={feedback.message}
                onChange={handleInputChange}
                placeholder="Enter your feedback here"
                rows="5"
                className="input-field"
              ></textarea>
            </div>
            <button
              type="submit"
              className="submit-btn"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Menu;
