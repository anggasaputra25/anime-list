import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkFill, StarFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

const MyCard = ({ id, title, image, score, genres, setSaved, status, saved, inBookmark }) => {
    const truncatedTitle = title.length > 23 ? title.substring(0, 23) + '...' : title;

    return (
        <Card style={{ width: '18rem' }} className={`p-0 position-relative ${inBookmark && !status ? 'd-none' : '' }`}>
            <Button 
                onClick={() => {status ? setSaved(saved.filter(item => item !== id)) : setSaved((prevSaved) => [...prevSaved, id])}} 
                className='position-absolute bg-primary bottom-50 end-0 p-2 z-1 me-2' 
                style={{ marginBottom: '-51%' }}
            >
                {status ? <BookmarkFill className='fs-3 text-white' /> : <Bookmark className='fs-3 text-white' />}
            </Button>
            <Link to={`/anime/${id}`} style={{ width: '100%', height: '100%' }} className='text-decoration-none p-0 text-dark'>
                <Card style={{ width: '18rem', height: '25rem' }} className='overflow-hidden position-relative rounded-bottom-0'>
                    <Card.Img variant="top" src={image} className='object-fit-cover h-100 w-100' />
                </Card>
                <Card.Body>
                    <Card.Title>{truncatedTitle}</Card.Title>
                    <Card.Text className="text-warning d-flex align-items-center mt-2 mb-2">
                        <StarFill className='me-1' />{score}
                    </Card.Text>
                    <div className="row gap-1 m-0">
                        {genres.map((genre, index) => (
                            <p key={index} className="border m-0 p-2 rounded-1" style={{ width: 'max-content', fontSize: '10px' }}>
                                {genre.name}
                            </p>
                        ))}
                    </div>
                </Card.Body>
            </Link>
        </Card>
    );
}

export default MyCard;