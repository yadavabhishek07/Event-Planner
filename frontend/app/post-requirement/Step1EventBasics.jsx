"use client";

const eventTypes = ["Wedding", "Corporate Event", "Concert", "Birthday Party", "Festival", "Conference", "Other"];

export default function Step1EventBasics({ basics, setBasics, onCategoryChange, onNext, setError }) {
  function handleChange(event) {
    setBasics({ ...basics, [event.target.name]: event.target.value });
  }

  function handleNext() {
    if (!basics.eventName || !basics.eventType || !basics.startDate || !basics.location) {
      setError("Please complete the required fields.");
      return;
    }

    if (basics.dateType === "range") {
      if (!basics.endDate) {
        setError("Please choose an end date.");
        return;
      }

      if (new Date(basics.endDate) < new Date(basics.startDate)) {
        setError("End date cannot be earlier than the start date.");
        return;
      }
    }

    if (!basics.category) {
      setError("Please choose the type of help you need.");
      return;
    }

    onNext();
  }

  return (
    <div>
      <h3>Event basics</h3>

      <label>Event name *</label>
      <input name="eventName" value={basics.eventName} onChange={handleChange} />

      <label>Event type *</label>
      <select name="eventType" value={basics.eventType} onChange={handleChange}>
        <option value="">Select event type</option>
        {eventTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <label>Date *</label>
      <div className="radio-row">
        <label className="inline">
          <input type="radio" name="dateType" value="single" checked={basics.dateType === "single"} onChange={handleChange} />
          Single day
        </label>
        <label className="inline">
          <input type="radio" name="dateType" value="range" checked={basics.dateType === "range"} onChange={handleChange} />
          Date range
        </label>
      </div>

      <div className="row">
        <div>
          <label>{basics.dateType === "range" ? "Start date *" : "Event date *"}</label>
          <input type="date" name="startDate" value={basics.startDate} onChange={handleChange} />
        </div>

        {basics.dateType === "range" && (
          <div>
            <label>End date *</label>
            <input type="date" name="endDate" value={basics.endDate} onChange={handleChange} />
          </div>
        )}
      </div>

      <label>Location (city) *</label>
      <input name="location" value={basics.location} onChange={handleChange} />

      <label>Venue (optional)</label>
      <input name="venue" value={basics.venue} onChange={handleChange} />

      <label>What do you need? *</label>
      <div className="cards">
        {[
          ["planner", "Event planner", "Someone to plan and manage the event"],
          ["performer", "Performer", "Singers, dancers, DJs, and bands"],
          ["crew", "Crew", "Sound, light, stage, and support staff"],
        ].map(([value, title, description]) => (
          <button
            type="button"
            className={basics.category === value ? "card selected" : "card"}
            onClick={() => onCategoryChange(value)}
            key={value}
          >
            <strong>{title}</strong>
            <span>{description}</span>
          </button>
        ))}
      </div>

      <div className="btn-row">
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
