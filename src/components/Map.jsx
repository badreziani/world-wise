import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const lat = searchParams.get("lat")
    const lng = searchParams.get("lng")
    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>Positiob :<br />
            Lat : {lat}
            Lng : {lng}
            <br />
            <button onClick={() => setSearchParams({ lat: 50, lng: 50 })}>Change Pos</button>

        </div>
    )
}

export default Map