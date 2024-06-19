import { useEffect, useState } from "react";
import { BASE_LOCAL_STORAGE, getAnime } from "../services/anime";
import MyCard from "../components/MyCard";
import { Button, Container } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import { useDebounce } from "use-debounce";
import MyPagination from "../components/MyPagination";
import { CameraReelsFill, Fire, HeartFill, StarFill } from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import MyHomeLoading from "../components/MyHomeLoading";

const Home = () => {
    const [animes, setAnimes] = useState([])
    const [query, setQuery] = useState()
    const [debounceValue] = useDebounce(query, 300)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState()
    const [navActive, setNavActive] = useState("home")
    const [scrolled, setScrolled] = useState(false)
    const [loading, setLoading] = useState(false)
    const [baseUrl, setBaseUrl] = useState("top/anime?limit=24&page=")
    const [catActive, setCatActive] = useState("")
    const [saved, setSaved] = useState(JSON.parse(localStorage.getItem(BASE_LOCAL_STORAGE)) || [])

    // anime home
    const [homeLoading, setHomeLoading] = useState(false)
    const [frieren, setFrieren] = useState(null);
    const [aot, setAot] = useState(null);
    const [kimetsu, setKimetsu] = useState(null);

    const fetchHome = async () => {
        try {
            let home = await getAnime('anime/52991')
            setFrieren(home.data)
            home = await getAnime('anime/16498')
            setAot(home.data)
            home = await getAnime('anime/38000')
            setKimetsu(home.data)
        } catch (error) {
            console.error('error fetching: ' + error)
        } finally {
            setHomeLoading(false)
        }
    }

    useEffect(() => {
        document.title = 'AnimeList';
        setHomeLoading(true)
        setTimeout(() => {
            fetchHome()
        }, 2000);
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            const animeSection = document.getElementById("anime")
            if (offset > animeSection.offsetTop - 100) {
                setScrolled(true)
                setNavActive("anime")
            } else {
                setScrolled(false)
                setNavActive("home")
            }
        };
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const fetchData = async(url) => {
        setLoading(true)
        try {
            const data = await getAnime(url)
            setTotalPages(data.pagination.items.total)
            setAnimes(data.data)
        } catch (error) {
            console.error('Error fetching data: ' + error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        let url = debounceValue ? `anime?q=${debounceValue}` : baseUrl + currentPage
        fetchData(url)
    }, [debounceValue, currentPage, baseUrl])

    // Local Storage
    useEffect(() => {
        localStorage.setItem(BASE_LOCAL_STORAGE, JSON.stringify(saved))
    }, [saved])

    return(
        <>
            <MyHomeLoading homeLoading={homeLoading} />
            <Navbar expand="lg" className={`shadow-sm position-fixed w-100 z-2 pt-3 pb-3 ${scrolled ? 'navbar-light bg-white' : 'navbar-dark'}`}>
                <Container>
                    <Navbar.Brand href="#home" className="fw-bold" onClick={() => setNavActive('home')}>ANIMELIST</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0 w-100 justify-content-end"
                        navbarScroll
                    >
                        <Nav.Link href="#home" active={navActive === 'home'} onClick={() => setNavActive('home')}>Home</Nav.Link>
                        <Nav.Link href="#anime" active={navActive === 'anime'} onClick={() => setNavActive('anime')}>anime</Nav.Link>
                        {/* <Nav.Link active={navActive === 'about'} onClick={() => setNavActive('about')}>About</Nav.Link> */}
                        <Nav.Link href="/bookmark" active={navActive === 'bookmark'} onClick={() => setNavActive('bookmark')}>Bookmark</Nav.Link>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* <Container fluid className="vh-100" id="home"></Container> */}
            <Carousel className={`vh-100 position-relative`} data-bs-pause="false" id="home">
                <Carousel.Item className="h-100">
                    <img className="d-block w-100 h-100 object-fit-cover" src='assets/frieren.jpg' alt="First slide" />
                    <a href={`/anime/${frieren?.mal_id}`}>
                        <Container fluid className="carousel-content position-absolute h-100 d-flex flex-column justify-content-center align-items-center top-0 text-white start-0">
                            <h1>{frieren ? frieren.title : ''}</h1>
                            <h3 className="text-warning d-flex align-items-center"><StarFill className='me-1'/>{frieren ? frieren.score : ''}</h3>
                            <div className="row gap-1 m-0">
                                {frieren ? frieren.genres.map((genre, index) => <p key={index} className="border m-0 p-2 rounded-1 mt-2" style={{ width: 'max-content' }}>{genre.name}</p>) : ''}
                            </div>
                        </Container>
                    </a>
                </Carousel.Item>
                <Carousel.Item className="h-100">
                    <img className="d-block w-100 h-100 object-fit-cover" src='assets/aot.jpg' alt="Second slide" />
                    <a href={`/anime/${aot?.mal_id}`}>
                        <Container fluid className="carousel-content position-absolute h-100 d-flex flex-column justify-content-center align-items-center top-0 text-white start-0">
                            <h1>{aot ? aot.title : ''}</h1>
                            <h3 className="text-warning d-flex align-items-center"><StarFill className='me-1'/>{aot ? aot.score : ''}</h3>
                            <div className="row gap-1 m-0 justify-content-center">
                                {aot ? aot.genres.map((genre, index) => <p key={index} className="border m-0 p-2 rounded-1 mt-2" style={{ width: 'max-content' }}>{genre.name}</p>) : ''}
                            </div>
                        </Container>
                    </a>
                </Carousel.Item>
                <Carousel.Item className="h-100">
                    <img className="d-block w-100 h-100 object-fit-cover" src='assets/kimetsu.jpg' alt="Second slide" />
                    <a href={`/anime/${kimetsu?.mal_id}`}>
                        <Container fluid className="carousel-content position-absolute h-100 d-flex flex-column justify-content-center align-items-center top-0 text-white start-0">
                            <h1>{kimetsu ? kimetsu.title : ''}</h1>
                            <h3 className="text-warning d-flex align-items-center"><StarFill className='me-1'/>{kimetsu ? kimetsu.score : ''}</h3>
                            <div className="row gap-1 m-0">
                                {kimetsu ? kimetsu.genres.map((genre, index) => <p key={index} className="border m-0 p-2 rounded-1 mt-2" style={{ width: 'max-content' }}>{genre.name}</p>) : ''}
                            </div>
                        </Container>
                    </a>
                </Carousel.Item>
                {/* <Carousel.Item className="h-100">
                <img className="d-block w-100 h-100 object-fit-cover" src='assets/frieren.jpg' alt="Second slide" />
                </Carousel.Item>
                <Carousel.Item className="h-100">
                <img className="d-block w-100 h-100 object-fit-cover" src='assets/frieren.jpg' alt="Third slide" />
                </Carousel.Item> */}
            </Carousel>

            <Container id="anime" className="m-auto pt-5 justify-content-center mb-2">
                <div className="row p-0 gap-md-0 gap-2">
                    <div className="col-12 col-md-6 d-flex gap-2">
                        <Button variant={catActive === 'warning' ? 'warning' : 'outline-warning'} className="d-flex align-items-center" onClick={() => {setBaseUrl(`top/anime?filter=bypopularity&limit=24&page=`); setCatActive("warning")}} disabled={loading}>Popular <Fire /></Button>
                        <Button variant={catActive === 'success' ? 'success' : 'outline-success'} className="d-flex align-items-center" onClick={() => {setBaseUrl(`top/anime?type=movie&limit=24&page=`); setCatActive("success")}} disabled={loading}>Movie <CameraReelsFill className="ms-1" /></Button>
                        <Button variant={catActive === 'danger' ? 'danger' : 'outline-danger'}className="d-flex align-items-center" onClick={() => {setBaseUrl(`top/anime?filter=favorite&limit=24&page=`); setCatActive("danger")}} disabled={loading}>Favorite <HeartFill className="ms-1" /></Button>
                    </div>
                    <div className="col-12 col-md-6">
                    <Form.Control
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(evt) => setQuery(evt.target.value)}
                    />
                    </div>
                </div>
            </Container>
            <Container className={`row m-auto gap-3 mb-3 justify-content-center justify-content-md-between ${loading || homeLoading ? 'd-none' : ''}`}>
                {animes.map((anime) => {const status = saved.includes(anime.mal_id); return(<MyCard key={anime.mal_id} id={anime.mal_id} title={anime.title} score={anime.score} image={anime.images.jpg.image_url} genres={anime.genres} setSaved={setSaved} status={status} saved={saved} inBookmark={false} />)} )}
            </Container>
            <Container className={`m-auto mb-3 ${loading || homeLoading ? 'd-none' : ''}`}>
                <MyPagination handlePage={setCurrentPage} total={totalPages}/>
            </Container>
            <Container className={`d-flex justify-content-center mb-3 mt-3 align-items-center ${loading ? '' : 'd-none'}`} style={{ height: '75vh' }}>
                <Spinner animation="border" variant="primary" role="status"></Spinner>
                <h3 className="ms-1 text-primary">Loading...</h3>
            </Container>
        </>
    )
}

export default Home;