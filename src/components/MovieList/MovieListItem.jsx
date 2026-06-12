import { memo } from "react";

// eslint-disable-next-line import/extensions
import fallbackPoster from "assets/images/fallback-poster.svg";
import { FallbackImage } from "components/commons";
import { Button, Typography } from "neetoui";
import withT from "utils/withT";

import "./MovieListItem.css";

const MovieListItem = ({ posterUrl, title, type, year, onViewDetails, t }) => (
  <div className="flex w-full flex-col justify-between rounded-lg bg-white p-3 shadow-md">
    <div>
      {posterUrl ? (
        <img
          alt={title}
          className="w-full rounded object-cover"
          src={posterUrl}
          onError={e => {
            e.target.src = fallbackPoster;
          }}
        />
      ) : (
        <FallbackImage alt={title} className="w-full rounded object-cover" />
      )}
      <div className="mt-3 space-y-1">
        <Typography style="h4" weight="bold">
          {title}
        </Typography>
        <Typography className="capitalize text-gray-400" style="body3">
          {type} • {year}
        </Typography>
      </div>
    </div>
    <Button
      className="view-details-btn mt-4 self-start bg-white"
      label={t("label.viewDetails")}
      style="secondary"
      onClick={onViewDetails}
    />
  </div>
);

export default memo(withT(MovieListItem));
