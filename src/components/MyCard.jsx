import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Bookmark, BookmarkFill, StarFill } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';

const MyCard = ({ id, title, image, score, genres, setSaved, status, saved, inBookmark }) => {
    const truncatedTitle = title?.length > 18 ? title?.substring(0, 18) + '...' : title;

    return (
        <div className='p-2 col-md-3 col-6'>
            <Card className={`p-0 h-100 position-relative overflow-hidden ${inBookmark && !status ? 'd-none' : '' }`}>
                <Button 
                    onClick={() => {status ? setSaved(saved?.filter(item => item !== id)) : setSaved((prevSaved) => [...prevSaved, id])}} 
                    className='position-absolute bg-primary end-0 p-2 z-1'
                >
                    {status ? <BookmarkFill className='fs-3 text-white' /> : <Bookmark className='fs-3 text-white' />}
                </Button>
                <Link to={`/anime/${id}`} style={{ width: '100%', height: '100%' }} className='text-decoration-none p-0 text-dark'>
                    <Card style={{ width: '100%', height: '100%' }} className='overflow-hidden position-relative rounded-bottom-0'>
                        <Card.Img variant="top" src={image} className='object-fit-cover h-100 w-100' />
                        <Card.Body className='position-absolute bottom-0 w-100 rounded-top d-none d-lg-block text-white card-body-hover' style={{ backgroundColor: 'rgba(0,0,0,0.8)', maxHeight: '32%' }}>
                            <Card.Title>{truncatedTitle}</Card.Title>
                            <Card.Text className="text-warning d-flex align-items-center mt-2 mb-2">
                                <StarFill className='me-1' />{score}
                            </Card.Text>
                            <div className="row gap-1 m-0">
                                {genres?.map((genre, index) => (
                                    <p key={index} className="border m-0 p-2 rounded-1" style={{ width: 'max-content', fontSize: '10px' }}>
                                        {genre?.name}
                                    </p>
                                ))}
                            </div>
                        </Card.Body>
                    </Card>
                </Link>
            </Card>
        </div>
    );
}

export default MyCard;