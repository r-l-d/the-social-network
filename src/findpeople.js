import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function FindPeople() {
    console.log("FindPeople is here");
    const [users, setUsers] = useState([]);
    const [searchQuery, setQuery] = useState("");
    useEffect(() => {
        let ignore = false;
        (async () => {
            console.log("query: ", searchQuery);
            const { data } = await axios.get(`/api/users/${searchQuery || ""}`);
            if (!ignore) {
                console.log("users data: ", data);
                setUsers(data);
            } else {
                alert("Ignored!");
            }
        })();
        return () => (ignore = true);
    }, [searchQuery]);

    if (!users) {
        return null;
    }

    return (
        <div>
            <h1>Find People</h1>
            <input onChange={e => setQuery(e.target.value)} />
            <div>
                {users.map(user => (
                    <div key={user.id}>
                        {user.first} {user.last}
                        <img src={user.image_url} />
                    </div>
                ))}
            </div>
        </div>
    );
}
