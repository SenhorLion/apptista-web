/**
 * This component is used to create a hit area for a button.
 * It is used to ensure that the button is clickable for icon style buttons on mobile.
 */
export const ButtonHitArea = () => {
  return (
    <span className="absolute top-1/2 left-1/2 size-12 -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden">
      {/* intentionally empty */}
    </span>
  );
};
