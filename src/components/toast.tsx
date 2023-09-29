import { useTranslation } from "react-i18next";
import CloseIcon from "../images/icons/close.svg?react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setErrorMessage } from "../features/setupSlice";
import { memo, useEffect, useState } from "react";
import classNames from "classnames";

const Toast: React.FC = () => {
  const errorMessage = useAppSelector((state) => state.setup.errorMessage);
  // Cache the error message to allow us to continue displaying it as we transition
  const [cachedMessage, setCachedMessage] = useState(errorMessage);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  // Update the cached message if a new one came through
  useEffect(() => {
    if (errorMessage != null) setCachedMessage(errorMessage);
  }, [errorMessage]);

  return (
    <div
      className={classNames("toast", { hidden: !errorMessage })}
      aria-hidden={!errorMessage}
      aria-live="assertive"
    >
      <div className="container">
        <span id="appError" className="message">
          {cachedMessage && t(cachedMessage)}.
        </span>
        <button
          title={t("label.closeMessage")}
          onClick={() => dispatch(setErrorMessage(null))}
          disabled={!errorMessage}
        >
          <CloseIcon className="close-icon" />
        </button>
      </div>
    </div>
  );
};

export default memo(Toast);
