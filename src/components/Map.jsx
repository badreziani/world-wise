import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
    const [mapPostion, setMapPostion] = useState([40, 0]);
    const { cities } = useCities()
    const { isLoading: isLoadingPosition, position: geoLocationPostion, getPosition } = useGeolocation()
    const [mapLat, mapLng] = useUrlPosition()
    useEffect(function () {
        if (mapLat && mapLng) setMapPostion([mapLat, mapLng])
    }, [mapLat, mapLng])

    useEffect(function () {
        if (geoLocationPostion) setMapPostion([geoLocationPostion.lat, geoLocationPostion.lng])
    }, [geoLocationPostion])
    return (
        <div className={styles.mapContainer}>
            {!geoLocationPostion && <Button type="position" onClick={getPosition} >
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>}
            <MapContainer className={styles.map} center={mapPostion} zoom={6} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map(city => (

                    <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>))
                }
                <ChangePosition mapPostion={mapPostion} />
                <DetectClick />
            </MapContainer>
        </div>
    )
}
function ChangePosition({ mapPostion }) {
    const map = useMap();
    map.setView(mapPostion)
    return null;
}
function DetectClick() {
    const navigate = useNavigate()
    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    })
    return null
}

export default Map