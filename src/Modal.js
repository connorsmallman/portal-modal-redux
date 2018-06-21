import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { hideModal } from './modules/modal';

const modalRoot = document.getElementById('modal');

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

class ModalPortal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
        this.el.className = 'my-modal';
    }
  
    componentDidMount() {
        modalRoot.appendChild(this.el);
    }
  
    componentWillUnmount() {
       modalRoot.removeChild(this.el);
    }
  
    render() {
        return ReactDOM.createPortal(
            this.props.children,
            this.el,
        );
    }
}

const Modal = styled.div`
    display: ${props => props.show ? 'block' : 'none'};
`;

export function withModal(modalName) {
    return (WrappedComponent) => {
        const WithModal = props => (
            <ModalPortal>
                <Modal show={props.show} >
                    <WrappedComponent {...props} />
                </Modal>
            </ModalPortal>
        );
    
        WithModal.displayName = `WithModal(${getDisplayName(WrappedComponent)})`;
    
        function mapStateToProps(state) {
            const modal = state.modals[modalName];
            if (modal) {
                return {
                    ...modal
                };
            }
            return {
                show: false,
            };
        }
        
        function mapDispatchToProps(dispatch) {
            return {
                close: () => dispatch(hideModal(modalName))
            };
        }
        
        return connect(mapStateToProps, mapDispatchToProps)(WithModal);
    }
}