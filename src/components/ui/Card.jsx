function Card({ children }) {

  return (

    <div
      style={{
        background: 'var(--color-surface)',

        padding: '32px',

        borderRadius: 'var(--radius-md)',

        border: '1px solid var(--color-border)',

        marginTop: '24px',

        boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
      }}
    >
      {children}
    </div>

  )
}

export default Card