export const View = (() => {
    const goalListEl = document.querySelector(".goal__list");  // Fixed class selector
    const goalInputEl = document.querySelector(".goal__input");  // Fixed class selector
    const repInputEl = document.querySelector(".rep__input");    // Fixed class selector
    const categoryInputEl = document.querySelector(".category"); // Fixed class selector
    const addBtnEl = document.querySelector(".goal__btn");  


    const renderGoals = (goals) => {
        goalListEl.innerHTML = "";

        goals.forEach((goal) => {
            const goalItem = document.createElement("li");
            goalItem.id = goal.id;

            const span = document.createElement("span");
            span.innerHTML = `${goal.description} - <strong>${goal.category}</strong> (${goal.repetitions})`;
            if (goal.achieved) {
                span.style.textDecoration = "line-through";
            }

            const button = document.createElement("button");
            button.textContent = "Mark as achieved";
            button.classList.add("achieved__btn");

            goalItem.appendChild(span);
            goalItem.appendChild(button);
            goalListEl.appendChild(goalItem);
        });
    };

    const showValidationError = (message) => {
        // Check if error message element already exists
        let errorEl = document.querySelector(".validation-error");
        
        // If not, create one
        if (!errorEl) {
            errorEl = document.createElement("div");
            errorEl.className = "validation-error";
            // Insert after the form
            document.querySelector("form").appendChild(errorEl);
        }
        
        // Set error message
        errorEl.textContent = message;
        errorEl.style.color = "red";
        errorEl.style.marginTop = "10px";
    };

    const clearValidationError = () => {
        const errorEl = document.querySelector(".validation-error");
        if (errorEl) {
            errorEl.remove();
        }
        
        // Remove invalid input styling
        goalInputEl.classList.remove("invalid-input");
        repInputEl.classList.remove("invalid-input");
    };

    const getGoalValue = () => {
        return goalInputEl.value;
    };

    const getCategoryValue = () => {
        return categoryInputEl.value;
    };

    const getRepetitionsValue = () => {
        return repInputEl.value;
    };

    const clearInput = () => {
        goalInputEl.value = "";
        repInputEl.value = "";
    };

    return {
        renderGoals,
        getGoalValue,
        getCategoryValue,
        getRepetitionsValue,
        clearInput,
        showValidationError,
        clearValidationError,
        addBtnEl,
        goalListEl
    };
})();