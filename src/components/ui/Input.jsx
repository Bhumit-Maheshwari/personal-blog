function Input(props) {

  return (

    <input
      {...props}
      style={{

        width: '100%',

        padding: '14px',

        borderRadius: 'var(--radius-md)',

        border: '1px solid var(--color-border)',

        marginTop: '12px',

        fontSize: 'var(--text-md)'
      }}
    />

  )
}

export default Input