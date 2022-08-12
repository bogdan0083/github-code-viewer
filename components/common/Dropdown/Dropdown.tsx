import { ReactNode, useEffect, useState } from "react";
import clsx from "clsx";
import { Transition } from "@headlessui/react";

interface Elem {
  id: string;
}

interface DropdownProps<T extends Elem> {
  isLoading?: boolean;
  items?: T[] | null;
  renderItem: (item: T) => ReactNode;
  className?: string;
  onClickOutside?: () => void;
  isOpen?: boolean;
}

const Dropdown = ({
  isLoading = false,
  items,
  renderItem,
  className,
  onClickOutside,
  isOpen = false,
}: DropdownProps<any>) => {
  const [selectedItem, setSelectedItem] = useState<Elem | null>(null);

  const handleClick = (item: Elem) => {
    setSelectedItem(item);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isOpen && onClickOutside) {
      setTimeout(() => {
        document.addEventListener("click", onClickOutside);
      }, 100);
    } else if (!isOpen && onClickOutside) {
      document.removeEventListener("click", onClickOutside);
    }

    return () => {
      if (onClickOutside) {
        document.removeEventListener("click", onClickOutside);
      }
    };
  }, [isOpen, onClickOutside]);

  return (
    <div className="absolute bottom-0 translate-y-full right-0 w-full max-h-screen">
      <Transition
        show={isOpen}
        enter={"transition-all"}
        enterFrom={"opacity-0 scale-95"}
        enterTo={"opacity-100 scale-100"}
        leave={"transition-all"}
        leaveFrom={"opacity-100 scale-100"}
        leaveTo={"opacity-0 scale-95"}
        className={clsx(
          "bg-white rounded shadow-md mt-2 border border-gray-200",
          className
        )}
      >
        {isLoading && (
          <div className="text-xs p-2">
            <div>Loading...</div>
          </div>
        )}
        {!isLoading && items && items.length === 0 && (
          <div className="text-sm p-2">
            <div>No results found</div>
          </div>
        )}
        {!isLoading && items && (
          <div className="flex flex-col">
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleClick(item)}
                className={clsx(
                  "items-center py-2",
                  selectedItem && selectedItem.id === item.id && "bg-gray-100"
                )}
                onKeyDown={handleKeyDown}
              >
                {renderItem(item)}
              </div>
            ))}
          </div>
        )}
      </Transition>
    </div>
  );
};

export default Dropdown;
