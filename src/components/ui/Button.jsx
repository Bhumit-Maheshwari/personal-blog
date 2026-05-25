function Button({ children }) {

  return (

    <button
      style={{

        background: 'var(--color-primary)',

        color: 'white',

        padding: '12px 24px',

        border: 'none',

        borderRadius: 'var(--radius-md)',

        cursor: 'pointer',

        fontWeight: '600',

        transition: '0.3s'
    }}
    >
      {children}
    </button>

  )
}

export default Button