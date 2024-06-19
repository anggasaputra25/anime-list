import { useEffect } from "react";
import { Container, Spinner } from "react-bootstrap"

const MyHomeLoading = ({ homeLoading }) => {
    useEffect(() => {
        if (homeLoading) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
        return () => {
          document.body.style.overflow = '';
        };
      }, [homeLoading]);
    return(
        // ${homeLoading ? '' : 'd-none'}
        <Container fluid className={`bg-white w-100 vh-100 d-flex justify-content-center position-fixed z-3 align-items-center loading`} style={homeLoading ? {top: '0px'} : {transition: '0.5s all ease', top: '-100vh'}}>
                <Spinner animation="border" variant="primary" role="status"></Spinner>
                <h3 className="ms-1 text-primary">Loading...</h3>
        </Container>
    )
}

export default MyHomeLoading;