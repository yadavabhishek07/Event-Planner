export default function Home() {
  return (
    <main className="home">
      <p className="eyebrow">GoPratle</p>
      <h1>Need help for your event?</h1>
      <p>
        Tell us what you need — planner, performer, or crew — and we will keep it simple.
      </p>

      <div className="home-actions">
        <a href="/post-requirement">Post a requirement</a>
        <a href="/requirements" className="secondary-link">See all requests</a>
      </div>
    </main>
  );
}
