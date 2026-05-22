import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import Container from '../components/ui/Container'
import Heading from '../components/ui/Heading'
import ThemeToggle from '../components/ui/ThemeToggle'

function Home() {

  return (

    <Container>

      <div className="page">

        <ThemeToggle />

        <Heading>
          Design System Playground
        </Heading>

        <Input
          placeholder="Search article..."
        />

        <Card>

          <h2>
            React Blog Article
          </h2>

          <p>
            This card demonstrates reusable UI components.
          </p>

          <br />

          <Button>
            Read More
          </Button>

        </Card>

      </div>

    </Container>
  )
}

export default Home