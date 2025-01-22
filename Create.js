import { useRef, useState } from "react";
import axios from "axios";

function Create() {
    const rNo = useRef();
    const rName = useRef();
    const rMarks = useRef();
    const rFile = useRef();

    const [rno, setRno] = useState("");
    const [name, setName] = useState("");
    const [marks, setMarks] = useState("");
    const [file, setFile] = useState("");
    const [msg, setMsg] = useState("");

    const hRno = (event) => { setRno(event.target.value); };
    const hName = (event) => { setName(event.target.value); };
    const hMarks = (event) => { setMarks(event.target.value); };
    const hFile = (event) => { setFile(event.target.files[0]); };

    const save = (event) => {
        event.preventDefault();

        if (rno === "") {
            alert("Please enter roll number.");
            setMsg("");
            rNo.current.focus();
            return;
        }

        if (name === "") {
            alert("Please enter name.");
            setMsg("");
            rName.current.focus();
            return;
        }

        if (marks === "") {
            alert("Please enter marks.");
            setMsg("");
            rMarks.current.focus();
            return;
        }

        if (!file) {
            alert("Please select a file.");
            setMsg("");
            rFile.current.focus();
            return;
        }

        const formData = new FormData();
        formData.append("rno", rno);
        formData.append("name", name);
        formData.append("marks", marks);
        formData.append("file", file);

        let url = "http://localhost:9000/ss";
        axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            if (res.data.affectedRows === 1) {
                setMsg("Record created");
                setRno("");
                setName("");
                setMarks("");
                rNo.current.focus();
            } else if (res.data.errno === 1062) {
                setMsg(rno + " already exists");
                setRno("");
                rNo.current.focus();
            }
        })
        .catch((err) => {
            setMsg("Issue: " + err);
        });
    };

    return (
        <>
            <center>
                <h1>Create Page</h1>
                <form onSubmit={save}>
                    <input
                        type="number"
                        placeholder="Enter roll number"
                        ref={rNo}
                        onChange={hRno}
                        value={rno}
                    />
                    <br /><br />
                    <input
                        type="text"
                        placeholder="Enter name"
                        ref={rName}
                        onChange={hName}
                        value={name}
                    />
                    <br /><br />
                    <input
                        type="number"
                        placeholder="Enter marks"
                        ref={rMarks}
                        onChange={hMarks}
                        value={marks}
                    />
                    <br /><br />
                    <input
                        type="file"
                        placeholder="Select file"
                        ref={rFile}
                        onChange={hFile}
                    />
                    <br /><br />
                    <input type="submit" value="Save" />
                </form>
                <h2>{msg}</h2>
            </center>
        </>
    );
}

export default Create;
