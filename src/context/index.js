import React from "react";
export const Context = React.createContext();

const FiltersProvider = ({ children }) => {
    const categories = ["Women", "Men", "Kids", "Accessories"];
    const filters = ['Top', 'Bottom', 'Jacket']
    const [category, setCategory] = React.useState(categories[0].toLowerCase())
    const [filtersChecked, setFiltersChecked] = React.useState({
        Top: false,
        Bottom: false,
        Jacket: false
    })
    const updatecategory = (value) => setCategory(value.toLowerCase())
    const updateFilters = (e) => setFiltersChecked((prevState) => ({
        ...prevState, [e.target.name]: e.target.checked
    }))

    const filtersKeys = () => {
        return Object.entries(filtersChecked)
        .map(([key, value]) => value && key)
        .filter((obj) => !!obj)
    }

    const value = React.useMemo(() => {
        return {
            categories,
            filters,
            category,
            updatecategory,
            updateFilters,
            filtersChecked: filtersKeys()
        }
    }, [category, filtersChecked, categories, filters])
    return <Context.Provider value={value}> {children} </Context.Provider>
}

export const withContext = (Component) => () => {
    return (
        <Context.Consumer>
            {(value) => <Component value={value} />}
        </Context.Consumer>
    )
}

export default FiltersProvider;