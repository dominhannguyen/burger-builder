import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Auxx from "../Auxx/Auxx";



function withErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    state = {
      error: null,
    };

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(
        (req) => {
          return req;
        },
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
          
        }
      );
      this.resIntercentor = axios.interceptors.response.use(
        (res) => {return res},
        (error) => {
          this.setState({ error: error });
          return Promise.reject(error);
        }
      );
      
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resIntercentor);
    }
    render() {
      return (
        <Auxx>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxx>
      );
    }
  };
}
export default withErrorHandler;
