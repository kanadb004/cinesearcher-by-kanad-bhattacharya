import { memo } from "react";

// eslint-disable-next-line import/extensions
import fallbackPoster from "assets/images/fallback-poster.svg";
// import { Button, Typography } from "neetoui";
// import { Link } from "react-router-dom";

const MovieListItem = ({ Poster, Title, Type, Year }) => (
  //   <Link
  //     className="mb-4 flex h-full w-full flex-col justify-between rounded-md bg-white p-4 shadow-sm"
  //     to={`/movies/${imdbID}`}
  //   >
  //     <img
  //       alt={Title}
  //       className="mb-4 h-64 w-full rounded-md object-fit p-5 "
  //       src={Poster !== "N/A" ? Poster : fallbackPoster}
  //     />
  //     <div className="flex-grow space-y-1">
  //       <Typography className="text-lg leading-tight" weight="semibold">
  //         {Title}
  //       </Typography>
  //       <Typography className="capitalize text-gray-400" style="body3">
  //         {Type} • {Year}
  //       </Typography>
  //     </div>
  //     <Button
  //       className="mt-4 self-start font-bold text-[#4a90e2] underline"
  //       label="View details"
  //       style="link"
  //     />
  //   </Link>
  <div
    style={{
      background: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      padding: "12px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <img
      alt={Title}
      src={Poster !== "N/A" ? Poster : fallbackPoster}
      style={{ width: "100%", borderRadius: "4px", objectFit: "cover" }}
    />
    <div style={{ marginTop: "8px" }}>
      <p style={{ fontWeight: "bold", margin: 0 }}>{Title}</p>
      <p style={{ color: "#999", fontSize: "13px", margin: "4px 0 8px" }}>
        {Type.charAt(0).toUpperCase() + Type.slice(1)} • {Year}
      </p>
    </div>
    <button
      style={{
        background: "none",
        border: "none",
        color: "#4a90e2",
        fontWeight: "bold",
        textDecoration: "underline",
        cursor: "pointer",
        padding: 0,
        textAlign: "left",
      }}
      //   onClick={onViewDetails}
    >
      View details
    </button>
  </div>
);

export default memo(MovieListItem);
