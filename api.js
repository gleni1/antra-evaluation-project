export const APIs = (() => {
    const baseURL = "http://localhost:3000/goals";

    const getGoals = () => {
        return fetch(baseURL).then((res)=>res.json());
    };

    const createGoal = (newGoal) => {
        return fetch(baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newGoal),
        }).then((res)=>res.json());
    };

    const updateGoal = (id) => {
        return fetch(`${baseURL}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ achieved: true }),
        }).then((res)=>res.json());
    }

    return {
        getGoals, 
        createGoal,
        updateGoal
    }
})();