import React, { useEffect, useState, lazy, Suspense } from "react";
import axios from "axios";

// Lazy load the GenderTable component
const GenderTable = lazy(() => import("./GenderTable"));

const Gender = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState([]);

    const getGender = async () => {
        try {
            const response = await axios.get("https://dummyjson.com/users");
            console.log(response.data, "gender data");
            setData(response.data.users);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000); // 5-second delay
        }
    };

    useEffect(() => {
        getGender();
    }, []);

    return (
        <div>
            <Suspense fallback={
                <div className="loader-container">
                    {loading && (
                        <div className="spinner-border text-danger" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                </div>
            }>
                {!loading && <GenderTable data={data} />}
            </Suspense>
        </div>
    );
};

export default Gender;
