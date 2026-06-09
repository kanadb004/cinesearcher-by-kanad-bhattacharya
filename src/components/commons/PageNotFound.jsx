import { NoData } from "neetoui";

const PageNotFound = () => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title="The page you're looking for can't be found"
      primaryButtonProps={{
        label: "Back to home",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/movies",
      }}
    />
  </div>
);

export default PageNotFound;
