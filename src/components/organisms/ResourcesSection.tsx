import { useIntl } from "react-intl";

import ResourceIcon from "~/assets/icons/resource_icon.svg";
import { ExternalLink, Typography } from "~/components/atoms";
import { Resource } from "~/types";

export type ResourcesSectionProps = {
  resources: Resource[];
} & React.ComponentPropsWithRef<"aside">;

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

  const resourceIconAlt = i18n.formatMessage({
    id: "ResourcesSection.resourceIconAlt",
    description: "Alt for Resource icon",
    defaultMessage: "Resource Icon",
  });

  return (
    <aside {...articleProps}>
      <div className="flex flex-col gap-4 lg:gap-6">
        <Typography variant={"heading-m"}>{resourcesLabel}</Typography>
        <div className="flex items-center gap-8 bg-transparent-10 rounded-xl p-4 lg:px-6 lg:py-4">
          <div className="p-1.5 lg:p-2 bg-foreground rounded lg:rounded-lg">
            <img
              src={ResourceIcon}
              alt={resourceIconAlt}
              className="w-4 h-4 lg:w-6 lg:h-6"
            />
          </div>
          <ul className="flex flex-col gap-3 lg:gap-2 list-square">
            {resources.map((resource, index) => (
              <li key={index} className="list-item">
                <ExternalLink href={resource.url} openInNewTab>
                  {i18n.formatMessage(resource.label)}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
