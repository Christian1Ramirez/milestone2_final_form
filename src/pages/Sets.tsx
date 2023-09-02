import React, { useEffect, useState } from "react";
import "../App.css";
import Navbar from "./Navbar";

const CardBundles = () => {
  const [bundles, setBundles] = useState([]);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBundles, setFilteredBundles] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // ascending order by default

  useEffect(() => {
    // Fetch card bundles from the API
    const fetchCardBundles = async () => {
      try {
        const response = await fetch(
          "https://api.pokemontcg.io/v2/sets?q=series:sword&series:shield"
        );
        const data = await response.json();

        // Set the fetched bundles in the state
        setBundles(data.data);
      } catch (error) {
        console.error("Error fetching card bundles:", error);
      }
    };

    fetchCardBundles();
  }, []);

  useEffect(() => {
    // Filter bundles based on search query and sort order
    const filtered = bundles.filter(
      (bundle) =>
        bundle.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (parseFloat(bundle.price) >= parseFloat(searchQuery) ||
          isNaN(parseFloat(searchQuery)))
    );

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return parseFloat(a.price) - parseFloat(b.price);
      } else if (sortOrder === "desc") {
        return parseFloat(b.price) - parseFloat(a.price);
      } else if (sortOrder === "series") {
        return a.series.localeCompare(b.series);
      } else if (sortOrder === "releaseDate") {
        return new Date(a.releaseDate) - new Date(b.releaseDate);
      } else if (sortOrder === "popularity") {
        return b.popularity - a.popularity;
      } else {
        return 0;
      }
    });

    setFilteredBundles(sorted);
  }, [searchQuery, sortOrder, bundles]);

  useEffect(() => {
    // Fetch user data or check session to determine if user is logged in
    const fetchUser = async () => {
      try {
        const response = await fetch("/user");
        const data = await response.json();
        if (data.user) {
          setUser(data.user);
        }
      } catch (error) {
        
      }
    };

    fetchUser();
  }, []);

  const handleLogin = async (username: any, password: any) => {
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/logout");
      const data = await response.json();
      if (response.ok) {
        setUser(null);
      } else {
        console.error("Logout failed:", data.message);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSortOrder = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <>
      <style>{`
        body {
          margin: 0;
          background-color: #0B1B3D;
        }
      `}</style>
      <div>
        <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout} />
        <h1
          style={{
            fontSize: "32px",
            color: "#fff",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Card Sets
        </h1>
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <input
            type="text"
            placeholder="Search bundles..."
            value={searchQuery}
            onChange={handleSearch}
            style={{
              padding: "10px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "none",
            }}
          />
          <select
            onChange={handleSortOrder}
            value={sortOrder}
            style={{ padding: "10px", borderRadius: "4px", border: "none" }}
          >
            <option value="asc">Price: Lowest to Highest</option>
            <option value="desc">Price: Highest to Lowest</option>
            <option value="series">Sort by Series</option>
            <option value="releaseDate">Sort by Release Date</option>
            <option value="popularity">Sort by Popularity</option>
          </select>
        </div>
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridGap: "20px", // Increased grid gap for spacing
            listStyle: "none",
            padding: 0,
            marginTop: 0, // Removed top margin
          }}
        >
          {filteredBundles.map((bundle) => (
            <li
              key={bundle.id}
              style={{
                border: "1px solid #ccc",
                padding: "10px", // Increased padding
                marginBottom: "10px", // Increased margin
                backgroundColor: "white",
                borderRadius: "5px",
                transition: "transform 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1)";
              }}
            >
              <h2 style={{ fontSize: "20px", color: "#333" }}>{bundle.name}</h2>
              <a
                href="https://www.pokellector.com/sets"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={bundle.images.logo}
                  alt={bundle.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </a>
              <p>Series: {bundle.series}</p>
              <p>Release Date: {bundle.releaseDate}</p>
              <p>Total Cards: {bundle.total}</p>
              <p>Price: {bundle.price || "¥20,206.89"}</p>
              <p>Popularity: {bundle.popularity}</p>
              <div>
                <img
                  src={bundle.images.example} // Replace 'example' with the actual image field
                  alt={bundle.name}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                {/* Repeat the above code fordifferent image fields */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CardBundles;