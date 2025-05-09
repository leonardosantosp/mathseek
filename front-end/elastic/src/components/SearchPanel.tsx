import React, { useState } from "react";

const SearchPanel = () => {
  const [query, setQuery] = useState("");
  const [time, setTime] = useState("10:32");

  const handleSearch = () => {
    if (query) {
      alert(`Buscando por: ${query}`);
    } else {
      alert("Por favor, insira um termo de pesquisa.");
    }
  };

  return (
    <>
      <div className="container__panel">
        <div className="panel">
          <div className="panel__inner">
            <div className="panel__clock--weather--info">
              <div className="panel__clock">{time}</div>
              <div className="panel__weather--info">
                <span>Alfenas MG</span>
                <span>16°C</span>
                <span>Nublado</span>
              </div>
            </div>
            <div className="panel__search--box">
              <input
                type="text"
                id="panel__search--bar"
                placeholder="Search for Math Articles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="panel__search--btn" onClick={handleSearch}>
                Search
              </button>
            </div>
            <div className="panel__trending">
              <div className="panel__articles">
                <div className="panel__article--card">
                  <img src="moon-image.jpg" alt="Article Image" />
                  <p>Mathematics in Nature</p>
                </div>
                <div className="panel__article--card">
                  <img src="moon-image.jpg" alt="Article Image" />
                  <p>Complex Numbers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;
