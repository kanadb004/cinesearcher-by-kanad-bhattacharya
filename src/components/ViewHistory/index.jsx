import { useState } from "react";

import { Delete } from "neetoicons";
import { Alert, Button, Typography } from "neetoui";
import { Trans, useTranslation } from "react-i18next";

const ViewHistory = ({
  history,
  activeId,
  itemRefs,
  onDeleteItem,
  onClearAll,
}) => {
  const { t } = useTranslation();
  const [showClearAllAlert, setShowClearAllAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  return (
    <div className="w-64 flex-shrink-0">
      <div className="mb-4 flex items-center justify-between">
        <Typography style="h3" weight="bold">
          {t("viewHistory.title")}
        </Typography>
        {history.length > 0 && (
          <Button
            className="text-red-500 hover:text-red-600"
            label={t("label.clearAll")}
            style="text"
            onClick={() => setShowClearAllAlert(true)}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {history.map(({ imdbID, Title }) => (
          <div
            className="flex items-center justify-between rounded-md px-4 py-2"
            key={imdbID}
            ref={el => {
              itemRefs.current[imdbID] = el;
            }}
            style={{
              background: activeId === imdbID ? "#2f62ff" : "#E4E4F8",
              color: activeId === imdbID ? "#fff" : "inherit",
            }}
          >
            <Typography
              className="flex-1 text-center"
              style="body2"
              weight={activeId === imdbID ? "semibold" : "normal"}
            >
              {Title}
            </Typography>
            <button
              className="ml-1 flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100"
              type="button"
              onClick={() => setItemToDelete({ imdbID, Title })}
            >
              <Delete size={20} />
            </button>
          </div>
        ))}
      </div>
      <Alert
        isOpen={!!itemToDelete}
        submitButtonLabel={t("viewHistory.removeItem.confirm")}
        title={t("viewHistory.removeItem.title")}
        message={
          <Typography>
            <Trans
              components={{ strong: <strong /> }}
              i18nKey="viewHistory.removeItem.message"
              values={{ title: itemToDelete?.Title }}
            />
          </Typography>
        }
        onClose={() => setItemToDelete(null)}
        onSubmit={() => {
          onDeleteItem(itemToDelete.imdbID);
          setItemToDelete(null);
        }}
      />
      <Alert
        isOpen={showClearAllAlert}
        message={<Typography>{t("viewHistory.clearAll.message")}</Typography>}
        submitButtonLabel={t("viewHistory.clearAll.confirm")}
        title={t("viewHistory.clearAll.title")}
        onClose={() => setShowClearAllAlert(false)}
        onSubmit={() => {
          onClearAll();
          setShowClearAllAlert(false);
        }}
      />
    </div>
  );
};

export default ViewHistory;
