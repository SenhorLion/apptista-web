// type HomePageProps = {
//   searchParams: Promise<SearchParams>;
// };

const HomePage = async () => {
  return (
    <section className="app-section">
      <div className="app-container">
        <p className="app-eyebrow">Build faster</p>
        <h1>Apptista builds sharp software for real people.</h1>
        <p className="text-text-secondary mt-4 max-w-2xl text-lg">
          Clean products, practical AI, and design systems that don’t collapse under their own ego.
        </p>

        <div className="mt-8 flex gap-3">
          <button className="app-button">See products</button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
