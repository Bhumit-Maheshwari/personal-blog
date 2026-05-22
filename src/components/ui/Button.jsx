function Button({ children }) {

  return (

    <button
      style={{
        background: 'var(--color-primary)',
        color: 'white',
        padding: '12px 20px',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer'
      }}
    >
      {children}
    </button>

  )
}

export default Button