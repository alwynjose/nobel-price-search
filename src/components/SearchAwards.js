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
        setSearchTerm(searchAwardTerm);
        const newFilter = data.filter((value) => {
          if(value.laureates&&value.laureates.length!==0) {
            return value.category.toLowerCase().includes(searchAwardTerm.toLowerCase()) || value.year.includes(searchAwardTerm.toLowerCase()) || checkTerm(value.laureates, searchAwardTerm.toLowerCase());
          } else {
            return value.category.toLowerCase().includes(searchAwardTerm.toLowerCase()) || value.year.includes(searchAwardTerm.toLowerCase());
          }
          
        });


        function checkTerm (arr, val) {
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

      const clearInput = () => {
        setAwardsData([]);
        setSearchTerm("");
      };

    return (
        <div className="search">
          <div class="row">
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
                    <i class="material-icons">search</i>
                  ) : ( 
                    <i class="material-icons close-icon" onClick={clearInput}>close</i>
                  )}
              </div>
              {awardsData.length !== 0 && (
                <div>
                  <span class="new badge" data-badge-caption="awards found">{awardsData.length}</span>
                </div>
              )}      
              
          </div>

            {awardsData.length !== 0 && (
              <div className="dataResult">
                {awardsData.map((value, key) => {
                  return (
                    <div className="dataItem">
                      <p></p>
                      <div class="card blue-grey darken-1">
                      <div class="card-content white-text">
                        <span class="card-title-category">Category:  
                          <b> {value.category}</b>
                        </span>
                        <p>Year: <b>{value.year} </b></p>

                        <p>Laureates:</p>
                      </div>
                      <div class="card-action">
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