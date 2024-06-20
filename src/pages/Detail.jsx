import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAnime } from "../services/anime";
import { Button, Container, Table } from "react-bootstrap";
import { CaretLeftFill, HouseFill } from "react-bootstrap-icons";
import CardCharacter from "../components/CardCharacter";
import MyHomeLoading from "../components/MyHomeLoading";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Detail = () => {
    const {id} = useParams();
    const [anime, setAnime] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (anime?.title) {
            document.title = 'AnimeList - ' + anime.title;
        }
    }, [anime?.title]);
    
    useEffect(() => {
        const fetchData = async(id) => {
            setLoading(true)
            try {
                let data = await getAnime(`anime/${id}/full`)
                setAnime(data.data)
                data = await getAnime(`anime/${id}/characters`)
                setCharacters(data.data)
            } catch (error) {
                console.error('failed to fetch: ' + error)
            } finally {
                setLoading(false)
            }
        }
        fetchData(id)
    }, [id])
    
    return(
        <>
            <MyHomeLoading homeLoading={loading} />
            <Container className="my-2 d-flex gap-1">
                <Button onClick={() => navigate(-1)} className="btn btn-primary"><CaretLeftFill /> Back</Button>
                <a href="/" className="btn btn-success"><HouseFill /></a>
            </Container>
            <Container className="m-auto d-flex flex-column align-items-center my-4">
                <div className="w-100 rounded overflow-hidden shadow-sm mb-4 p-3">
                    {/* <img className="object-fit-cover rounded w-100" style={{ height: '18rem' }} src={anime.images ? anime.images.jpg.large_image_url : ''} alt="img" /> */}
                    <h1 className="w-100">{anime.title}</h1>
                    <p className="m-0" style={{ textAlign: 'justify' }}>{anime.synopsis}</p>
                    <div className="d-flex flex-md-row flex-column gap-3 pt-3">
                        <div className="text-center">
                            <LazyLoadImage effect="blur" className="object-fit-cover rounded h-100" style={{ width: '18rem' }} src={anime.images ? anime.images.jpg.image_url : ''} alt="img" />
                        </div>
                        <div className="w-100">
                            <Table bordered hover className="h-100">
                                <tbody>
                                    <tr>
                                        <td>Title English</td>
                                        <td>{anime.title_english}</td>
                                    </tr>
                                    <tr>
                                        <td>Title Japanese</td>
                                        <td>{anime.title_japanese}</td>
                                    </tr>
                                    <tr>
                                        <td>Aired</td>
                                        <td>{anime.aired ? anime.aired.string : '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Rating</td>
                                        <td>{anime.rating}</td>
                                    </tr>
                                    <tr>
                                        <td>Rank</td>
                                        <td>{anime.rank}</td>
                                    </tr>
                                    <tr>
                                        <td>Score</td>
                                        <td>{anime.score}</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td>{anime.status}</td>
                                    </tr>
                                    <tr>
                                        <td>Source</td>
                                        <td>{anime.source}</td>
                                    </tr>
                                    <tr>
                                        <td>Season</td>
                                        <td>{anime.season ? anime.season : '-'}</td>
                                    </tr>
                                    <tr>
                                        <td>Duration</td>
                                        <td>{anime.duration}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="d-flex gap-1 m-0 pt-3">
                        {anime.genres ? anime.genres.map((genre, index) => <p key={index} className="border m-0 p-2 rounded-1" style={{ width: 'max-content', fontSize: '12px' }}>{genre.name}</p>) : ''}
                    </div>
                </div>
                {anime.trailer ? anime.trailer.embed_url ? <iframe width="100%" height="500" src={`${anime.trailer.embed_url}`} className="mb-4" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> : '' : ''}
                <div className="w-100 rounded overflow-hidden shadow-sm mb-4 p-3">
                    <h1>Characters</h1>
                    <div className="d-flex overflow-scroll gap-2">
                        {characters.map((character, index) => <CardCharacter key={index} id={character.character.mal_id} image={character.character.images.jpg.image_url} name={character.character.name} role={character.role} />)}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Detail;