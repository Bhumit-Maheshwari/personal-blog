function Input(props) {

  return (

    <input
      {...props}
      style={{
        padding: '12px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--color-border)',
        width: '100%',
        marginTop: '10px'
      }}
    />

  )
}

export default Input