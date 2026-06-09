import { Typography } from "neetoui";

const ViewHistory = ({ history, activeId }) => (
  <div className="w-64 flex-shrink-0">
    <Typography className="mb-4 text-center" style="h3" weight="bold">
      View history
    </Typography>
    <div className="flex max-h-screen flex-col gap-2 overflow-y-auto">
      {history.map(({ imdbID, Title }) => (
        <div
          className="rounded-md px-4 py-2 text-center"
          key={imdbID}
          style={{
            background: activeId === imdbID ? "#2f62ff" : "#E4E4F8",
            color: activeId === imdbID ? "#fff" : "inherit",
            borderRadius: 15,
          }}
        >
          <Typography
            style="body2"
            weight={activeId === imdbID ? "semibold" : "normal"}
          >
            {Title}
          </Typography>
        </div>
      ))}
    </div>
  </div>
);

export default ViewHistory;
