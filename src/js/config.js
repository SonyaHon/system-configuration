function create(configName) {
    return {
	name: configName,
	steps: [],

	addStep(name, handler) {
	    this.steps.push({name, handler});
	},

	async apply(logger = { log: () => {} }) {
	    for (let i = 0; i < this.steps.length; i++) {
		const step = this.steps[i];
		
		logger.log(`Running ${this.name}::${step.name}...`);
		await step.handler();

		logger.log(`Finished ${this.name}::${step.name}. Status: OK`);
	    }
	}
    };
}

module.exports = {
    create,
};
