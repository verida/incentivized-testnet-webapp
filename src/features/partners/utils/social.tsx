import { Icon, IconProps, IconType } from "~/components/atoms";
import { PartnerSocialType } from "~/features/partners/types";

export function getPartnerSocialIcon(
  partnerSocialType: PartnerSocialType,
  size: IconProps["size"]
) {
  let iconType: IconType;

  switch (partnerSocialType) {
    case PartnerSocialType.DISCORD:
      iconType = "platform-discord";
      break;
    case PartnerSocialType.LINKEDIN:
      iconType = "platform-linkedin";
      break;
    case PartnerSocialType.MEDIUM:
      iconType = "platform-medium";
      break;
    case PartnerSocialType.REDDIT:
      iconType = "platform-reddit";
      break;
    case PartnerSocialType.TELEGRAM:
      iconType = "platform-telegram";
      break;
    case PartnerSocialType.X:
      iconType = "platform-x";
      break;
    case PartnerSocialType.WHATSAPP:
      iconType = "platform-whatsapp";
      break;
    case PartnerSocialType.YOUTUBE:
      iconType = "platform-youtube";
      break;
    default:
      iconType = "external-link";
      break;
  }

  return <Icon type={iconType} size={size} />;
}
