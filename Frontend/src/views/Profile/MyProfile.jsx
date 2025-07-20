import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../store/authSlice'; // We will add this action to authSlice
import { Container, Row, Col, Form, Button } from 'react-bootstrap'; // Import Bootstrap components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const MyProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const isLoading = useSelector((state) => state.auth.isLoading);

    // Local state for form fields, initialized with Redux user data
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        mobile: '',
        address: '',
        headline: '',
        bio: '',
        skills: '',
        linkedin: '',
        twitter: '',
    });

    // Update local state when Redux user data changes (e.g., on initial load or login)
    useEffect(() => {
        if (user) {
            setProfileData({
                name: user.name || '',
                email: user.email || '',
                mobile: user.mobile || user.phone || '',
                address: user.address || user.location || '',
                headline: user.headline || '',
                bio: user.bio || '',
                skills: Array.isArray(user.skills) ? user.skills.join(', ') : (user.skills || ''),
                linkedin: user.linkedin || '',
                twitter: user.twitter || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convert skills string back to an array if needed for backend/Redux
        const skillsArray = profileData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);

        const updatedUser = {
            ...user, // Keep existing user properties
            ...profileData, // Override with form data
            skills: skillsArray // Use the processed skills array
        };

        dispatch(updateUserProfile(updatedUser)); // Dispatch action to update Redux state

        // Show alert with updated data
        alert(`Profile Updated Successfully!\n\n` +
              `Name: ${updatedUser.name}\n` +
              `Email: ${updatedUser.email}\n` +
              `Mobile: ${updatedUser.mobile}\n` +
              `Address: ${updatedUser.address}\n` +
              `Headline: ${updatedUser.headline}\n` +
              `Bio: ${updatedUser.bio}\n` +
              `Skills: ${updatedUser.skills.join(', ')}\n` +
              `LinkedIn: ${updatedUser.linkedin}\n` +
              `Twitter: ${updatedUser.twitter}`);
    };

    if (isLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <p className="text-secondary">Loading profile...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
                <p className="text-danger">Please log in to view your profile.</p>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center py-0 m-3" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', borderRadius: '15px' }}>
            <Container className="bg-white p-4 p-md-5 position-relative" style={{ maxWidth: '100%', borderRadius: '15px' }}>
                {/* Cover Photo Section */}
                <div className="position-relative w-100 bg-light rounded overflow-hidden border border-secondary d-flex align-items-center justify-content-center mb-4" style={{ height: '180px' }}>
                    <img src="/home/Left_side_icon.png" alt="Cover Photo" className="h-100 w-100" />
                    <Button variant="light" className="position-absolute top-0 end-0 m-3 rounded-2 shadow-sm" style={{ padding: '0.5rem' }}>
                        {/* Edit Icon (Pencil) */}
                        <FontAwesomeIcon icon={'pencil'} />
                    </Button>
                </div>

                {/* Profile Picture Section */}
                <div className="position-absolute start-50 translate-middle rounded-4 border bg-light d-flex align-items-center justify-content-center shadow" style={{ width: '120px', height: '120px', top: 'calc(180px + 80px)' }}> {/* Adjusted top to overlap cover photo */}
                    <img src="/home/profile_icon.png" alt="Profile Photo" className="h-100 w-100 rounded-4" />
                    <Button variant="light" className="position-absolute bottom-0 end-0 m-1 rounded-2 shadow-sm" style={{ padding: '0.25rem' }}>
                        {/* Edit Icon (Pencil) */}
                        <FontAwesomeIcon icon={'pencil'} />
                    </Button>
                </div>

                <Form onSubmit={handleSubmit} className="mt-5 pt-5"> {/* Adjusted margin-top and padding-top to account for profile pic */}
                    {/* Name and Email */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formName" className="mb-3">
                                <Form.Label className="text-muted">Name :</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={profileData.name}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label className="text-muted">Email:</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleChange}
                                    className="rounded shadow-sm bg-light"
                                    readOnly
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Mobile and Address */}
                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formMobile" className="mb-3">
                                <Form.Label className="text-muted">Mobile:</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="mobile"
                                    value={profileData.mobile}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    placeholder="e.g., +1 123-456-7890"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formAddress" className="mb-3">
                                <Form.Label className="text-muted">Address:</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={profileData.address}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    placeholder="e.g., 123 Main St, City, State"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Additional fields from previous version */}
                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formHeadline" className="mb-3">
                                <Form.Label className="text-muted">Headline / Profession</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="headline"
                                    value={profileData.headline}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    placeholder="e.g., Software Engineer, Marketing Specialist"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formBio" className="mb-3">
                                <Form.Label className="text-muted">About Me (Bio)</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={4}
                                    name="bio"
                                    value={profileData.bio}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    placeholder="Tell us a little about yourself..."
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col>
                            <Form.Group controlId="formSkills" className="mb-3">
                                <Form.Label className="text-muted">Skills (comma-separated)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="skills"
                                    value={profileData.skills}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    placeholder="e.g., React, Node.js, Marketing, Design"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Social Media Links */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <Form.Group controlId="formLinkedIn" className="mb-3">
                                <Form.Label className="text-muted">LinkedIn Profile URL</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="linkedin"
                                    value={profileData.linkedin}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formTwitter" className="mb-3">
                                <Form.Label className="text-muted">Twitter Profile URL</Form.Label>
                                <Form.Control
                                    type="url"
                                    name="twitter"
                                    value={profileData.twitter}
                                    onChange={handleChange}
                                    className="rounded shadow-sm"
                                    placeholder="https://twitter.com/yourhandle"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    {/* Submit Button */}
                    <div className="d-flex justify-content-end">
                        <Button
                            type="submit"
                            variant="primary" // Use Bootstrap primary button style
                            className="shadow-sm" // Add a subtle shadow
                        >
                            Save Profile
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    );
};

export default MyProfile;
