import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

export function StackedImage({ images }: { images: string[] }) {
  const i18n = useIntl();
  const altText = i18n.formatMessage({
    id: "stackedimage.alt",
    defaultMessage: "alt",
    description: "Description of stacked image",
  });

  return (
    <div className="flex">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={altText}
          className={twMerge(
            "rounded-full w-8 h-8 bg-white p-1",
            index > 0 ? "-ml-3" : "ml-0"
          )}
        />
      ))}
    </div>
  );
}
