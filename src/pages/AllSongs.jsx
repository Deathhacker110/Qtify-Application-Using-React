import React, { useState, useRef, useEffect, useReducer } from "react";
import Custom from "./Custom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";

const AllSongs = () => {
  let [currentIndex, setCurrentIndex] = useState(0);
  let [carouselWidth, setCarouselWidth] = useState(0);
  let [showAll, setShowAll] = useState(false);
  let [genreActive, setGenreActive] = useState("all");
  let scrollRef = useRef(null);

  let fun = (state, action) => {
    switch (action.type) {
      case "rock":
        return action.payload.filter((song) => song["genre"].key === "rock");
      case "pop":
        return action.payload.filter((song) => song["genre"].key === "pop");
      case "jazz":
        return action.payload.filter((song) => song["genre"].key === "jazz");
      case "blues":
        return action.payload.filter((song) => song["genre"].key === "blues");
      case "all":
        return action.payload;
      default:
        return state;
    }
  };

  let [currentSongs, setAllSongs] = useReducer(fun, []);
  let allSongs = Custom("https://qtify-backend-labs.crio.do/songs");

  useEffect(() => {
    if (allSongs.length > 0) {
      setAllSongs({ type: "all", payload: allSongs });
    }
  }, [allSongs]);

  useEffect(() => {
    let updateCarouselWidth = () => {
      if (scrollRef.current) {
        setCarouselWidth(scrollRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", updateCarouselWidth);
    updateCarouselWidth();

    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, []);

  let handleNext = () => {
    if (currentIndex < allSongs.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  let handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  let handleToggle = () => {
    setShowAll(!showAll);
  };

  let handleActive = (genre) => {
    setGenreActive(genre);
  };

  return (
    <>
    <div className="songMain">
      <div className="songHead">
        <h1>Songs</h1>
        <h1 onClick={handleToggle} className="toggleButton" style={{color:" #34c94b"}}>
          {showAll ? "Collapse" : "Show All"}
        </h1>
      </div>
      <div className="genreList">
        <ul className="genreUl">
          <li
            onClick={() => {
              setAllSongs({ type: "all", payload: allSongs });
              handleActive("all");
            }}
            className={genreActive === "all" ? "activeGenre" : ""}
          >
            ALL
          </li>
          <li
            onClick={() => {
              setAllSongs({ type: "rock", payload: allSongs });
              handleActive("rock");
            }}
            className={genreActive === "rock" ? "activeGenre" : ""}
          >
            ROCK
          </li>
          <li
            onClick={() => {
              setAllSongs({ type: "pop", payload: allSongs });
              handleActive("pop");
            }}
            className={genreActive === "pop" ? "activeGenre" : ""}
          >
            POP
          </li>
          <li
            onClick={() => {
              setAllSongs({ type: "jazz", payload: allSongs });
              handleActive("jazz");
            }}
            className={genreActive === "jazz" ? "activeGenre" : ""}
          >
            JAZZ
          </li>
          <li
            onClick={() => {
              setAllSongs({ type: "blues", payload: allSongs });
              handleActive("blues");
            }}
            className={genreActive === "blues" ? "activeGenre" : ""}
          >
            BLUES
          </li>
        </ul>
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
                transform: `translateX(-${currentIndex * 170}px)`,
                transition: "transform 0.5s ease-in-out",
                width: `${allSongs.length * 100}px`,
              }}
            >
              {currentSongs.map((s) => (
                <div className="imgTitle" key={s.id}>
                  <img src={s.image} alt={s.name} className="songImage" />
                  <div className="followDiv">
                    <span className="follows">{s.likes} Likes</span>
                  </div>
                  <h1 className="songTitle">{s.title}</h1>
                </div>
              ))}
            </div>
          </div>
          <button
            className="carouselButton nextButton"
            onClick={handleNext}
            disabled={currentIndex === allSongs.length - 1}
          >
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      ) : (
        <div className="gridFormat">
          {currentSongs.map((s) => (
            <div className="imgTitle" key={s.id}>
              <img src={s.image} alt={s.name} className="songImage" />
              <div className="followDiv">
                <span className="follows">{s.likes} Likes</span>
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

export default AllSongs;
