import { memo } from "react";

// eslint-disable-next-line import/extensions
import fallbackPoster from "assets/images/fallback-poster";
import { Button, Typography } from "neetoui";

import "./MovieListItem.css";

const MovieListItem = ({ Poster, Title, Type, Year, onViewDetails }) => (
  <div className="flex w-full flex-col justify-between rounded-lg bg-white p-3 shadow-md">
    <div>
      <img
        alt={Title}
        className="w-full rounded object-cover"
        src={Poster !== "N/A" ? Poster : fallbackPoster}
      />
      <div className="mt-3 space-y-1">
        <Typography style="h4" weight="bold">
          {Title}
        </Typography>
        <Typography className="capitalize text-gray-400" style="body3">
          {Type} • {Year}
        </Typography>
      </div>
    </div>
    <Button
      className="view-details-btn mt-4 self-start bg-white"
      label="View Details"
      style="secondary"
      onClick={onViewDetails}
    />
    {/* <button
      style={{
        background: "none",
        border: "none",
        color: "#4a90e2",
        fontWeight: "bold",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
        paddingTop: 10,
      }}
      onClick={onViewDetails}
    >
      View details
    </button> */}
  </div>
);

export default memo(MovieListItem);
