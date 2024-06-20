import { useParams } from "react-router-dom";
import { useState, useEffect } from "react"
import { getAnime } from "../services/anime";
import { Button, Container } from "react-bootstrap";
import ModalCharacter from "../components/ModalCharacter";
import MyHomeLoading from "../components/MyHomeLoading";
import { useNavigate } from "react-router-dom";
import { CaretLeftFill, HouseFill } from "react-bootstrap-icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const DetailCharacter = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState([])
    const [galleries, setGalleries] = useState([])
    const [modalShow, setModalShow] = useState(false)
    const [selectedImage, setSelectedImage] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    // about
    const [about, setAbout] = useState([])

    useEffect(() => {
        if (character?.name) {
            document.title = 'AnimeList - ' + character.name;
        }
    }, [character?.name]);

    useEffect(() => {
        const fetchData = async(id) => {
            setLoading(true)
            try {
                let data = await getAnime(`characters/${id}/full`)
                setCharacter(data.data)
                data = await getAnime(`characters/${id}/pictures`)
                setGalleries(data.data)
            } catch (error) {
                console.error('failed to fetch data: ' + error)
            } finally{
                setLoading(false)
                setAbout(character.about?.split('\n'))
            }
        }
        fetchData(id)
    }, [id, character.about])

    const handleImageClick = (index) => {
        setSelectedImage(index)
        setModalShow(true)
    }

    return(
        <>
            <MyHomeLoading homeLoading={loading} />
            <Container className="my-2 d-flex gap-1">
                <Button onClick={() => navigate(-1)} className="btn btn-primary"><CaretLeftFill /> Back</Button>
                <a href="/" className="btn btn-success"><HouseFill /></a>
            </Container>
            <Container className="shadow-sm rounded-3 p-3 my-3 d-flex gap-3 flex-md-row flex-column">
                <div className="text-center">
                    <LazyLoadImage effect="blur" className="object-fit-cover rounded h-100" style={{ width: '18rem' }} src={character.images?.jpg.image_url} alt="img" />
                </div>
                <div className="w-100">
                    <p>Name: {character?.name}</p>
                    {about?.map((about, index) => <p key={index}>{about}</p>)}
                </div>
                {/* {console.log(character.images.jpg.image_url)} */}
            </Container>
            <Container className="m-auto shadow rounded p-3 my-3">
                <h3>Gallery</h3>
                <div className="row w-100 gap-3 m-0 justify-content-center">
                    {galleries?.map((gallery, index) => 
                        <div key={index} className="position-relative gallery p-0 rounded overflow-hidden" style={{ width: '200px' }} onClick={() => handleImageClick(index)}>
                            <div className="position-absolute w-100 h-100 gallery-hover"></div>
                            <LazyLoadImage effect="blur" src={gallery.jpg.image_url} alt="gallery" className="object-fit-cover bg-dark p-0 w-100" />
                        </div>
                    )}
                </div>
                <ModalCharacter show={modalShow} onHide={() => setModalShow(false)} imageindex={selectedImage} galleries={galleries} name={character.name} setimageindex={setSelectedImage} />
            </Container>
        </>
    )
}

export default DetailCharacter;