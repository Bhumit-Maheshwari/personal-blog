function Heading({ children }) {

  return (

    <h1
      style={{
        fontFamily: 'var(--font-heading)',
        marginBottom: '20px'
      }}
    >
      {children}
    </h1>

  )
}

export default Heading