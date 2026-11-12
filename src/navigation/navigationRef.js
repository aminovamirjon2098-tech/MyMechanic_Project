/* Shared navigation container ref, used to reset navigation to the Sign in screen after logout. */
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

/** Resets the whole navigation tree to the auth stack (SignIn). Safe to call at any time. */
export function resetToSignIn() {
  let tries = 0;
  const attempt = () => {
    tries += 1;
    if (navigationRef.isReady()) {
      const state = navigationRef.getRootState();
      if (state?.routeNames?.includes('SignIn')) {
        navigationRef.resetRoot({ index: 0, routes: [{ name: 'SignIn' }] });
        return;
      }
    }
    // The auth stack mounts right after the session is cleared; retry briefly.
    if (tries < 20) setTimeout(attempt, 50);
  };
  attempt();
}
