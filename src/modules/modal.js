
const SHOW_MODAL = '@modal/SHOW_MODAL';
const HIDE_MODAL = '@modal/HIDE_MODAL';

export function showModal(name, props) {
    return {
        type: SHOW_MODAL,
        name,
        props,
    };
}

export function hideModal(name) {
    return {
        type: HIDE_MODAL,
        name,
    };
}

export default (state = {}, action) => {
    switch (action.type) {
        case SHOW_MODAL: {
            return {
                ...state,
                [action.name]: {
                    show: true,
                    ...action.props
                }
            }
        }
        case HIDE_MODAL: {
            return {
                ...state,
                [action.name]: {
                    show: false,
                    ...action.props
                }
            }
        }
        default: 
            return state;
    }
}