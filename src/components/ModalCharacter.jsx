import { Button, Modal } from "react-bootstrap";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

const ModalCharacter = (props) => {
    const [index, setIndex] = useState(props.imageindex)
    const [imgUrl, setImgUrl] = useState()
    useEffect(() => {
        setIndex(props.imageindex)
    }, [props.imageindex])
    const handlePrev = (index) => {
        if (index === 0) {
            setIndex(props.galleries.length - 1)
        }else {
            setIndex(index - 1)
        }
    }
    const handleNext = (index) => {
        if (index === props.galleries.length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }
    useEffect(() => {
        if (props.galleries && props.galleries.length > 0) {
            setImgUrl(props.galleries[index]?.jpg.image_url);
        }
    }, [index, props.galleries]);
    const handleDownload = async () => {
        try {
            const response = await fetch(imgUrl, { mode: 'cors' });
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${props.name}_${index}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error downloading the image:', error);
        }
    }
    return(
        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            {/* <Button className="position-absolute border-0 end-0 rounded-0 rounded-bottom-1 p-0" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={props.onHide}>
                <X className="fs-1"/>
            </Button>
            <Button variant="success" className="position-absolute border-0 rounded-0 rounded-bottom-1 " onClick={props.onHide}>
                <Download className="fs-4"/>
            </Button> */}
            {props.galleries.map((gallery, i) => 
                index === i ? <img key={i} src={gallery.jpg.image_url} alt="img" width='300px' className="object-fit-cover m-auto" /> : ''
            )}
            {/* <img src={props.image} alt="img" width='300px' className="object-fit-cover m-auto" /> */}
            <Button className="bg-transparent position-absolute border-0 bottom-50" style={{ left: '-70px' }} onClick={() => handlePrev(index)}>
                <ChevronLeft className="fs-1"/>
            </Button>
            <Button className="bg-transparent position-absolute border-0 bottom-50" style={{ right: '-70px' }} onClick={() => handleNext(index)}>
                <ChevronRight className="fs-1"/>
            </Button>
            <Modal.Footer className="p-0 overflow-hidden">
                <Button variant="dark" className="m-0 rounded-0 w-50" onClick={props.onHide}>Close</Button>
                <Button variant="primary" className="m-0 rounded-0 w-50" onClick={() => handleDownload()}>Download</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalCharacter;