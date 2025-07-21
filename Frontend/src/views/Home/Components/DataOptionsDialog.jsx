import React from 'react';
import { Modal, Button, Spinner, Alert } from 'react-bootstrap';

const DataOptionsDialog = ({ show, onHide, data, loading, error }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Select Data Option</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading && (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p>Loading data...</p>
                    </div>
                )}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && !error && data.length === 0 && (
                    <p>No data available. Please add some data on the backend.</p>
                )}
                {!loading && !error && data.length > 0 && (
                    <div>
                        <h5>Available Data:</h5>
                        <ul>
                            {data.map((item, index) => (
                                // Assuming each data item has an 'id' and 'name' property
                                <li key={item.id || index}>{item.name || `Data Item ${index + 1}`}</li>
                            ))}
                        </ul>
                        {/* You can add more interactive elements here, e.g., buttons to select data */}
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DataOptionsDialog;