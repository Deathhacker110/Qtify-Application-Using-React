import React, { useEffect, useState } from "react";
import { useLocation, useParams,useNavigate } from "react-router-dom";
import { faLessThan,faGreaterThan,faShuffle,faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Duration from "./Duration";
let RoutedPart = () => {
  let [data, setData] = useState([]);
  let [loading, setLoading] = useState(true);
  let [currentPage, setCurrentPage] = useState(1);
  let itemsPerPage = 10; 
  let navigate=useNavigate();
  let dataTop = useLocation();
  let innerData = dataTop.state.topSongs;
  console.log(innerData);
   
  let name = useParams();
  console.log(name);

  useEffect(() => {
    fetch(`https://qtify-backend-labs.crio.do/album/${name.name}`)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        console.log(d);
      });
      
  }, [name.name]);

  
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  let currentData = (data.songs || []).slice(startIndex, endIndex);
  let totalPages = Math.ceil((data.songs || []).length / itemsPerPage);

  let handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="pageMain">
        <span className="carouselButton" style={{
            color:"white",
            position:"absolute",
            left:"20px",
            top:"16%"
            }}
            onClick={()=>navigate("/")}
            ><FontAwesomeIcon icon={faLessThan}/></span>
      <div className="topContainer">
        <div className="imageCon">
          <img src={data.image} alt=""/>
        </div>
        <div className="contentCon">
          <h1 style={{color:"white"}}>Best of {data.title} in 2050</h1>
          <p>Lorem ipsum dolor sit amet.</p>
          <div className="count">
              <span>{(data.songs || []).length} songs</span>
              <Duration songs={data.songs}/>
              {/* <span>duration</span> */}
              <span>{data.follows} Follows</span>
          </div>
          <div className="shuffle">
            <span><FontAwesomeIcon icon={faShuffle}/>Shuffule</span>
            <span><FontAwesomeIcon icon={faBookmark}/>Add to Library</span>
          </div>
        </div>
      </div>
        {/* Pagination */}
        <div className="pagination-container">
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <FontAwesomeIcon icon={faLessThan} />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <FontAwesomeIcon icon={faGreaterThan} />
                </button>
            </div>
        </div>

        {/* Table */}
        <div className="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Artist</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {(currentData || []).map((song, index) => (
                        <tr key={index}>
                            <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                    <img src={song.image} style={{ width: "60px", height: "60px" }} alt="Song" />
                                    {song.title}
                                </div>
                            </td>
                            <td>{song.artists[0]}</td>
                            <td>
                                {`${Math.floor(song.durationInMs / 60000).toString().padStart(2, '0')} min ${Math.floor((song.durationInMs % 60000) / 1000).toString().padStart(2, '0')} sec`}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);
  
};

export default RoutedPart;
