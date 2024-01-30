export const hasWebShare = () => !!navigator.canShare;

export const shareData = async (data: ShareData): Promise<boolean> => {
  try {
    await navigator?.share(data);
    return true;
  } catch (error) {
    return false;
  }
};
