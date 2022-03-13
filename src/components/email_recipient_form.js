import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SweetAlert2 from 'react-sweetalert2';

export default function EmailRecipientForm(props) {

    const [swalProps, setSwalProps] = useState({});
    const [inputField , setInputField] = useState({
        event_id: '',
        email_recipient: '',
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
                email_recipient: '',
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
        const response = await fetch(`${base_url}/save_recipient`, settings);
        const data = await response.json();
        if (data.status_code === 200) {
            setSwalProps({
                show: true,
                title: 'Success',
                text: 'Email Recipient Added!',
            });
        } else {
            setSwalProps({
                show: true,
                title: 'Error',
                text: data.message,
            });
        }
    };

    return (
        <>
            <h1>Email Recipient</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEventID">
                    <Form.Label>Event ID</Form.Label>
                    <Form.Control type="number" placeholder="Event ID" name="event_id" value={inputField.event_id || ''} onChange={inputsHandler}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmailRecipient">
                    <Form.Label>Email Recipient</Form.Label>
                    <Form.Control type="text" placeholder="dummy@email.com" name="email_recipient" value={inputField.email_recipient || ''} onChange={inputsHandler}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <SweetAlert2 {...swalProps} />
        </>
    )
}