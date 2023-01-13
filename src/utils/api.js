const fetchIngredients = (url, setIngredients) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP status " + response.status);
            }
            return response.json();
        })
        .then(json => {
            let ingredients = json.data;
            ingredients[0].count = 1;
            setIngredients(ingredients);
        })
        .catch(er => console.error(er))
};

export { fetchIngredients };