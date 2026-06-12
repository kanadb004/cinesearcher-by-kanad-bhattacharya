import { BASE_URL } from "constants/apis";

import { NoData } from "neetoui";
import withT from "utils/withT";

const PageNotFound = ({ t }) => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title={t("pageNotFound.title")}
      primaryButtonProps={{
        className: "bg-neutral-800 hover:bg-neutral-950",
        label: t("pageNotFound.backHome"),
        to: `${BASE_URL}movies`,
      }}
    />
  </div>
);

export default withT(PageNotFound);
