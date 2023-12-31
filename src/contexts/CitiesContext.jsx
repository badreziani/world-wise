import { createContext, useContext, useEffect, useReducer } from "react"

const BASE_URL = "http://localhost:8080"
const CitiesContext = createContext()
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {}
}

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };
        case "cities/loaded":
            return { ...state, cities: action.payload, isLoading: false }
        case "city/loaded":
            return { ...state, currentCity: action.payload, isLoading: false }
        case "city/created":
            return { ...state, cities: action.payload, isLoading: false }
        case "city/deleted":
            return { ...state, }

    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState);
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({})

    useEffect(function () {
        async function loadCities() {
            try {
                dispatch({})
                const res = await fetch(`${BASE_URL}/cities`)
                const data = await res.json()
                setCities(data);
            } catch {
                alert("Error when trying to load data...");

            } finally {
                setIsLoading(false)
            }
        }
        loadCities()
    }, [])
    async function getCity(id) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            setCurrentCity(data);
        } catch {
            alert("Error when trying to load data...");

        } finally {
            setIsLoading(false)
        }
    }
    async function createCity(newCity) {
        try {
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            setCities([...cities, data])
        } catch {
            alert("Error when trying to create new city...");

        } finally {
            setIsLoading(false)
        }
    }
    async function deleteCity(id) {
        try {
            setIsLoading(true)
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            })
            setCities(cities => cities.filter(city => city.id != id))
        } catch {
            alert("Error when trying to deleting the city...");

        } finally {
            setIsLoading(false)
        }
    }
    return (
        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity,
            deleteCity
        }}>
            {children}
        </CitiesContext.Provider>
    )
}

function useCities() {
    const context = useContext(CitiesContext)
    if (context === undefined) throw new Error("The Citiies was used outside of the CitiesProvider")
    return context
}

export { CitiesProvider, useCities } 