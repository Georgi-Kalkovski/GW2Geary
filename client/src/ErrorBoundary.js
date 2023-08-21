import React, { Component } from "react";
import ApiErrorPage from "./components/ApiErrorPage";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, isFashionError: false };
    }

    static getDerivedStateFromError(error) {
        const currentPath = window.location.pathname;
        if (currentPath.includes("/f/")) {
            return { hasError: true, isFashionError: true };
        }
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <ApiErrorPage isErrorPage={this.state.isFashionError} />;
        }
        return this.props.children;
    }
}

export default ErrorBoundary;