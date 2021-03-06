import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const search = async (
  query: any,
  setResult: Function,
  setLoading: Function
) => {
  setLoading(true);

  await axios
    .get("https://api.jikan.moe/v4/anime", {
      params: {
        limit: 10,
        q: query,
      },
    })
    .then((res) => {
      const result = res.data;
      setResult(result);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setLoading(false);
    });
};

const DisplayResults = (result: any) => {
  var elements = [];
  const rows = result.result.data;

  if (!rows) return null;

  for (let i = 0; i < rows.length; i++) {
    elements.push(
      <li key={i}>
        <a target="_blank" rel="noreferrer" href={rows[i].url}>
          {rows[i].title}
        </a>
      </li>
    );
  }

  return <ul>{elements}</ul>;
};

const Header = () => {
  //   const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);

  function searchBar() {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div id="autocomplete">
          <input
            className="form-search"
            placeholder="search"
            type="text"
            onKeyUp={(e: any) => search(e.target.value, setResult, setLoading)}
            onFocus={() => setShow(true)}
            onBlur={() => setTimeout(() => setShow(false), 200)}
          />
          <button type="submit">
            <img
              width={14}
              src={require("../../assets/search.png")}
              alt="images"
            />
          </button>
          {!show ? (
            ""
          ) : (
            <div id="results">
              {show && loading ? (
                <span className="loading"> &nbsp; Loading...</span>
              ) : (
                <DisplayResults result={result} />
              )}
            </div>
          )}
        </div>
      </form>
    );
  }

  return (
    <section className="navigation">
      <div className="nav-container">
        <div className="brand">
          <Link to="/">AnimeStats.</Link>
        </div>
        <nav>
          <div className="nav-mobile">
            <a id="navbar-toggle" href="#!">
              <span></span>
            </a>
          </div>
          <ul className="nav-list">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <a href="https://jikan.moe/" target="__blank">
                API by JikanAPI
              </a>
            </li>
            <li className="search-container">{searchBar()}</li>
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default Header;
