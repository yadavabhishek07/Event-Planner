"use client";

export default function Step4Review({ basics, details, contact, loading, onBack, onSubmit }) {
  const labels = { planner: "Event planner", performer: "Performer", crew: "Crew" };

  function renderDetails() {
    return Object.entries(details).map(([key, value]) => {
      if (!value || (Array.isArray(value) && !value.length)) {
        return null;
      }

      return (
        <div className="review-row" key={key}>
          <span>{key.replace(/([A-Z])/g, " $1")}</span>
          <strong>{Array.isArray(value) ? value.join(", ") : value}</strong>
        </div>
      );
    });
  }

  return (
    <div>
      <h3>Review your requirement</h3>

      <div className="review-box">
        <h4>Event details</h4>
        <div className="review-row"><span>Event name</span><strong>{basics.eventName}</strong></div>
        <div className="review-row"><span>Event type</span><strong>{basics.eventType}</strong></div>
        <div className="review-row"><span>Date</span><strong>{basics.startDate}{basics.dateType === "range" ? ` to ${basics.endDate}` : ""}</strong></div>
        <div className="review-row"><span>Location</span><strong>{basics.location}</strong></div>
        {basics.venue && <div className="review-row"><span>Venue</span><strong>{basics.venue}</strong></div>}
        <div className="review-row"><span>Category</span><strong>{labels[basics.category]}</strong></div>
      </div>

      <div className="review-box">
        <h4>{labels[basics.category]} details</h4>
        {renderDetails()}
      </div>

      <div className="review-box">
        <h4>Contact</h4>
        <div className="review-row"><span>Name</span><strong>{contact.contactName}</strong></div>
        <div className="review-row"><span>Email</span><strong>{contact.contactEmail}</strong></div>
        {contact.contactPhone && <div className="review-row"><span>Phone</span><strong>{contact.contactPhone}</strong></div>}
      </div>

      <div className="btn-row">
        <button type="button" className="ghost" onClick={onBack} disabled={loading}>Back</button>
        <button type="button" onClick={onSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit requirement"}
        </button>
      </div>
    </div>
  );
}
