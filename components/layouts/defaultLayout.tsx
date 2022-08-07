import AppHeader from "../common/AppHeader/AppHeader";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <>
      <AppHeader title={"GitHub Code Viewer"} mobileTitle={"GCV"} fixed />
      <ErrorBoundary router={router}>
        <div className="container mx-auto px-2">{children}</div>
      </ErrorBoundary>
    </>
  );
};

export default DefaultLayout;
