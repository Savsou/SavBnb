import { useEffect, useState } from "react";
import SpotTile from "./SpotTile";
import './SpotTile.css'

const SpotList = () => {
    const [spots, setSpots] = useState([]);

    useEffect(() => {
        const fetchSpots = async () => {
            const res = await fetch('/api/spots');

            if (res.ok) {
                const data = await res.json();
                setSpots(data.Spots);
            }
        }

        fetchSpots();
    }, [])

    return (
        <div className="spot-list">
            {spots.map(spot => (
                <SpotTile key={spot.id} spot={spot} />
            ))}
        </div>
    )
}

export default SpotList;
