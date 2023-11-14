import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css"
import Spinner from './Spinner';
import Message from './Message';
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
    const { isLoading, cities } = useCities()
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Add your first city by clicking on the city on the map" />
    const countries = cities.reduce((arr, city) => {
        return !arr.map(el => el.country).includes(city.country) ? [...arr, { country: city.country, emoji: city.emoji }] : arr
    }, [])
    return (
        <ul className={styles.countryList}>
            {countries.map(country => <CountryItem key={country.country} country={country} />)}
        </ul>
    )
}
export default CountryList