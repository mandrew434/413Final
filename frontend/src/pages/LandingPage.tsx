import { useNavigate } from "react-router-dom";

function LandingPage() {
    // Allows for navigation between pages
    const navigate = useNavigate();
    

    // This is the landing page for the entertainment agency website. It contains a welcome message and a button to view entertainers.
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea, #764ba2)'
    }}>
      <h1 style={{
        color: 'white',
        fontSize: '3rem',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Welcome to the Entertainment Agency
      </h1>
      <p style={{
        color: 'white',
        fontSize: '1.5rem',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Discover our amazing entertainers and explore the world of amazing talent.
      </p>
    <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate('/entertainers')}>
      View Entertainers
    </button>
    </div>
  );
}

export default LandingPage;