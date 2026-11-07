import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('A page failed to render.', error, info.componentStack);
  }

  private retry = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <section
          className="page-section error-boundary-fallback"
          role="alert"
          aria-labelledby="render-error-title"
        >
          <p className="eyebrow">SOMETHING WENT WRONG</p>
          <h1 id="render-error-title">This page couldn’t load.</h1>
          <p>Please try again. Your shopping bag is still here.</p>
          <button
            className="button button-primary"
            type="button"
            aria-label="Try rendering this page again"
            onClick={this.retry}
          >
            Try again
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}
