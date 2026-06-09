import { memo } from "react";

// eslint-disable-next-line import/extensions
import fallbackPoster from "assets/images/fallback-poster.svg";
import { FallbackImage } from "components/commons";
import { Button, Typography } from "neetoui";

import "./MovieListItem.css";

const MovieListItem = ({ Poster, Title, Type, Year, onViewDetails }) => {
  const isPosterValid = Poster && Poster !== "N/A";

  return (
    <div className="flex w-full flex-col justify-between rounded-lg bg-white p-3 shadow-md">
      <div>
        {isPosterValid ? (
          <img
            alt={Title}
            className="w-full rounded object-cover"
            src={Poster}
            onError={e => {
              e.target.src = fallbackPoster;
            }}
          />
        ) : (
          <FallbackImage alt={Title} className="w-full rounded object-cover" />
        )}
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
    </div>
  );
};

export default memo(MovieListItem);
