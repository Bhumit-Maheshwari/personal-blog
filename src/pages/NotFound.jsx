import { Link } from 'react-router-dom'
import '../App.css'

function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '70vh',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div style={{
        fontSize: '8rem',
        fontFamily: 'var(--font-heading)',
        fontWeight: '800',
        background: 'var(--gradient-primary)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        lineHeight: '1',
        marginBottom: '16px',
        animation: 'float 3s ease-in-out infinite'
      }}>
        404
      </div>
      <h2 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--text-2xl)',
        color: 'var(--color-text-primary)',
        marginBottom: '12px'
      }}>
        Page Not Found
      </h2>
      <p style={{
        color: 'var(--color-text-secondary)',
        fontSize: 'var(--text-md)',
        maxWidth: '450px',
        marginBottom: '32px',
        lineHeight: '1.6'
      }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{
        display: 'inline-block',
        padding: '14px 36px',
        background: 'var(--gradient-primary)',
        color: 'white',
        borderRadius: 'var(--radius-full)',
        fontWeight: '700',
        textDecoration: 'none',
        boxShadow: 'var(--shadow-glow)',
        transition: 'var(--transition-base)'
      }}>
        ← Back to Home
      </Link>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  )
}

export default NotFound
