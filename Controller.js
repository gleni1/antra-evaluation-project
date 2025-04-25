import {APIs} from "./api.js";
import {Model} from "./Model.js";
import {View} from "./View.js";

const Controller = ((model, view, api) => {
    const state = new model.State();

    const addGoalHandler = (e) => {
        e.preventDefault();
        const goalValue = view.getGoalValue();
        const categoryValue = view.getCategoryValue();
        const repetitionsValue = view.getRepetitionsValue();
        console.log("add", goalValue, "-", categoryValue, "-", repetitionsValue);

        if (!goalValue.trim() || !repetitionsValue.trim()) {
            // Show validation error
            view.showValidationError("Please fill in all fields");
            return; // Stop execution if validation fails
        }

        const newGoal = {
            description: goalValue,
            category: categoryValue,
            repetitions: repetitionsValue,
            achieved: false
        }

        api.createGoal(newGoal).then((newGoal) => {
            view.clearInput();
            view.clearValidationError();
            state.addGoal(newGoal);
            console.log(state.goals)
        });
    }

    const markAchievedHandler = (e) => {
        if (e.target.classList.contains("achieved__btn")) {
            const goalId = e.target.parentElement.id;
            api.updateGoal(goalId).then(() => {
                // Find the goal in state and toggle its achieved status
                const goalToUpdate = state.goals.find(goal => goal.id == goalId);
                if (goalToUpdate) {
                    goalToUpdate.achieved = !goalToUpdate.achieved;
                    view.renderGoals(state.goals);
                }
            });
        }
    };

    const init = () => {
        api.getGoals().then((goals) => {
            state.goals = goals;
            console.log(goals);  // Verify if goals are fetched correctly
    
            state.achieve(() => {
                view.renderGoals(state.goals);
            });

            view.goalListEl.addEventListener("click", markAchievedHandler);
    
            // Listen for adding a new goal
            view.addBtnEl.addEventListener("click", addGoalHandler);
        });
    }

    return { init };
})(Model, View, APIs);

Controller.init();