// type HomePageProps = {
//   searchParams: Promise<SearchParams>;
// };

const HomePage = async () => {
  return (
    <section className="app-section">
      <div className="app-container">
        <p className="app-eyebrow">Small apps. Immersive play.</p>
        <h1>Apptista builds apps people love to use.</h1>
        <p className="text-text-secondary mt-4 max-w-2xl text-lg">
          Clean, focused experiences that look great and do what they do well.
        </p>

        <div className="mt-8 flex gap-3">
          <button className="app-button">See products</button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
