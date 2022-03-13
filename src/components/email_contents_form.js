import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function EmailContentsForm(props) {

    const [inputField , setInputField] = useState({
        event_id: '',
        email_subject: '',
        email_content: '',
        timestamp: ''
    });

    const inputsHandler = (e) =>{
        setInputField( {
            ...inputField,
            [e.target.name]: e.target.value
        } );
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setInputField(
            {
                event_id: '',
                email_subject: '',
                email_content: '',
                timestamp: ''
            }
        )
        const base_url = process.env.REACT_APP_BASE_URL;
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(inputField)
        };
        await fetch(`${base_url}/save_emails`, settings);
        window.location.reload()
    };

    return (
        <>
            <h1>Email Content</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEventID">
                    <Form.Label>Event ID</Form.Label>
                    <Form.Control type="number" placeholder="Event ID" name="event_id" value={inputField.event_id || ''} onChange={inputsHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmailSubject">
                    <Form.Label>Email Subject</Form.Label>
                    <Form.Control type="text" placeholder="Email Subject" name="email_subject" value={inputField.email_subject || ''} onChange={inputsHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmailContent">
                    <Form.Label>Email Content</Form.Label>
                    <Form.Control type="text" placeholder="Email Content" name="email_content" value={inputField.email_content || ''} onChange={inputsHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formTimestamp">
                    <Form.Label>Timestamp</Form.Label>
                    <Form.Control type="text" placeholder="DD Mon YYYY HH:M" name="timestamp" value={inputField.timestamp || ''} onChange={inputsHandler}/>
                    <Form.Text className="text-muted">
                        Example 15 Dec 2015 13:13.
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}