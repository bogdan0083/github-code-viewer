import { Component } from "react";
import ErrorView from "../ErrorView/ErrorView";
import { CombinedError } from "urql";
import { TbNetwork } from "react-icons/tb";
import { MdError } from "react-icons/md";
import { NextRouter } from "next/router";

interface Props {
  children: React.ReactNode;
  router: NextRouter;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const defaultButtonText = "Refresh Page";
const defaultIconClassName = "text-red-500";

const getErrorType = (e?: CombinedError | Error) => {
  if (e instanceof CombinedError) {
    if (e.networkError) {
      return "network";
    }
    if (e.graphQLErrors) {
      return "graphql";
    }
  } else if (e instanceof Error) {
    return "generic";
  }

  return "unknown";
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // You can also log the error to an error reporting service
  }

  getErrorComponent = (error: Error) => {
    const t = getErrorType(error);
    const router = this.props.router;
    switch (t) {
      case "network":
        return (
          <ErrorView
            message={"Whoops! Network error"}
            icon={<TbNetwork size={50} className={defaultIconClassName} />}
            buttonText={defaultButtonText}
            onButtonClick={() => router.reload()}
          />
        );
      case "graphql":
        return (
          <ErrorView
            message={`GraphQL error: ${error.message}`}
            icon={<MdError size={50} className={defaultIconClassName} />}
            buttonText={defaultButtonText}
            onButtonClick={() => router.reload()}
          />
        );
      case "generic":
        return (
          <ErrorView
            message={"Whoops! Something went wrong"}
            icon={<MdError size={50} className={defaultIconClassName} />}
            buttonText={defaultButtonText}
            onButtonClick={() => router.reload()}
          />
        );
      default:
        return (
          <ErrorView
            message={"Whoops! Something went wrong"}
            icon={<TbNetwork size={50} className={defaultIconClassName} />}
            buttonText={defaultButtonText}
            onButtonClick={() => router.reload()}
          />
        );
    }
  };

  render() {
    const { error, hasError } = this.state;
    if (hasError) {
      return (
        <div
          className={
            "container flex flex-grow flex-col mx-auto justify-center items-center"
          }
        >
          {error && this.getErrorComponent(error)}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
