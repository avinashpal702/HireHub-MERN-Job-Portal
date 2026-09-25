import SearchBar from '../components/searchBar';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Your next chapter starts here</span>
          <h1>Find jobs that match your ambition.</h1>
          <p>
            Discover high-impact roles, connect with leading teams, and build a career you actually love.
          </p>
          <SearchBar />
          <div className="hero-meta">
            <span>10k+ active candidates</span>
            <span>2.5k+ companies</span>
            <span>4.9/5 candidate rating</span>
          </div>
        </div>
        <div className="hero-highlight">
          <div className="stat-card">
            <strong>1,284</strong>
            <span>New openings this week</span>
          </div>
          <div className="mini-card">
            <p>Frontend Engineer</p>
            <small>Remote • Full-time</small>
          </div>
        </div>
      </section>

      <section className="content-panel">
        <div className="section-heading">
          <h2>Popular Categories</h2>
        </div>
        <div className="category-grid">
          {['Software', 'Marketing', 'Design', 'Finance', 'Sales', 'HR'].map(cat => (
            <Link key={cat} to={`/jobs?category=${cat}`} className="category-card">
              {cat}
            </Link>
          ))}
        </div>
      </section>

      <section className="content-panel">
        <div className="section-heading">
          <h2>Featured Jobs</h2>
        </div>
        <div className="featured-grid">
          <div className="feature-card">
            <span className="feature-tag">Design</span>
            <h3>Senior Product Designer</h3>
            <p>Build elegant experiences for a fast-moving startup.</p>
          </div>
          <div className="feature-card">
            <span className="feature-tag alt">Engineering</span>
            <h3>Full Stack Engineer</h3>
            <p>Lead product delivery across mobile, web, and backend stacks.</p>
          </div>
          <div className="feature-card">
            <span className="feature-tag alt-2">Marketing</span>
            <h3>Growth Marketing Manager</h3>
            <p>Turn customer insights into measurable pipeline growth.</p>
          </div>
        </div>
      </section>
    </div>
  );
}