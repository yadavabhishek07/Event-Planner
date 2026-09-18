"use client";

const plannerServices = ["Catering", "Decoration", "Sound", "Lighting", "Photography", "Hospitality"];
const performerTypes = ["Singer", "Dancer", "DJ", "Band", "Comedian", "Magician", "Anchor"];
const crewRoles = ["Sound Engineer", "Light Technician", "Stagehand", "Camera Operator", "Security", "Helper"];

export default function Step2Category({ category, details, setDetails, onNext, onBack, setError }) {
  function handleChange(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }

  function toggleItem(field, value) {
    const currentItems = details[field] || [];
    const updatedItems = currentItems.includes(value)
      ? currentItems.filter((item) => item !== value)
      : [...currentItems, value];

    setDetails({ ...details, [field]: updatedItems });
  }

  function handleNext() {
    if (category === "planner" && (!(details.servicesNeeded || []).length || !details.guestCount)) {
      setError(!details.guestCount ? "Please enter the expected guest count." : "Please choose at least one service.");
      return;
    }

    if (category === "performer" && (!details.performerType || !details.performersRequired)) {
      setError(!details.performerType ? "Please select the performer type." : "Please tell us how many performers you need.");
      return;
    }

    if (category === "crew" && (!(details.crewRoles || []).length || !details.crewSize)) {
      setError(!details.crewSize ? "Please enter the total crew size." : "Please choose at least one crew role.");
      return;
    }

    onNext();
  }

  const itemList = category === "planner" ? plannerServices : crewRoles;

  return (
    <div>
      {category === "planner" && (
        <>
          <h3>Planner details</h3>
          <label>Services needed *</label>
          <div className="checkbox-group">
            {itemList.map((item) => (
              <label key={item} className="inline">
                <input
                  type="checkbox"
                  checked={(details.servicesNeeded || []).includes(item)}
                  onChange={() => toggleItem("servicesNeeded", item)}
                />
                {item}
              </label>
            ))}
          </div>

          <label>Expected guest count *</label>
          <input type="number" name="guestCount" value={details.guestCount || ""} onChange={handleChange} />

          <label>Planning stage</label>
          <select name="planningStage" value={details.planningStage || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option>Just exploring</option>
            <option>Planning in progress</option>
            <option>Ready to book</option>
          </select>
        </>
      )}

      {category === "performer" && (
        <>
          <h3>Performer details</h3>
          <label>Performer type *</label>
          <select name="performerType" value={details.performerType || ""} onChange={handleChange}>
            <option value="">Select</option>
            {performerTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>

          <label>Genre or style</label>
          <input name="genre" placeholder="Bollywood, classical, EDM, etc." value={details.genre || ""} onChange={handleChange} />

          <label>How many performers do you need? *</label>
          <input type="number" name="performersRequired" value={details.performersRequired || ""} onChange={handleChange} />

          <label>Performance duration (hours)</label>
          <input type="number" name="durationHours" value={details.durationHours || ""} onChange={handleChange} />
        </>
      )}

      {category === "crew" && (
        <>
          <h3>Crew details</h3>
          <label>Roles needed *</label>
          <div className="checkbox-group">
            {itemList.map((item) => (
              <label key={item} className="inline">
                <input
                  type="checkbox"
                  checked={(details.crewRoles || []).includes(item)}
                  onChange={() => toggleItem("crewRoles", item)}
                />
                {item}
              </label>
            ))}
          </div>

          <label>Total crew size *</label>
          <input type="number" name="crewSize" value={details.crewSize || ""} onChange={handleChange} />

          <label>Experience needed</label>
          <select name="experienceRequired" value={details.experienceRequired || ""} onChange={handleChange}>
            <option value="">Select</option>
            <option>Fresher</option>
            <option>1-3 years</option>
            <option>3+ years</option>
          </select>
        </>
      )}

      <div className="btn-row">
        <button type="button" className="ghost" onClick={onBack}>Back</button>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
