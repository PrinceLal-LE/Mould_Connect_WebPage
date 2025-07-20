import { Container, Image } from 'react-bootstrap';
import avatar from '/home/avtar.png';
import galleryIcon from '/home/Icons/gallery.png';
import videoIcon from '/home/Icons/video_camera.png';
import dataIcon from '/home/Icons/data.png';
import postIcon from '/home/Icons/post.png';
import tripleDotIcon from '/home/Icons/triple_dot.png';
import '../styles/PostDialogueBox.css'; // Adjust the path as necessary
import { Row, Col } from 'react-bootstrap';

export const PostDialogueBox = () => {
    return (
        <>
            <Container fluid className='bg-white px-4 py-4 mb-2 postDialogueBox   '>
                <Row>
                    <Col className='d-flex justify-content-center align-items-top gap-3' md={1}>
                        <div>
                            <img src={avatar} alt=""  style={{ width: '50px', borderRadius: '10rem', paddingTop: '1.5rem' }} />
                        </div>
                    </Col>
                    <Col md={11} className=''>
                        <div className='postDialogueBox__input  '>
                            <textarea placeholder='Share Business / Project / Post' className='w-100 mt-3' style={{ resize: 'none' }} rows={5} />
                        </div>
                    </Col>
                </Row>

                {/* This include the the addition of photo image, etc. */}
                <Row className='postDialogueBoxIconsRow'>
                    {/* d-flex justify-content-center align-items-center gap-3 */}
                    <Col md={2} className='postDialogueBoxIcons'>
                        <div >
                            <img src={galleryIcon} alt="Image Upload" /> Photo
                        </div>
                    </Col>
                    <Col md={2} className='postDialogueBoxIcons'>
                        <div >
                            <img src={videoIcon} alt=" Video Icon" /> Video
                        </div>
                    </Col>
                    <Col md={2} className='postDialogueBoxIcons'>
                        <div >
                            <img src={dataIcon} alt=" Data choose" /> Data
                        </div>
                    </Col>
                    <Col md={2} className='postDialogueBoxIcons'>
                        <div >
                            <img src={postIcon} alt="Post" /> Post
                        </div>
                    </Col>
                    <Col xs="auto" className='postDialogueBoxIconsRightSide ms-auto' >
                        <div >
                            <img src={tripleDotIcon} alt="Post" /> 
                        </div>
                    </Col>
                </Row>

            </Container>
        </>
    )
}