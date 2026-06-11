import { NoData } from "neetoui";
import { useTranslation } from "react-i18next";

const PageNotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="absolute left-1/3 top-1/3">
      <NoData
        title={t("pageNotFound.title")}
        primaryButtonProps={{
          className: "bg-neutral-800 hover:bg-neutral-950",
          label: t("pageNotFound.backHome"),
          to: "/movies",
        }}
      />
    </div>
  );
};

export default PageNotFound;
