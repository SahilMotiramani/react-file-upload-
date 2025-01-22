import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9000/gs")
            .then(res => setInfo(res.data))
            .catch(err => alert("Error fetching data: " + err));
    }, []);

    const delStu = async (rno, image) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;

        try {
            const res = await axios.delete("http://localhost:9000/ds", { data: { rno, image } });
            if (res.status === 200) {
                alert("Record deleted successfully");
                setInfo(info.filter(student => student.rno !== rno));
            } else {
                alert("Failed to delete record");
            }
        } catch (err) {
            alert("Error: " + err);
        }
    };

    const downloadImage = (image) => {
        // Open image in a new tab to let the user decide where to save
        window.open(`http://localhost:9000/uploads/${image}`, "_blank");
    };

    return (
        <center>
            <h1>Home Page</h1>
            <table border="5">
                <thead>
                    <tr>
                        <th>Rno</th>
                        <th>Name</th>
                        <th>marks</th>
                        <th>Image</th>
                        
                        <th>Download</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {info.map((e) => (
                        <tr key={e.rno}>
                            <td>{e.rno}</td>
                            <td>{e.name}</td>
                            <td>{e.marks}</td>
                            <td>
                                <img src={`http://localhost:9000/uploads/${e.image}`} alt="Student" width="100" />
                            </td>
                            <td>
                                <button onClick={() => downloadImage(e.image)}>Download</button>
                            </td>
                            <td>
                                <button onClick={() => delStu(e.rno, e.image)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </center>
    );
}

export default Home;
 