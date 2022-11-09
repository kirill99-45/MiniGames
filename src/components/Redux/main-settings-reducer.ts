interface IInitState {
    isSound : boolean,
    theme : string,
    volume : number,
}

interface IAction {
    type : string,
}

const initState: IInitState = {
    isSound : true,
    theme : 'light',
    volume : 1,
}

export interface IMainSettingsReducer {
    state : IInitState,
    action : IAction,
}

export const mainSettingsReducer = (state: IInitState = initState, action: IAction) => {
    switch(action.type) {
        default:
            return state
    }
}