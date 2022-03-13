import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function EmailContents(props) {

    const [emailContents, setEmailContents] = useState([]);

    useEffect(() => {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        fetch(`${baseUrl}/manage_email`)
            .then(res => res.json())
            .then(data => setEmailContents(data.data))
    }, []);

    const handleDelete = (email_content_id) => (e) => {
        const baseUrl = process.env.REACT_APP_BASE_URL;
        fetch(`${baseUrl}/manage_email?email_content_id=${email_content_id}`, {
            method: 'DELETE'
        });
        window.location.reload();
    }

    return (
        <>
            <h1>Email Contents</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Email Subject</th>
                        <th>Email Content</th>
                        <th>Timestamp</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        emailContents.map(ec => (
                            <tr key={ec.id}>
                                <td>{ec.email_subject}</td>
                                <td>{ec.email_content}</td>
                                <td>{ec.timestamp}</td>
                                <td>
                                    <Button variant="primary" type="submit" onClick={handleDelete(ec.id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
        </>
    )
}