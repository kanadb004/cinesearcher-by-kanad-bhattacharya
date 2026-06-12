import { useState } from "react";

import { Delete } from "neetoicons";
import { Alert, Button, Typography } from "neetoui";
import { isEmpty } from "ramda";
import { Trans, useTranslation } from "react-i18next";
import useViewHistoryStore from "stores/useViewHistoryStore";

import "./index.css";

const ViewHistory = ({ itemRefs }) => {
  const { t } = useTranslation();
  const [showClearAllAlert, setShowClearAllAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const { viewHistory, activeHistoryId, deleteHistoryItem, clearHistory } =
    useViewHistoryStore.pick();

  return (
    <div className="w-64 flex-shrink-0">
      <div className="mb-4 flex items-center justify-between">
        <Typography style="h3" weight="bold">
          {t("viewHistory.title")}
        </Typography>
        {!isEmpty(viewHistory) && (
          <Button
            className="clear-all-btn text-red-500 hover:text-red-600"
            label={t("label.clearAll")}
            style="text"
            onClick={() => setShowClearAllAlert(true)}
          />
        )}
      </div>
      <div className="flex flex-col gap-2 overflow-y-auto">
        {isEmpty(viewHistory) ? (
          <Typography className="mt-4 text-gray-500" style="body2">
            {t("viewHistory.empty")}
          </Typography>
        ) : (
          viewHistory.map(({ imdbID, title }) => (
            <div
              className="flex items-center justify-between rounded-md px-4 py-2"
              key={imdbID}
              ref={el => {
                itemRefs.current[imdbID] = el;
              }}
              style={{
                background: activeHistoryId === imdbID ? "#2f62ff" : "#E4E4F8",
                color: activeHistoryId === imdbID ? "#fff" : "inherit",
              }}
            >
              <Typography
                className="flex-1 text-center"
                style="body2"
                weight={activeHistoryId === imdbID ? "semibold" : "normal"}
              >
                {title}
              </Typography>
              <button
                className="ml-1 flex-shrink-0 cursor-pointer opacity-60 hover:opacity-100"
                type="button"
                onClick={() => setItemToDelete({ imdbID, title })}
              >
                <Delete size={20} />
              </button>
            </div>
          ))
        )}
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
              values={{ title: itemToDelete?.title }}
            />
          </Typography>
        }
        onClose={() => setItemToDelete(null)}
        onSubmit={() => {
          deleteHistoryItem(itemToDelete.imdbID);
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
          clearHistory();
          setShowClearAllAlert(false);
        }}
      />
    </div>
  );
};

export default ViewHistory;
