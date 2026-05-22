function Card({ children }) {

  return (

    <div
      style={{
        background: 'var(--color-surface)',
        padding: '20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        marginTop: '20px'
      }}
    >
      {children}
    </div>

  )
}

export default Card