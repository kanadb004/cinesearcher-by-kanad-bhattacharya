import { useState } from "react";

import { Delete } from "neetoicons";
import { Alert, Button, Typography } from "neetoui";

const ViewHistory = ({
  history,
  activeId,
  itemRefs,
  onDeleteItem,
  onClearAll,
}) => {
  const [showClearAllAlert, setShowClearAllAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  return (
    <div className="w-64 flex-shrink-0">
      <div className="mb-4 flex items-center justify-between">
        <Typography style="h3" weight="bold">
          View history
        </Typography>
        {history.length > 0 && (
          <Button
            className="text-red-500 hover:text-red-600"
            label="Clear all"
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
        submitButtonLabel="Yes, remove"
        title="Remove from history?"
        message={
          <Typography>
            You are removing <strong>{itemToDelete?.Title}</strong> from view
            history. Do you want to continue?
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
        submitButtonLabel="Yes, clear all"
        title="Clear view history?"
        message={
          <Typography>
            You are about to clear all view history. Do you want to continue?
          </Typography>
        }
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
