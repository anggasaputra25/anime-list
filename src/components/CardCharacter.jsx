import { LazyLoadImage } from "react-lazy-load-image-component";

const CardCharacter = ({id, image, name, role}) => {
    return(
        <>
            <a href={`/character/${id}`} className="rounded col-5 col-md-2 overflow-hidden position-relative text-white detail-card p-0">
                <LazyLoadImage effect="blur" className="object-fit-cover h-100 w-100" src={image} alt="img" />
                <div className="position-absolute w-100 h-100 d-flex flex-column justify-content-center text-center detail-data">
                    <h4 className="mb-1">{name}</h4>
                    <p className="m-0">{role}</p>
                </div>
            </a>
        </>
    )
}

export default CardCharacter;