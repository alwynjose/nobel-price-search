import React from 'react';
import "./SearchAwards.css";
import { useState } from 'react';

/**
 * @param {string} placeholder placeholder sentence or word.
 * @param {Object} data overall data fetched
 */
function SearchAwards({placeholder, data}) {

    const [awardsData, setAwardsData] = useState([]); // set initial awardsData to be empty
    const [searchTerm, setSearchTerm] = useState(""); // set the search term to be empty

    //console.log(data);

    const filterData = (event) => {
      const searchAwardTerm = event.target.value;
      setSearchTerm(searchAwardTerm); // sets the search term
      const newFilter = data.filter((value) => {
        if(value.laureates&&value.laureates.length!==0) {
          return value.category.toLowerCase().includes(searchAwardTerm.toLowerCase()) || value.year.includes(searchAwardTerm.toLowerCase()) || checkTerm(value.laureates, searchAwardTerm.toLowerCase());
        } else {
          return value.category.toLowerCase().includes(searchAwardTerm.toLowerCase()) || value.year.includes(searchAwardTerm.toLowerCase());
        }
        
      });


      function checkTerm (arr, val) { // check the term against laureates
        return arr.some((arrVal) => {
          return (arrVal.surname?arrVal.surname.toLowerCase().includes(val):false)||(arrVal.firstname?arrVal.firstname.toLowerCase().includes(val):false)||(arrVal.motivation?arrVal.motivation.toLowerCase().includes(val):false);
        });
      };

    
      if (searchAwardTerm === "") {
        setAwardsData([]);
      } else {
        setAwardsData(newFilter);
      }
    };

    const clearInput = () => { // clear the input and sets the awardsData and searchTerm empty on clicking the cross icon
      setAwardsData([]);
      setSearchTerm("");
    };

    return (
      <div className="search">
        <div className="row">
          <div className="offset-l4 col l4 s10">
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={filterData}
            />
            
          </div>
          <div className="col l1 s2 searchIcon">
              {awardsData.length === 0 ? (
                  <i className="material-icons">search</i>
                ) : ( 
                  <i className="material-icons close-icon" onClick={clearInput}>close</i>
                )}
            </div>
            {awardsData.length !== 0 && (
              <div>
                <span className="new badge" data-badge-caption="awards found">{awardsData.length}</span>
              </div>
            )}      
            
        </div>

          {awardsData.length !== 0 && (
            <div className="dataResult">
              {awardsData.map((value, key) => {
                return (
                  <div className="dataItem">
                    <p></p>
                    <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title-category">Category:  
                        <b> {value.category}</b>
                      </span>
                      <p>Year: <b>{value.year} </b></p>

                      <p>Laureates:</p>
                    </div>
                    <div className="card-action">
                      {
                        value.laureates&&value.laureates.length !== 0?(
                          <span>
                            {
                              value.laureates.map((v,k) => {
                                return (
                                  <span>
                                    <a href="#">{v.firstname+' '+v.surname}</a>
                                    <p>{v.motivation}</p>
                                  </span>
                                )
                              })
                            }
                          </span>
                          
                        ):''
                      }
                      
                    </div>
                    </div>
                  </div>

                    
                );
              })}
            </div>
          )}

          {awardsData.length === 0 && (
            <div>
              <p>No Results</p>
            </div>
          )}

      </div>
    )
}

export default SearchAwards;