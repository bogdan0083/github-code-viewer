import clsx from "clsx";
import ThemedButton from "../ThemedButton/ThemedButton";
import { useRouter } from "next/router";
import { Transition } from "@headlessui/react";
import { MouseEventHandler, ReactNode, useEffect, useState } from "react";

interface ErrorProps {
  view?: "full" | "compact";
  showTransition?: boolean;
  icon: ReactNode;
  message: string;
  buttonText: string;
  onButtonClick: MouseEventHandler<HTMLButtonElement>;
}

const ErrorView = ({
  view,
  icon,
  message,
  buttonText,
  onButtonClick,
  showTransition,
}: ErrorProps) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const cls = clsx(
    "flex flex-col items-center justify-center",
    view === "full" && "h-screen",
    view === "compact" && "h-auto",
    showTransition && "transition-all duration-500"
  );

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <Transition
      show={show}
      enter="transition-opacity duration-150"
      enterFrom="opacity-0 scale-90"
      enterTo="opacity-100 scale-100"
      leave="transition-opacity duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-90"
    >
      <div className={cls}>
        {icon}
        <p className="text-center text-red-500 mb-4 text-xl">{message}</p>
        <ThemedButton onClick={onButtonClick}>{buttonText}</ThemedButton>
      </div>
    </Transition>
  );
};

export default ErrorView;
