import axios from "../utils/axiosConfig";
import { useEffect, useState } from "react";
import "../styles/AllBlocks.css";

export default function AllBlocks() {
    const [blocks, setBlocks] = useState([]);

    const fetchBlocks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/blocks");
            setBlocks(response.data);
        } catch (error) {
            console.error("Error fetching blocks:", error);
        }
    };

    useEffect(() => {
        fetchBlocks();
    }, []);

    return (
        <div className="all-blocks-container">
            <h3>All Blocks</h3>
            <ul>
                {blocks.map((block) => (
                    <li key={block.id}>
                        <span>{block.blockerUserName} blocked {block.blockedUserName}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
