import { Button, Modal } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const ModalCharacter = (props) => {
    const { setimageindex, imageindex, galleries, name, onHide, show } = props;
    const [imgUrl, setImgUrl] = useState('');

    useEffect(() => {
        if (galleries && galleries.length > 0) {
            setImgUrl(galleries[imageindex]?.jpg.image_url);
        }
    }, [imageindex, galleries]);

    const handlePrev = () => {
        if (imageindex === 0) {
            setimageindex(galleries.length - 1);
        } else {
            setimageindex(imageindex - 1);
        }
    };

    const handleNext = () => {
        if (imageindex === galleries.length - 1) {
            setimageindex(0);
        } else {
            setimageindex(imageindex + 1);
        }
    };

    const handleDownload = async () => {
        try {
            const response = await fetch(imgUrl, { mode: 'cors' });
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${name}_${imageindex}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {galleries.map((gallery, i) =>
                imageindex === i ? <img key={i} src={gallery.jpg.image_url} alt="img" width='300px' className="object-fit-cover m-auto" /> : null
            )}
            <Button className="bg-transparent position-absolute border-0 bottom-50" style={{ left: '-70px' }} onClick={handlePrev}>
                <ChevronLeft className="fs-1" />
            </Button>
            <Button className="bg-transparent position-absolute border-0 bottom-50" style={{ right: '-70px' }} onClick={handleNext}>
                <ChevronRight className="fs-1" />
            </Button>
            <Modal.Footer className="p-0 overflow-hidden">
                <Button variant="dark" className="m-0 rounded-0 w-50" onClick={onHide}>Close</Button>
                <Button variant="primary" className="m-0 rounded-0 w-50" onClick={handleDownload}>Download</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCharacter;