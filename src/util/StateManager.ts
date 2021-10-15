
export class StateManager {
    static instance: StateManager;
    state: {[id: string]: {val: any, cbs: Function[]}} = {};
    
    /**
     * 
     * @param id 
     * @param cb 
     * @returns 
     */
    subscribe(id: string, cb: Function): boolean {
        if (!this.state[id])
            this.state[id] = {val: undefined, cbs: []}
    
        this.state[id].cbs = [...this.state[id].cbs, cb];
        return true;
    }

    getState(id: string) {
        return this.state[id].val;
    }

    setState(id: string, val: any) {
        if (!this.state[id])
            this.state[id] = {val: undefined, cbs: []}
    
        console.log('Old state: ', this.state);
        this.state[id] = {
            ...this.state[id],
            val
        }
        console.log('New state: ', this.state);
        
        this.state[id].cbs.forEach((cb) => {
            cb();
        });
    }

    static getInstance(): StateManager {
        if (!StateManager.instance){
            StateManager.instance = new StateManager();
        }

        return StateManager.instance;
    }
}