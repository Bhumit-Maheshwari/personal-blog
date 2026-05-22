import useTheme from '../../hooks/useTheme'

function ThemeToggle() {

  const {
    theme,
    toggleTheme
  } = useTheme()

  return (

    <button
      onClick={toggleTheme}
      style={{
        padding: '10px 16px',
        borderRadius: 'var(--radius-md)',
        border: 'none',
        cursor: 'pointer'
      }}
    >

      {theme === 'light'
        ? 'Dark Mode'
        : 'Light Mode'}

    </button>

  )
}

export default ThemeToggle