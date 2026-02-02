import { useEffect, useRef } from "react";
import { useNavigation } from "react-router";
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar";

export default function LoadingBarComponent() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);

  const ref = useRef<LoadingBarRef>(null);

  useEffect(() => {
    if (isNavigating) {
      ref.current?.continuousStart();
    } else {
      ref.current?.complete();
    }
  }, [isNavigating]);

  return (
    <LoadingBar
      ref={ref}
      height={4}
      color="#518581"
      shadow={false}
      style={{ borderRadius: "8px" }}
    />
  );
}
