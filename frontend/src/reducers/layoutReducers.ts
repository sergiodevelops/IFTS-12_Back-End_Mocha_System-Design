const layoutReducers = (state: any = {}, action: any) => {
    switch(action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, isSidebarOpened: !state.isSidebarOpened };
        default: 
            return state
    }
}

export default layoutReducers;
