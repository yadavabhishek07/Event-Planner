"use client";

import { useEffect, useState } from "react";

export default function RequirementList() {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      setError("");

      try {
        const url =
          category === "all"
            ? process.env.NEXT_PUBLIC_API_URL
            : `${process.env.NEXT_PUBLIC_API_URL}?category=${category}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Could not load requirements.");
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [category]);

  function getDetails(item) {
    if (item.category === "planner") return item.plannerDetails || {};
    if (item.category === "performer") return item.performerDetails || {};
    return item.crewDetails || {};
  }

  return (
    <div className="wrap">
      <h1>Posted Requirements</h1>

      <div className="filters">
        {['all', 'planner', 'performer', 'crew'].map((type) => (
          <button
            key={type}
            type="button"
            className={category === type ? "chip active" : "chip"}
            onClick={() => setCategory(type)}
          >
            {type}
          </button>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && items.length === 0 && <p>No requirements found.</p>}

      {items.map((item) => {
        const detail = getDetails(item);

        return (
          <div className="listing" key={item._id}>
            <div className="listing-top">
              <h3>{item.eventName}</h3>
              <span className="badge">{item.category}</span>
            </div>

            <p className="muted">
              {item.eventType} · {item.location} · {new Date(item.startDate).toLocaleDateString()}
              {item.endDate ? ` to ${new Date(item.endDate).toLocaleDateString()}` : ""}
            </p>

            {item.category === "planner" && (
              <p>
                Services: {(detail.servicesNeeded || []).join(", ")} · {detail.guestCount} guests
              </p>
            )}

            {item.category === "performer" && (
              <p>
                {detail.performerType} · {detail.performersRequired} performers · {detail.genre}
              </p>
            )}

            {item.category === "crew" && (
              <p>
                Roles: {(detail.crewRoles || []).join(", ")} · {detail.crewSize} people
              </p>
            )}

            <p className="muted">Posted by {item.contactName}</p>
          </div>
        );
      })}
    </div>
  );
}
