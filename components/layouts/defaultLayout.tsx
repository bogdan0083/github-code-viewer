import AppHeader from "../common/AppHeader/AppHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <AppHeader title={"GitHub Code Viewer"} mobileTitle={"GCV"} fixed />
      {children}
    </>
  );
};

export default DefaultLayout;
