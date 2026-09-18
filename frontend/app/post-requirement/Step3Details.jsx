"use client";

const equipmentOptions = ["Sound System", "Stage", "Lighting", "Green Room"];

export default function Step3Details({ category, details, setDetails, contact, setContact, onNext, onBack, setError }) {
  function updateDetails(event) {
    setDetails({ ...details, [event.target.name]: event.target.value });
  }

  function updateContact(event) {
    setContact({ ...contact, [event.target.name]: event.target.value });
  }

  function toggleEquipment(value) {
    const currentEquipment = details.equipmentProvided || [];
    const updatedEquipment = currentEquipment.includes(value)
      ? currentEquipment.filter((item) => item !== value)
      : [...currentEquipment, value];

    setDetails({ ...details, equipmentProvided: updatedEquipment });
  }

  function handleNext() {
    const requiredBudget = category === "crew" ? details.dailyRate : details.budget;

    if (!requiredBudget) {
      setError(category === "crew" ? "Please enter a daily rate." : "Please enter your budget.");
      return;
    }

    if (!contact.contactName || !contact.contactEmail) {
      setError("Please add your contact name and email.");
      return;
    }

    if (!contact.contactEmail.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    onNext();
  }

  return (
    <div>
      <h3>Budget &amp; contact</h3>

      {category === "planner" && (
        <>
          <label>Total budget (Rs) *</label>
          <input type="number" name="budget" value={details.budget || ""} onChange={updateDetails} />

          <label>Preferred meeting or site visit date</label>
          <input type="date" name="preferredDate" value={details.preferredDate || ""} onChange={updateDetails} />
        </>
      )}

      {category === "performer" && (
        <>
          <label>Budget per performance (Rs) *</label>
          <input type="number" name="budget" value={details.budget || ""} onChange={updateDetails} />

          <label>Equipment you can provide</label>
          <div className="checkbox-group">
            {equipmentOptions.map((item) => (
              <label key={item} className="inline">
                <input
                  type="checkbox"
                  checked={(details.equipmentProvided || []).includes(item)}
                  onChange={() => toggleEquipment(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </>
      )}

      {category === "crew" && (
        <>
          <label>Daily rate per person (Rs) *</label>
          <input type="number" name="dailyRate" value={details.dailyRate || ""} onChange={updateDetails} />

          <label>Shift timing</label>
          <input name="shiftTiming" placeholder="10 AM - 8 PM" value={details.shiftTiming || ""} onChange={updateDetails} />
        </>
      )}

      <label>Additional notes</label>
      <textarea rows="3" name="notes" value={details.notes || ""} onChange={updateDetails} />

      <hr />

      <label>Contact person name *</label>
      <input name="contactName" value={contact.contactName} onChange={updateContact} />

      <label>Email *</label>
      <input type="email" name="contactEmail" value={contact.contactEmail} onChange={updateContact} />

      <label>Phone</label>
      <input name="contactPhone" value={contact.contactPhone} onChange={updateContact} />

      <div className="btn-row">
        <button type="button" className="ghost" onClick={onBack}>Back</button>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}
