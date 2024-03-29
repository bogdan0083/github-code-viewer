import AppHeader from "../common/AppHeader/AppHeader";
import ErrorBoundary from "../common/ErrorBoundary/ErrorBoundary";
import { useRouter } from "next/router";
import AppFooter from "../common/AppFooter/AppFooter";

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  const router = useRouter();
  return (
    <>
      <AppHeader fixed />
      <ErrorBoundary router={router}>
        <div className="container mx-auto px-2 flex-grow">{children}</div>
      </ErrorBoundary>
      <AppFooter />
    </>
  );
};

export default DefaultLayout;
