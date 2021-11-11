import { Navbar } from "../components/Navbar"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'

export const LandingPage = () => {
    const { width, height } = useWindowSize()
    return (
        <>
            <Confetti
                width={width}
                height={height}
            />
            <Navbar />
            <div>LandingPage</div>
        </>
    )
}