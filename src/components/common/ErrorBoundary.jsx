import React from 'react'

class ErrorBoundary extends React.Component {

  constructor(props) {

    super(props)

    this.state = {

      hasError: false,

      error: null

    }
  }

  static getDerivedStateFromError(error) {

    return {

      hasError: true,

      error

    }
  }

  componentDidCatch(error, info) {

    console.log(
      error,
      info
    )
  }

  render() {

    if (this.state.hasError) {

      return (

        <div
          style={{
            padding: '40px'
          }}
        >

          <h2>

            Something went wrong

          </h2>

          <p>

            {
              this.state.error?.message
            }

          </p>

        </div>

      )
    }

    return this.props.children
  }
}

export default ErrorBoundary