import AppHeader from "../common/AppHeader/AppHeader";

interface LayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <div className="container mx-auto px-3">
      <main>
        <AppHeader
          title={"GitHub Code Viewer"}
          caption={"Fast and quick"}
          fixed
        />
        {children}
      </main>
    </div>
  );
};

export default DefaultLayout;
