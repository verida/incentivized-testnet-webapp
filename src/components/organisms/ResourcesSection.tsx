import { useIntl } from "react-intl";

import { ExternalLink, Typography } from "~/components/atoms";
import { Resource } from "~/types";

export type ResourcesSectionProps = {
  resources: Resource[];
} & React.ComponentPropsWithRef<"article">;

export const ResourcesSection: React.FunctionComponent<
  ResourcesSectionProps
> = (props) => {
  const { resources, ...articleProps } = props;

  const i18n = useIntl();

  const resourcesLabel = i18n.formatMessage({
    id: "ActivityPage.resourcesLabel",
    defaultMessage: "Resources",
    description: "Label Resources",
  });

  return (
    <article {...articleProps}>
      <Typography variant={"heading-m"}>{resourcesLabel}</Typography>
      <div className="flex gap-3 bg-transparent-10 rounded-xl p-4 lg:px-6 lg:py-4 mt-4 lg:mt-6">
        <div></div>
        <ul className="flex flex-col gap-2 lg:gap-1 list-square text-gray">
          {resources.map((resource, index) => (
            <li key={index} className="list-item">
              <ExternalLink
                href={resource.url}
                className="no-underline sm:underline text-white ml-1"
                openInNewTab
              >
                {i18n.formatMessage(resource.label)}
              </ExternalLink>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};
