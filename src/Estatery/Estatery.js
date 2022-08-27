import React, { useEffect, useState } from "react";
import "./Estatery.css";
import API_data from "../MOCK_DATA.json"
const API_ESTATE = "https://swapi.dev/api/films";

const data = [
  {
    location: "API_data",
    when: "today",
    price: "500",
    property_type: "rent",
  },
  {
    location: "America",
    when: "yesterday",
    price: "400",
    property_type: "house",
  },
  {
    location: "Asia",
    when: "tomorrow",
    price: "300",
    property_type: "home",
  },
];

function Estatery() {
  const [updateItem, setUpdateItem] = useState([]);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterWhen, setFilterWhen] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [filterPopertyType, setFilterPropertyType] = useState("");

  useEffect(() => {
    fetch(API_ESTATE).then(res => res.json())
    .then(
      result => console.log(result.results)
    )
  })


  const filterList = () => {
    const updatedPlaces = data.filter((place) => {
      let filter_location =
        place.location.toLowerCase().indexOf(filterLocation.toLowerCase()) > -1;
      let filter_when =
        place.when.toLowerCase().indexOf(filterWhen.toLowerCase()) > -1;
      let filter_price =
        place.price.toLowerCase().indexOf(filterPrice.toLowerCase()) > -1;
      let filter_property_type =
        place.property_type
          .toLocaleLowerCase()
          .indexOf(filterPopertyType.toLocaleLowerCase()) > -1;
      return (
        filter_location && filter_when && filter_price && filter_property_type
      );
    });
    console.log("Hello Dear", { updatedPlaces });

    setUpdateItem(updatedPlaces);
  };

  useEffect(() => {
    filterList();
  }, [filterLocation, filterWhen, filterPrice, filterPopertyType]);

  return (
    <div className="estater-container">
      <header>
        <h1>Search properties to rent</h1>
      </header>
      <main>
        <div className="search-filter">
          <form action="">
            <div className="column location">
              <label>Location</label>
              <input
                name="location"
                type="text"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              />
            </div>
            <div className="column date">
              <label>When</label>
              <input
                name="when"
                type="text"
                value={filterWhen}
                onChange={(e) => setFilterWhen(e.target.value)}
              />
            </div>
            <div className="column price">
              <label>Price</label>
              <input
                name="price"
                type="text"
                value={filterPrice}
                onChange={(e) => setFilterPrice(e.target.value)}
              />
            </div>
            <div className="column property-type">
              <label>Property Type</label>
              <input
                name="propertytype"
                type="text"
                value={filterPopertyType}
                onChange={(e) => setFilterPropertyType(e.target.value)}
              />
            </div>
            <div className="search-btn">
              <button>search</button>
            </div>
          </form>
        </div>
        <div className="fetch-list">
          {updateItem.map((item, key) => (
            <div className="list" key={key}>
              <div className="row">{item.location}</div>
              <div className="row">{item.when}</div>
              <div className="row">{item.price}</div>
              <div className="row">{item.property_type}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Estatery;
