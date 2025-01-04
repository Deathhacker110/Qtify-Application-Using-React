import React, { useState, useRef, useEffect } from "react";
import Custom from "./Custom";
import { useNavigate } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faGreaterThan,faLessThan } from '@fortawesome/free-solid-svg-icons';

let NewSongs = () => {
  let [currentIndex, setCurrentIndex] = useState(0);
  let [carouselWidth, setCarouselWidth] = useState(0);
  let [showAll, setShowAll] = useState(false);
  let scrollRef = useRef(null);
  let navigate = useNavigate();

  let newSongs = Custom("https://qtify-backend-labs.crio.do/albums/new");

  // Update carousel width when the window is resized
  useEffect(() => {
    const updateCarouselWidth = () => {
      if (scrollRef.current) {
        setCarouselWidth(scrollRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateCarouselWidth);
    updateCarouselWidth(); // Call on component mount

    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, []);

  const handleNext = () => {
    if (currentIndex < newSongs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleToggle = () => {
    setShowAll(!showAll);
  };

  return (
    <>
    <div className="songMain">
      <div className="songHead">
        <h1>New Albums</h1>
        <h1 onClick={handleToggle} className="toggleButton" style={{color:" #34c94b"}}>
          {showAll ? "Collapse" : "Show All"}
        </h1>
      </div>

      {!showAll ? (
        <div className="carouselContainer">
          {currentIndex > 0 && (
            <button className="carouselButton prevButton" onClick={handlePrev}>
              <FontAwesomeIcon icon={faLessThan} />
            </button>
          )}
          <div className="carouselViewport" ref={scrollRef}>
            <div
              className="carouselTrack"
              style={{
                transform: `translateX(-${currentIndex * 77}px)`,
                transition: "transform 0.5s ease-in-out",
                width: `${newSongs.length * 100}px`,
              }}
            >
              {newSongs.map((s) => (
                <div
                  className="imgTitle"
                  key={s.id}
                  onClick={() =>
                    navigate(`/innerImage/${s.slug}`, { state: { newSongs } })
                  }
                >
                  <img src={s.image} alt={s.name} className="songImage" />
                  <span style={{color:"white"}} className="custom-tooltip">{`${s.songs.length} Songs`}</span>
                  <div className="followDiv">
                    <span className="follows">{s.follows} Follows</span>
                  </div>
                  <h1 className="songTitle">{s.title}</h1>
                </div>
              ))}
            </div>
          </div>
          <button
            className="carouselButton nextButton"
            onClick={handleNext}
            disabled={currentIndex === newSongs.length - 1}
          >
           <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      ) : (
        <div className="gridFormat">
          {newSongs.map((s) => (
            <div
              className="imgTitle"
              key={s.id}
              onClick={() =>
                navigate(`/innerImage/${s.slug}`, { state: { newSongs } })
              }
            >
              <img src={s.image} alt={s.name} className="songImage" />
              <div className="followDiv">
                <span className="follows">{s.follows} Follows</span>
              </div>
              <h1 className="songTitle">{s.title}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
    <hr style={{  backgroundColor: 'green', height: '3px', border: 'none' }} />
    </>
  );
};

export default NewSongs;
