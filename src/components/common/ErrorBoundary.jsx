import React
from 'react'

class ErrorBoundary
extends React.Component {

 constructor(props){

  super(props)

  this.state = {

   hasError:false
  }
 }

 static getDerivedStateFromError(){

  return {

   hasError:true
  }
 }

 componentDidCatch(
  error,
  info
 ){

  console.log(error)
 }

 render(){

  if(
   this.state.hasError
  ){

   return(

        <div
            style={{
            textAlign: 'center',
            padding: '60px'
            }}
        >

        <h2>
            Something Went Wrong
        </h2>

        <p>
            {error}
        </p>

        </div>
   )
  }

  return this.props.children
 }
}

export default ErrorBoundary