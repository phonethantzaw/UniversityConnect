import {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "../../utils/axiosConfig";
import {Button, Table} from "react-bootstrap";
import {FaDownload, FaPen, FaTrash} from "react-icons/fa6";


export default function Resource() {

    const [key, setKey] = useState('');
    const [resourceCategory, setResourceCategory] = useState([]);
    const [resource, setResource] = useState([]);
    const userRole = localStorage.getItem('userRole');

    const apiUrl = process.env.REACT_APP_API_BASE_URL;

    const fetchAllResourceCategory = async () => {
        try {
            const response = await axios.get(`${apiUrl}/resource-categories`);
            setResourceCategory(response.data);
            if (response.data.length > 0) {
                setKey(response.data[0].id); // Set the key to the first category's id
            }
        } catch (error) {
            console.error('Error fetching resource categories:', error);
        }
    }


    const fetchResourceByCategory = async (categoryId) => {
        try {
            const response = await axios.get(`${apiUrl}/resources?categoryId=${categoryId}`);
            setResource(response.data);
        } catch (error) {
            console.error('Error fetching resources by category:', error);

        }

    }

    const downloadOnClick = async (id) => {
        try {
            const response = await axios.get(`${apiUrl}/resources/${id}/download`, {responseType: 'blob'});
            const contentDisposition = response.headers['content-disposition'];
            let fileName = 'downloadedFile';
            if (contentDisposition) {
                const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);

                if (fileNameMatch.length > 1) {

                    fileName = fileNameMatch[1];
                }
            }
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            link.remove();
        } catch (error) {
            console.error('Error downloading resource:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/resources/${id}`);
            fetchResourceByCategory(key);
        } catch (error) {
            console.error('Error deleting resource:', error);

        }
    }


    useEffect(() => {
        fetchAllResourceCategory();
    }, []);

    useEffect(() => {
        if (key) {
            fetchResourceByCategory(key);
        }
    }, [key]);

    const handleSelect = (k) => {
        setKey(k);
        fetchResourceByCategory(k);

    }


    return (
        <Tabs
            id="controlled-tab"
            activeKey={key}
            onSelect={(k) => handleSelect(k)}
            className="mb-3">
            {resourceCategory.map((category) => (
                <Tab eventKey={category.id} title={category.name} key={category.id}>
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>File Name</th>
                            <th>Download</th>
                            {userRole === "ADMIN" &&<th>Update</th>}
                            {userRole === "ADMIN" &&<th>Delete</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {resource.map((res) => (
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td>{res.fileName}</td>
                                <td><FaDownload onClick={() => downloadOnClick(res.id)}/></td>
                                {userRole === "ADMIN" && <td><FaPen /></td>}
                                {userRole === "ADMIN" &&<td><FaTrash onClick={() => handleDelete(res.id)}/></td>}
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Tab>
            ))}
        </Tabs>
    )


}