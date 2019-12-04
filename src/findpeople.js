import React, { useState, useEffect } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function FindPeople() {
    console.log("FindPeople is here");
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        let ignore = false;
        (async () => {
            console.log("query: ", query);
            const { data } = await axios.get(`/api/users/${query}`);
            if (!ignore) {
                console.log("users data: ", data);
                setUsers(data);
            } else {
                alert("Ignored!");
            }
        })();
        return () => (ignore = true);
    }, [query]);

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
                        <Link to={`/user/${user.id}`}>
                            <img src={user.image_url} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
