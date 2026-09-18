"use client";

import { useState } from "react";
import Step1EventBasics from "./Step1EventBasics";
import Step2Category from "./Step2Category";
import Step3Details from "./Step3Details";
import Step4Review from "./Step4Review";

export default function PostRequirement() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const [eventData, setEventData] = useState({
    eventName: "",
    eventType: "",
    dateType: "single",
    startDate: "",
    endDate: "",
    location: "",
    venue: "",
    category: "",
  });

  const [detailData, setDetailData] = useState({});
  const [contactData, setContactData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
  });

  function next() {
    setError("");
    setStep((current) => current + 1);
  }

  function back() {
    setError("");
    setStep((current) => current - 1);
  }

  function chooseCategory(value) {
    setEventData({ ...eventData, category: value });
    setDetailData({});
  }

  async function submitForm() {
    setError("");
    setLoading(true);

    try {
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...eventData, ...contactData, details: detailData }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Could not save requirement.");
        return;
      }

      setDone(true);
    } catch {
      setError("Server is not responding.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="wrap">
        <h2>Requirement posted.</h2>
        <p>Saved under {eventData.category} category.</p>
        <a href="/requirements">View all requirements</a>
      </div>
    );
  }

  return (
    <div className="wrap">
      <h1>Post a Requirement</h1>

      <div className="steps">
        <span className={step >= 1 ? "active" : ""}>1. Basics</span>
        <span className={step >= 2 ? "active" : ""}>2. Details</span>
        <span className={step >= 3 ? "active" : ""}>3. Contact</span>
        <span className={step >= 4 ? "active" : ""}>4. Review</span>
      </div>

      {error ? <p className="error">{error}</p> : null}

      {step === 1 && (
        <Step1EventBasics
          basics={eventData}
          setBasics={setEventData}
          onCategoryChange={chooseCategory}
          onNext={next}
          setError={setError}
        />
      )}

      {step === 2 && (
        <Step2Category
          category={eventData.category}
          details={detailData}
          setDetails={setDetailData}
          onNext={next}
          onBack={back}
          setError={setError}
        />
      )}

      {step === 3 && (
        <Step3Details
          category={eventData.category}
          details={detailData}
          setDetails={setDetailData}
          contact={contactData}
          setContact={setContactData}
          onNext={next}
          onBack={back}
          setError={setError}
        />
      )}

      {step === 4 && (
        <Step4Review
          basics={eventData}
          details={detailData}
          contact={contactData}
          loading={loading}
          onBack={back}
          onSubmit={submitForm}
        />
      )}
    </div>
  );
}
