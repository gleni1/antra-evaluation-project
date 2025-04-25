export const Model = (() => {
    class State {
        #goals = [];
        #onChange = () => {};

        get goals() {
            return this.#goals;
        }

        set goals(newGoals) {
            this.#goals = newGoals;
            this.#onChange();
        }

        addGoal(newGoal) {
            this.goals = [...this.goals, newGoal];
            this.#onChange();
        }

        deleteGoal(id) {
            this.goals = this.goals.filter((goal) => goal.id !== id);
        }

        achieve(cb) {
            this.#onChange = cb;
        }
    }

    return { State };
})();