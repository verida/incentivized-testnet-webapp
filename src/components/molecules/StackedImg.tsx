import { useIntl } from "react-intl";
import { twMerge } from "tailwind-merge";

export type StackedImageProps = {
  images: string[];
} & Omit<React.ComponentPropsWithRef<"div">, "children">;

export const StackedImage: React.FC<StackedImageProps> = (props) => {
  const { images, className, ...divProps } = props;
  const i18n = useIntl();
  const altText = i18n.formatMessage({
    id: "StackedImage.alt",
    defaultMessage: "item of stacked images",
    description: "Alt text of stacked image",
  });

  return (
    <div className={twMerge("flex", className)} {...divProps}>
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={altText}
          className={twMerge(
            "rounded-full w-8 h-8 bg-white p-1 border-2 border-primary-background-disabled",
            index > 0 ? "-ml-3" : "ml-0"
          )}
        />
      ))}
    </div>
  );
};
