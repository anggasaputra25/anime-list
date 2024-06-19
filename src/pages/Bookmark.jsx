import { Button, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { CaretLeftFill, TrashFill } from "react-bootstrap-icons";
import { BASE_LOCAL_STORAGE, getAnime } from "../services/anime";
import MyCard from "../components/MyCard";

const Bookmark = () => {
    const [animes, setAnimes] = useState([]);
    const [saved, setSaved] = useState(JSON.parse(localStorage.getItem(BASE_LOCAL_STORAGE)) || [])
    useEffect(() => {
        document.title = 'AnimeList - Bookmark'
        const Items = JSON.parse(localStorage.getItem(BASE_LOCAL_STORAGE))
        if (Items) {
            const fetchData = () => {
                try {
                    Items.map((item, index) => 
                        setTimeout(async() => {const data = await getAnime(`anime/${item}/full`); setAnimes((prevAnimes) => [...prevAnimes, data?.data])}, index * 700)
                    )        
                } catch (error) {
                    console.log('error featching data: ' + error)
                }
            }
            fetchData();
        }
    }, [])
    useEffect(() => {
        localStorage.setItem(BASE_LOCAL_STORAGE, JSON.stringify(saved))
    }, [saved])
    return (
        <>
            <Container className="my-2 d-flex gap-2">
                <a href="/" className="btn btn-primary"><CaretLeftFill /> Back</a>
                <Button variant="danger" onClick={() => setSaved([])}><TrashFill /> Clear All</Button>
            </Container>
            <Container className={`row mx-auto px-2 gap-3 mb-3 justify-content-center`}>
                {animes.map((anime, index) => {const status = saved.includes(anime?.mal_id); return(<MyCard key={index} id={anime?.mal_id} title={anime?.title} score={anime?.score} image={anime?.images.jpg.image_url} genres={anime?.genres} setSaved={setSaved} status={status} saved={saved} inBookmark={true} />)} )}
            </Container>
        </>
    )
}

export default Bookmark;