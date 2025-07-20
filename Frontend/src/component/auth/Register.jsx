import { Container, Row, Col, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { validateConfirmPassword, validateEmail, validateFullName, validatePassword } from '../commonValidation/frontendValidation';
export const Register = () => {
    // State to hold form data
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    // State to hold validation errors for each field
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Live validation as user types
        let errorMessage = '';
        switch (name) {
            case 'fullName':
                errorMessage = validateFullName(value);
                break;
            case 'email':
                errorMessage = validateEmail(value);
                break;
            case 'password':
                errorMessage = validatePassword(value);
                break;
            case 'confirmPassword':
                // Confirm password also needs the original password for comparison
                errorMessage = validateConfirmPassword(formData.password, value);
                break;
            default:
                break;
        }
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: errorMessage,
        }));
    };

    // Handler for form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Run all validations on submit
        const newErrors = {
            fullName: validateFullName(formData.fullName),
            email: validateEmail(formData.email),
            password: validatePassword(formData.password),
            confirmPassword: validateConfirmPassword(formData.password, formData.confirmPassword),
        };

        setErrors(newErrors); // Update error state with all errors

        // Check if there are any errors
        const hasErrors = Object.values(newErrors).some(error => error !== '');

        if (!hasErrors) {
            console.log('Form data submitted:', formData);
            // Proceed with API call or further processing
            // Example:
            // fetch('/api/register', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(formData)
            // })
            // .then(response => response.json())
            // .then(data => console.log('Success:', data))
            // .catch(error => console.error('Error:', error));
        } else {
            console.log('Form has validation errors. Please correct them.');
        }
    };
    return <>
        <section>
            <main>
                <Container className='registrationForm'>
                    <Row className="justify-content-center d-flex" >
                        <Col md={6} className='text-center'>
                            <h1>Registration form</h1>
                        </Col>
                    </Row>
                    <Row className="justify-content-center d-flex">
                        <Col md={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className='mb-3' controlId='fullName'>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your full name" />
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row>

                    </Row>
                </Container>
            </main>
        </section>
    </>
};